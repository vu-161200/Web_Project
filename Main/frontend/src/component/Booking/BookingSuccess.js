import "./BookingSuccess.css";

import React from "react";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const BookingSuccess = () => {
  return (
    <div className="bookingSuccess">
      <CheckCircleIcon />

      <Typography>Đặt phòng thành công !</Typography>
      <Link to="/bookings">Xem chi tiết</Link>
    </div>
  );
};

export default BookingSuccess;
