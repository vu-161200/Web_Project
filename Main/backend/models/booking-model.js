const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: true,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },

    paidAt: {
      type: Date,
    },

    roomPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    numOfRooms: {
      type: Number,
      required: true,
      default: 1,
    },

    // Ngày nhận phòng
    checkInDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
