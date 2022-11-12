const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter room name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter room description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please enter room price"],
    },
    address: {
      type: String,
      required: [true, "Please enter room address"],
      trim: true,
    },
    lat: {
      type: Number,
      required: [true, "Please enter latitude coordinates of the room"],
    },
    lng: {
      type: Number,
      required: [true, "Please enter longitude coordinates of the room"],
    },
    area: {
      type: Number,
      required: [true, "Please enter room area"],
    },
    category: {
      type: String,
      required: [true, "Please enter room category"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    numOfRooms: {
      type: Number,
      default: 1,
    },
    tenant: {
      type: String,
      default: "Tất cả",
    },
    status: {
      type: String,
      default: "Chờ phê duyệt",
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
