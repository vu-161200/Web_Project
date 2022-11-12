import {
  ALL_ROOM_REQUEST,
  ALL_ROOM_SUCCESS,
  ALL_ROOM_FAIL,
  //
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  //
  ADMIN_ROOM_REQUEST,
  ADMIN_ROOM_SUCCESS,
  ADMIN_ROOM_FAIL,
  //
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_FAIL,
  NEW_ROOM_RESET,
  //
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_RESET,
  //
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_RESET,
  //
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_RESET,
  //
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  //
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  //
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  //
  CLEAR_ERRORS,
} from "../constants/roomConstants";

export const roomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOM_REQUEST:
    case ADMIN_ROOM_REQUEST:
      return {
        loading: true,
        rooms: [],
      };

    case ALL_ROOM_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.rooms,
        numOfRooms: action.payload.numOfRooms,
        resultPerPage: action.payload.resultPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
      };
    case ADMIN_ROOM_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };

    case ALL_ROOM_FAIL:
    case ADMIN_ROOM_FAIL:
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

export const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROOM_REQUEST:
    case UPDATE_ROOM_REQUEST:
    case UPDATE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_ROOM_SUCCESS:
    case UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ROOM_FAIL:
    case UPDATE_ROOM_FAIL:
    case UPDATE_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ROOM_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ROOM_RESET:
    case UPDATE_STATUS_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ROOM_DETAILS_SUCCESS:
      return {
        loading: false,
        room: action.payload,
      };

    case ROOM_DETAILS_FAIL:
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

export const newRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ROOM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      };

    case NEW_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_ROOM_RESET:
      return {
        ...state,
        success: false,
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const allReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case ALL_REVIEW_FAIL:
      return {
        ...state,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
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
