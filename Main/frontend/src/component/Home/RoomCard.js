import "./RoomCard.css";

import React from "react";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const options = {
    value: room.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="roomCard" to={`/room/${room._id}`}>
      {room.numOfRooms === 0 ? (
        <div className="roomCardStatus status0">
          <p>Hết phòng</p>
        </div>
      ) : (
        <div className="roomCardStatus status1">
          <p>Còn {room.numOfRooms} phòng</p>
        </div>
      )}
      <img src={room.images[0].url} alt={room.title} />
      <p>{room.name}</p>
      <span className="roomCardAddress">
        <i />
        {room.address}
      </span>
      <div className="roomCardRate">
        <Rating {...options} />
        <span> ({room.numOfReviews} Đánh giá)</span>
      </div>
      <span className="roomCardPrice">
        <i />
        {room.price.toLocaleString("en-US")} VNĐ
      </span>
    </Link>
  );
};

export default RoomCard;
