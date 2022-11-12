import "./Home.css";

// Import map và css của map
import "leaflet/dist/leaflet.css";
import Map from "../Map/Map";

import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import RoomCard from "./RoomCard";
import MetaData from "../layout/MetaData";
import { getRooms, clearErrors } from "../../actions/roomAction";
import Loading from "../layout/loading/loading";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, rooms } = useSelector((state) => state.rooms);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRooms());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Trang chủ" />

          <div className="mapboxContainer">
            <Map view={true} rooms={rooms} />
          </div>

          <h2 className="homeHeading">Phòng nổi bật</h2>
          <div className="listContainer" id="listContainer">
            {rooms &&
              rooms.map((room) => <RoomCard key={room._id} room={room} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
