import "./ReviewList.css";

import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import {
  clearErrors,
  getAllRooms,
  getAllReviews,
  deleteReviews,
} from "../../actions/roomAction";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/roomConstants";
// import { useInsertionEffect } from "react";
// import {user}

import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

const ReviewList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector((state) => state.allReviews);
  const { rooms } = useSelector((state) => state.rooms);

  const [roomID, setRoomID] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, roomID));
  };

  const allReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (roomID !== "") dispatch(getAllReviews(roomID));
  };

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

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
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, roomID]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 250 },

    {
      field: "user",
      headerName: "Người dùng",
      minWidth: 200,
    },

    {
      field: "comment",
      headerName: "Bình luận",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Đánh giá",
      type: "number",
      minWidth: 170,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "green_color"
          : "red_color";
      },
    },

    {
      field: "actions",
      headerName: "Hành động",
      minWidth: 170,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.user.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS`} />

      <div className="dashboard">
        <SideBar />
        <div className="allReviewsContainer">
          <form className="allReviewsForm" onSubmit={allReviewsSubmitHandler}>
            <h1 className="allReviewsFormHeading">TẤT CẢ ĐÁNH GIÁ</h1>

            <div>
              <Star />
              {/* <input
                type="text"
                placeholder="Room Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              /> */}
              <select
                onChange={(e) => {
                  setRoomID(e.target.value);
                }}
              >
                <option value="">Chọn mã phòng</option>
                {rooms &&
                  rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room._id}
                    </option>
                  ))}
              </select>
            </div>

            <Button
              id="searchReviewsBtn"
              type="submit"
              disabled={loading ? true : false || roomID === "" ? true : false}
            >
              Kiểm tra
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="allReviewsFormHeading">Không có đánh giá nào</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ReviewList;
