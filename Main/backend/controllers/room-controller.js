const Room = require("../models/room-model");
const ErrorHandler = require("../utils/error-handler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/api-features");
const cloudinary = require("cloudinary");

// Get all rooms
exports.getAllRooms = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;

  const numOfRooms = await Room.countDocuments();

  // Search filter
  const apiFeature = new ApiFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeature.query;

  let filteredRoomsCount = rooms.length;
  apiFeature.pagination(resultPerPage);

  rooms = await apiFeature.query.clone();

  res.status(201).json({
    success: true,
    rooms,
    numOfRooms,
    resultPerPage,
    filteredRoomsCount,
  });
});

// Get all rooms --- Admin
exports.getAdminRooms = catchAsyncError(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Room.find().populate("user"), req.query)
    .search()
    .filter();

  let rooms = await apiFeature.query;
  // const rooms = await Room.find().populate("user");

  res.status(201).json({
    success: true,
    rooms,
  });
});

// Get room details
exports.getRoomDetails = catchAsyncError(async (req, res, next) => {
  // VD:http://localhost/api/room/:id ==> để lấy id sử dụng req.params.id
  const room = await Room.findById(req.params.id)
    .populate("user")
    .populate("reviews.user");

  if (!room) {
    return next(new ErrorHandler("Room not exist", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

// Create room
exports.createRoom = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "rooms",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    room,
  });
});

// Update room
exports.updateRoom = catchAsyncError(async (req, res, next) => {
  // VD:http://localhost/api/room/:id ==> để lấy id sử dụng req.params.id
  let room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not exist", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < room.images.length; i++) {
      await cloudinary.v2.uploader.destroy(room.images[i].public_id);
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "rooms",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

// Accept or refuse room
exports.updateStatus = catchAsyncError(async (req, res, next) => {
  const newStatus = {
    status: req.body.status,
  };

  await Room.findByIdAndUpdate(req.params.id, newStatus, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete room
exports.deleteRoom = catchAsyncError(async (req, res, next) => {
  // VD:http://localhost/api/room/:id ==> để lấy id sử dụng req.params.id
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not exist", 404));
  }

  for (let i = 0; i < room.images.length; i++) {
    await cloudinary.v2.uploader.destroy(room.images[i].public_id);
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Successful delete",
  });
});

// Create/Update review
exports.addReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, roomID } = req.body;

  const review = {
    user: req.user._id, // type of user: mongoose.Schema.ObjectId
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomID);

  // Kiểm tra đã đánh giá hay chưa
  const isReviewed = room.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  // Nếu đã đánh giá ==> Cập nhật lại đánh giá
  // Nếu chưa đánh giá ==> Thêm đánh giá
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString())
        (review.rating = rating), (review.comment = comment);
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  let totalRating = 0;

  room.reviews.forEach((review) => {
    totalRating += review.rating;
  });

  room.rating = totalRating / room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a room
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id).populate("reviews.user");

  if (!room) {
    return next(new ErrorHandler("Room not exists", 404));
  }

  res.status(200).json({
    success: true,
    reviews: room.reviews,
  });
});

// Delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.roomID);

  if (!room) {
    return next(new ErrorHandler("Room not exists", 404));
  }

  // Lọc các review khác với review muốn xóa
  const reviews = room.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  let totalRating = 0;

  reviews.forEach((review) => {
    totalRating += review.rating;
  });

  const rating = reviews.length === 0 ? 0 : totalRating / reviews.length;

  const numOfReviews = reviews.length;

  await Room.findByIdAndUpdate(
    req.query.roomID,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
