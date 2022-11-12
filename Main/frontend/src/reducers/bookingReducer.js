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
  DELETE_BOOKING_RESET,
  //
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
  //
  CLEAR_ERRORS,
} from "../constants/bookingConstants";

export const newBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BOOKING_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      };

    case CREATE_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myBookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case MY_BOOKINGS_REQUEST:
      return {
        loading: true,
      };

    case MY_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };

    case MY_BOOKINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allBookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case ALL_BOOKINGS_REQUEST:
      return {
        loading: true,
      };

    case ALL_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };

    case ALL_BOOKINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bookingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_BOOKING_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bookingDetailsReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case BOOKING_DETAILS_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      };

    case BOOKING_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
