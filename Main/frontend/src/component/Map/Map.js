import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";

import LocateControl from "./LocateControl";
import Geocoder from "./Geocoder";
import LocationMarker from "./LocationMarker";

import { iconRoom, iconRoomBigger } from "./icon";

const Map = (props) => {
  const mapStyle = {
    width: props.width ?? "100%",
    height: props.height ?? "100%",
    position: props.position ?? "absolute",
    top: props.top ?? "0",
    bottom: props.bottom ?? "0",
    left: props.left ?? "0",
    right: props.right ?? "0",
  };

  var mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current !== null && props.lat && props.lng) {
      mapRef.current.flyTo({ lat: props.lat, lng: props.lng });
      // mapRef.current.panTo({ lat: props.lat, lng: props.lng });
    }
  }, [props, mapRef]);

  return (
    <MapContainer
      ref={mapRef}
      center={{ lat: props.lat ?? 21.030653, lng: props.lng ?? 105.84713 }}
      zoom={props.zoom ?? 16}
      style={mapStyle}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/einestimono2/cl49q1ljv000m14mivjy4e517/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZWluZXN0aW1vbm8yIiwiYSI6ImNsM21rcWFycTA1cXkzamwybDl6emFoZ2YifQ.Bjm6A8tfXJU1mC9XFbXLTA"
      />

      {props.lat && props.lng && (
        <Marker
          position={[props.lat, props.lng]}
          icon={iconRoomBigger}
        ></Marker>
      )}

      {/* Bay đến vị trí hiện tại của mình khi mới load map */}
      {!props.lat && !props.lng && <LocationMarker />}

      {/* Nút ấn nhảy tới vị trị hiện tại */}
      <LocateControl />

      <ZoomControl position="bottomright" />

      {!props.noSearch && <Geocoder {...props} />}

      {props.rooms !== undefined &&
        props.rooms.map((room) => (
          <Marker
            position={[room.lat, room.lng]}
            icon={iconRoom}
            key={room._id}
          >
            <Popup>
              <div className="popupContainer">
                <a
                  href={`/room/${room._id}`}
                  className="popupName"
                  style={{
                    font: "bold 1vmax Roboto",
                  }}
                >
                  {room.name}
                </a>
                <p>Địa chỉ: {room.address}</p>
                <p>Giá phòng: {room.price.toLocaleString("en-US")} VNĐ/tháng</p>
                <div style={{ display: "flex", overflow: "auto" }}>
                  {room.images &&
                    room.images.map((e) => (
                      <img
                        key={e.public_id}
                        src={e.url}
                        alt="img"
                        style={{
                          width: "3vmax",
                          height: "3vmax",
                          marginRight: "0.24vmax",
                          objectFit: "cover",
                        }}
                      ></img>
                    ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
