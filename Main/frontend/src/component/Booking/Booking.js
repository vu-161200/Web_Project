import "./Booking.css";

import React, { Fragment, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import MetaData from "../layout/MetaData";
import BookingSteps from "./BookingSteps";

const Booking = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { room } = state;

  const [numOfRooms, setNumOfRooms] = useState(1);
  const [startDate, setStartDate] = useState(new Date());

  const increaseNOR = (numOfRooms) => {
    const newNOR = numOfRooms + 1;
    if (room.numOfRooms <= numOfRooms) {
      return;
    }
    setNumOfRooms(newNOR);
  };

  const decreaseNOR = (numOfRooms) => {
    const newNOR = numOfRooms - 1;
    if (1 >= numOfRooms) {
      return;
    }
    setNumOfRooms(newNOR);
  };

  const bookingSubmit = (e) => {
    e.preventDefault();

    navigate("/booking/confirm", {
      state: { room: room, numOfRooms: numOfRooms, startDate: startDate },
    });
  };

  return (
    <Fragment>
      <MetaData title="Đặt phòng" />

      <BookingSteps activeStep={0} />

      <div className="bookingContainer">
        <h2 className="bookingHeading">Thông tin phòng</h2>

        <div className="bookingRoomHeader">
          <p>Phòng</p>
          <p>Số lượng</p>
          <p>Giá</p>
        </div>

        <div className="bookingRoomContainer">
          <div className="CartItemCard">
            <img src={room.images[0].url} alt="ssa" />
            <div>
              <Link to={`/room/${room._id}`}>{`Mã phòng: ${room._id}`}</Link>
              <span>{`Địa chỉ: ${room.address}`}</span>
              <span>{`Giá: ${room.price?.toLocaleString("en-US")} VNĐ`}</span>
            </div>
          </div>
          <div className="bookingNumOfRooms">
            <button onClick={() => decreaseNOR(numOfRooms)}>-</button>
            <input type="number" value={numOfRooms} readOnly />
            <button onClick={() => increaseNOR(numOfRooms)}>+</button>
          </div>
          <p className="cartSubtotal">{`${(
            room.price * numOfRooms
          ).toLocaleString("en-US")} VNĐ`}</p>
        </div>

        <h2 className="bookingHeading">Thông tin đặt phòng</h2>
        <form
          className="bookingForm"
          encType="multipart/form-data"
          onSubmit={bookingSubmit}
        >
          <label>
            Số lượng phòng
            <input type="number" value={numOfRooms} readOnly />
          </label>

          <label>
            Ngày nhận phòng
            <DatePicker.l 
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </label>

          <input type="submit" value="Đặt phòng" className="bookingBtn" />
        </form>
      </div>
    </Fragment>
  );
};

export default Booking;
