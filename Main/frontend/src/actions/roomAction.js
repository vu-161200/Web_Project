import axios from "axios";

import {
  ALL_ROOM_REQUEST,
  ALL_ROOM_SUCCESS,
  ALL_ROOM_FAIL,
  //
  ADMIN_ROOM_REQUEST,
  ADMIN_ROOM_SUCCESS,
  ADMIN_ROOM_FAIL,
  //
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  //
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_FAIL,
  //
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  //
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  //
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  //
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  //
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  //
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  //
  CLEAR_ERRORS,
} from "../constants/roomConstants";

const mapReplace = {
  Tỉnh: "",
  "Thành phố": "",
  Quận: "",
  Huyện: "",
  "Thị xã": "",
  Xã: "",
  Phường: "",
  "Thị trấn": "",
};

function multiReplace(str, regex, replaces) {
  return str.replace(regex, function (x) {
    // check with replaces key to prevent error, if false it will return original value
    return Object.keys(replaces).includes(x) ? replaces[x] : x;
  });
}

export const getRooms =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 50000000000],
    category,
    rating = [0, 5],
    area = [0, 1000],
    address,
    status = "Đã phê duyệt"
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_ROOM_REQUEST,
      });

      let link = `/api/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating[0]}&rating[lte]=${rating[1]}&status=${status}&area[gte]=${area[0]}&area[lte]=${area[1]}`;

      if (category && category !== "Tất cả") {
        link += `&category=${category}`;
      }

      if (address && address !== "Toàn quốc") {
        address = multiReplace(
          address,
          /Tỉnh|Thành phố|Quận|Huyện|Thị xã|Xã|Phường|Thị trấn/g,
          mapReplace
        );
        const queryAnd = [];
        address.split(", ").forEach((key) => {
          var reg = new RegExp("^" + key);
          queryAnd.push({ address: { $regex: reg } });
        });

        // link += `{$and:${queryAnd}}`;
        // console.log(link);

        link += `&address=${address}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ROOM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// ADMIN
export const getAllRooms =
  (status = "Tất cả") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADMIN_ROOM_REQUEST,
      });

      let link = `/api/admin/rooms`;

      if (status !== "Tất cả") link = `/api/admin/rooms?status=${status}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ADMIN_ROOM_SUCCESS,
        payload: data.rooms,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ROOM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getRoomDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ROOM_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/room/${id}`);

    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROOM_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/room/create`, roomData, config);

    dispatch({
      type: NEW_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateRoom = (roomID, roomData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/room/${roomID}`, roomData, config);

    dispatch({
      type: UPDATE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateStatus = (roomID, roomData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STATUS_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/room/${roomID}/confirm`,
      roomData,
      config
    );

    dispatch({
      type: UPDATE_STATUS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRoom = (roomID) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST });

    const { data } = await axios.delete(`/api/room/${roomID}`);

    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/reviews?id=${reviewId}&roomID=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
