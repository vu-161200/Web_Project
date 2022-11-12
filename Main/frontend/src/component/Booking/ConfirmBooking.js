import "./ConfirmBooking.css";

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import MetaData from "../layout/MetaData";
import BookingSteps from "./BookingSteps";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { user } = useSelector((state) => state.user);

  const proceedToPayment = () => {
    navigate("/booking/payment", { state: state });
  };

  return (
    <Fragment>
      <MetaData title="Xác nhận đặt phòng" />
      <BookingSteps activeStep={1} />

      <div className="confirmBookingContainer">
        <div>
          <div className="confirmBookingArea">
            <Typography>Thông tin người đặt</Typography>
            <div className="confirmBookingAreaBox">
              <div>
                <p>Người đặt:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{user.phoneNumber}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <div className="confirmBookingArea">
            <Typography>Thông tin người đăng</Typography>
            <div className="confirmBookingAreaBox">
              <div>
                <p>Người đăng:</p>
                <span>{state.room.user.name}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{state.room.user.phoneNumber}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{state.room.user.email}</span>
              </div>
            </div>
          </div>

          <div className="confirmRoomBooked">
            <Typography>Thông tin đặt phòng</Typography>
            <div>
              <p>Số lượng phòng:</p>
              <span>{state.numOfRooms}</span>
            </div>
            <div>
              <p>Ngày nhận phòng:</p>
              <span>{state.startDate.toLocaleDateString()}</span>
            </div>
            <div>
              <p>Thông tin phòng</p>
            </div>
            <div className="confirmRoomBookedContainer">
              <div>
                <img src={state.room.images[0].url} alt="" />
                <div>
                  <Link to={`/room/${state.room._id}`}>
                    Mã phòng: {state.room._id}
                  </Link>
                  <span>{`Địa chỉ: ${state.room.address}`}</span>
                  <span>{`Giá: ${state.room.price?.toLocaleString(
                    "en-US"
                  )} VNĐ`}</span>
                </div>
              </div>
            </div>
            {}
          </div>
        </div>

        <div>
          <div className="bookingSummary">
            <Typography>Thông tin hóa đơn</Typography>
            <div>
              <div>
                <p>Số phòng:</p>
                <span>{state.numOfRooms}</span>
              </div>
              <div>
                <p>Giá phòng:</p>
                <span>{`${state.room.price?.toLocaleString(
                  "en-US"
                )} VNĐ`}</span>
              </div>
            </div>

            <div className="bookingSummaryTotal">
              <p>
                <b style={{ color: "red" }}>Tổng:</b>
              </p>
              <span style={{ color: "red", fontWeight: "bold" }}>{`${(
                state.room.price * state.numOfRooms
              ).toLocaleString("en-US")} VNĐ`}</span>
            </div>

            <button onClick={proceedToPayment}>Thanh toán</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmBooking;
