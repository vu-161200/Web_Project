import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  deleteBooking,
  getAllBookings,
  clearErrors,
} from "../../actions/bookingAction";
import { DELETE_BOOKING_RESET } from "../../constants/bookingConstants";

import LaunchIcon from "@material-ui/icons/Launch";
import DeleteIcon from "@material-ui/icons/Delete";

const BookingList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, bookings } = useSelector((state) => state.bookings);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa thành công");
      navigate("/admin/bookings");
      dispatch({ type: DELETE_BOOKING_RESET });
    }

    dispatch(getAllBookings());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const deleteBookingHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  const columns = [
    { field: "id", headerName: "Mã Booking", minWidth: 250 },

    { field: "roomID", headerName: "Mã phòng", minWidth: 250 },

    {
      field: "numOfRooms",
      headerName: "Slg",
      minWidth: 120,
    },

    {
      field: "totalPrices",
      headerName: "Tổng giá",
      minWidth: 170,
    },

    {
      field: "checkinDate",
      headerName: "Ngày nhận",
      minWidth: 200,
    },

    {
      field: "status",
      headerName: "Hình thức",
      minWidth: 170,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Thanh toán sau"
          ? "red_color"
          : "green_color";
      },
    },

    {
      field: "paidAt",
      headerName: "Thanh toán",
      minWidth: 180,
      cellClassName: (params) => {
        return "green_color";
      },
    },

    {
      field: "actions",
      headerName: "Hành động",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/booking/${params.getValue(params.id, "id")}`}>
              <LaunchIcon />
            </Link>

            <Button
              onClick={() =>
                deleteBookingHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  bookings &&
    bookings.forEach((item, index) => {
      rows.push({
        id: item._id,
        roomID: item.room,
        numOfRooms: item.numOfRooms,
        totalPrices: item.totalPrice.toLocaleString("en-US") + " VNĐ",
        checkinDate: new Date(item.checkInDate).toLocaleString("en-GB"),
        paidAt:
          item.status === "Thanh toán online"
            ? new Date(item.paidAt).toLocaleString("en-GB")
            : "",
        status: item.status,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL BOOKINGS`} />

      <div className="dashboard">
        <SideBar />
        <div className="roomListContainer">
          <h1 id="roomListHeading">DANH SÁCH ĐẶT PHÒNG</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="roomListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BookingList;
