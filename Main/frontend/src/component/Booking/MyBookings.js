import "./MyBookings.css";

import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";

import Loading from "../layout/loading/loading";
import MetaData from "../layout/MetaData";
import { clearErrors, myBookings } from "../../actions/bookingAction";

import LaunchIcon from "@material-ui/icons/Launch";

const MyBookings = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, bookings } = useSelector((state) => state.myBookings);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Mã Booking", minWidth: 220 },

    { field: "roomID", headerName: "Mã phòng", minWidth: 220 },

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
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/booking/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myBookings());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Bookings`} />

      {loading ? (
        <Loading />
      ) : (
        <div className="myBookingsPage">
          <Typography id="myBookingsHeading">{user.name} - Booking</Typography>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myBookingTable"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyBookings;
