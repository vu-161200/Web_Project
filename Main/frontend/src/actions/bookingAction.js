import axios from "axios";

import {
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAIL,
  //
  MY_BOOKINGS_REQUEST,
  MY_BOOKINGS_SUCCESS,
  MY_BOOKINGS_FAIL,
  //
  ALL_BOOKINGS_REQUEST,
  ALL_BOOKINGS_SUCCESS,
  ALL_BOOKINGS_FAIL,
  //
  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAIL,
  //
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
  //
  CLEAR_ERRORS,
} from "../constants/bookingConstants";

export const createBooking = (booking) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BOOKING_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/booking/new", booking, config);

    dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myBookings = () => async (dispatch) => {
  try {
    dispatch({ type: MY_BOOKINGS_REQUEST });

    const { data } = await axios.get("/api/bookings/me");

    dispatch({ type: MY_BOOKINGS_SUCCESS, payload: data.bookings });
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOOKINGS_REQUEST });

    const { data } = await axios.get("/api/admin/bookings");

    dispatch({ type: ALL_BOOKINGS_SUCCESS, payload: data.bookings });
  } catch (error) {
    dispatch({
      type: ALL_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteBooking = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKING_REQUEST });

    const { data } = await axios.delete(`/api/admin/booking/${id}`);

    dispatch({ type: DELETE_BOOKING_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBookingDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOKING_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/booking/${id}`);

    dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data.booking });
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
