import React from "react";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <div className="reviewInfo">
        <img src={review.user?.avatar.url} alt="User" />
        <p>
          {review.user?.name === undefined
            ? review.user?.email
            : review.user?.name}
        </p>
        <Rating {...options} />
      </div>
      <span className="reviewCardComment">
        {review.comment?.split("\n").map(function (element, i) {
          return (
            <span key={i}>
              {i === 0 ? null : <br />}
              {element}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export default ReviewCard;
