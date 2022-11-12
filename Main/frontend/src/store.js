import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  roomsReducer,
  roomReducer,
  roomDetailsReducer,
  newReviewReducer,
  newRoomReducer,
  allReviewsReducer,
  reviewReducer,
} from "./reducers/roomReducer";

import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  allUsersReducer,
} from "./reducers/userReducer";

import {
  newBookingReducer,
  myBookingsReducer,
  allBookingsReducer,
  bookingReducer,
  bookingDetailsReducer,
} from "./reducers/bookingReducer";

const reducer = combineReducers({
  rooms: roomsReducer,
  room: roomReducer,
  roomDetails: roomDetailsReducer,
  newReview: newReviewReducer,
  newRoom: newRoomReducer,
  allReviews: allReviewsReducer,
  review: reviewReducer,
  //
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  users: allUsersReducer,
  userDetails: userDetailsReducer,
  //
  booking: bookingReducer,
  newBooking: newBookingReducer,
  myBookings: myBookingsReducer,
  bookingDetails: bookingDetailsReducer,
  bookings: allBookingsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
