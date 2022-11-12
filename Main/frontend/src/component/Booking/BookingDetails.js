import "./BookingDetails.css";

import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

import Loading from "../layout/loading/loading";
import MetaData from "../layout/MetaData";

import { getBookingDetails, clearErrors } from "../../actions/bookingAction";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { booking, error, loading } = useSelector(
    (state) => state.bookingDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getBookingDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Booking Details" />
          <div className="bookingDetailsPage">
            <Typography align="center" component="h1">
              Booking #{booking._id}
            </Typography>

            <div className="confirmBookingContainer">
              <div>
                <div className="confirmBookingArea">
                  <Typography>Thông tin người đặt</Typography>
                  <div className="confirmBookingAreaBox">
                    <div>
                      <p>Người đặt:</p>
                      <span>{booking.user?.name}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>{booking.user?.phoneNumber}</span>
                    </div>
                    <div>
                      <p>Email:</p>
                      <span>{booking.user?.email}</span>
                    </div>
                  </div>
                </div>
                <div />
                <div className="confirmBookingArea">
                  <Typography>Thông tin người đăng</Typography>
                  <div className="confirmBookingAreaBox">
                    <div>
                      <p>Người đăng:</p>
                      <span>{booking.room?.user.name}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>{booking.room?.user.phoneNumber}</span>
                    </div>
                    <div>
                      <p>Email:</p>
                      <span>{booking.room?.user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="confirmRoomBooked">
                  <Typography>Thông tin đặt phòng</Typography>
                  <div>
                    <p>Số lượng phòng:</p>
                    <span>{booking.numOfRooms}</span>
                  </div>
                  <div>
                    <p>Ngày nhận phòng:</p>
                    <span>
                      {new Date(booking.checkInDate).toLocaleString("en-GB")}
                    </span>
                  </div>
                  <div>
                    <p>Thông tin phòng</p>
                  </div>
                  <div className="confirmRoomBookedContainer">
                    <div>
                      <img src={booking.room?.images[0].url} alt="" />
                      <div>
                        <Link to={`/room/${booking.room?._id}`}>
                          Mã phòng: {booking.room?._id}
                        </Link>
                        <span>{`Địa chỉ: ${booking.room?.address}`}</span>
                        <span>{`Giá: ${booking.room?.price?.toLocaleString(
                          "en-US"
                        )} VNĐ`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bookingSummary">
                  <Typography>Thông tin thanh toán</Typography>
                  <div>
                    <div>
                      <p>Số phòng:</p>
                      <span style={{ fontWeight: "normal" }}>
                        {booking.numOfRooms}
                      </span>
                    </div>
                    <div>
                      <p>Giá phòng:</p>
                      <span
                        style={{ fontWeight: "normal" }}
                      >{`${booking.room?.price?.toLocaleString(
                        "en-US"
                      )} VNĐ`}</span>
                    </div>
                    <div>
                      <p style={{ fontWeight: "bold" }}>Tổng:</p>
                      <span style={{ fontWeight: "bold" }}>{`${(
                        booking.room?.price * booking.numOfRooms
                      ).toLocaleString("en-US")} VNĐ`}</span>
                    </div>
                  </div>

                  <div className="bookingSummaryTotal">
                    <p>Hình thức thanh toán: </p>
                    <span
                      style={{
                        color:
                          booking.status === "Thanh toán online"
                            ? "green"
                            : "red",
                      }}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {booking.status === "Thanh toán online" ? (
                    <div className="bookingDetailsPayment">
                      <p>Ngày thanh toán: </p>
                      <span>
                        {
                          new Date(booking.checkInDate)
                            .toLocaleString("en-GB")
                            .split(",")[0]
                        }
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookingDetails;
