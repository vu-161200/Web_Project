const Booking = require("../models/booking-model");
const Room = require("../models/room-model");
const ErrorHander = require("../utils/error-handler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new booking
exports.newBooking = catchAsyncErrors(async (req, res, next) => {
  const {
    room,
    paymentInfo,
    roomPrice,
    numOfRooms,
    checkInDate,
    totalPrice,
    status,
  } = req.body;

  let booking;

  if (status == "Thanh toán sau") {
    booking = await Booking.create({
      room,
      user: req.user._id,
      roomPrice,
      numOfRooms,
      checkInDate,
      totalPrice,
      status,
    });
  } else {
    booking = await Booking.create({
      room,
      user: req.user._id,
      roomPrice,
      numOfRooms,
      checkInDate,
      totalPrice,
      status,
      paymentInfo,
      paidAt: Date.now(),
    });
  }

  await updateNOR(room, numOfRooms);

  res.status(201).json({
    success: true,
    booking,
  });
});

async function updateNOR(id, nor) {
  const room = await Room.findById(id);

  room.numOfRooms -= nor;

  await room.save({ validateBeforeSave: false });
}

// Get A Booking
exports.getBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate("user")
    .populate({
      path: "room",
      populate: {
        path: "user",
      },
    });

  if (!booking) {
    return next(new ErrorHander("Booking not exist", 404));
  }

  res.status(200).json({
    success: true,
    booking,
  });
});

// Get My Booking
exports.myBooking = catchAsyncErrors(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// Get All Bookings
exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await Booking.find();

  let totalAmount = 0;

  bookings.forEach((booking) => {
    totalAmount += booking.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    bookings,
  });
});

// Delete Booking
exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorHander("Booking not exist", 404));
  }

  await booking.remove();

  res.status(200).json({
    success: true,
  });
});
