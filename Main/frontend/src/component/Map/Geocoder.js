/* eslint-disable no-restricted-globals */
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import { iconMark } from "./icon";

export default function Geocoder(props) {
  const map = useMap();

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();
    let marker;

    if (typeof URLSearchParams !== "undefined" && location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Tìm kiếm...",
      defaultMarkGeocode: false,
      geocoder,
      collapsed: props.collapsed ?? true,
      position: "topleft",
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        map.flyTo(latlng);

        if (!props.updateRoom) {
          if (marker) {
            marker
              .setLatLng(latlng)
              .setPopupContent(e.geocode.name)
              .openPopup();
          } else {
            marker = L.marker(latlng, { icon: iconMark })
              .on("click", () => {
                marker.remove();
                marker = undefined;
              })
              .addTo(map)
              .bindPopup(e.geocode.name)
              .openPopup();
          }
        }

        props.setAddress && props.setAddress(e.geocode.name);
        props.setLat && props.setLat(latlng.lat);
        props.setLng && props.setLng(latlng.lng);
      })
      .addTo(map);

    // Chuột phải để hiển thị điểm đó
    map.on("contextmenu", (e) => {
      geocoder.reverse(
        e.latlng,
        map.options.crs.scale(map.getZoom()),
        (results) => {
          var r = results[0];
          if (r) {
            if (!props.updateRoom) {
              if (marker) {
                marker.setLatLng(r.center).setPopupContent(r.name).openPopup();
              } else {
                marker = L.marker(r.center, { icon: iconMark })
                  .on("click", () => {
                    marker.remove();
                    marker = undefined;
                  })
                  .bindPopup(r.name)
                  .addTo(map)
                  .openPopup();
              }
            }

            props.setAddress && props.setAddress(r.name);
            props.setLat && props.setLat(r.center.lat);
            props.setLng && props.setLng(r.center.lng);
          }
        }
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
