import React, { useEffect, useState, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

import { iconLocation } from "./icon";

export default function LocationMarker() {
  const [position, setPosition] = useState(null);
  const markerRef = useRef(null);
  const map = useMap();

  // const [first, setFirst] = useState(true);

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  useEffect(() => {
    if (markerRef.current !== null && !markerRef.current.isPopupOpen()) {
      markerRef.current.openPopup();
    }
  }, [position]);

  return position === null ? null : (
    <Marker ref={markerRef} position={position} icon={iconLocation}>
      <Popup>Bạn đang ở đây !!!</Popup>
    </Marker>
  );
}
