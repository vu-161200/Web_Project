import { useEffect } from "react";
import { useMap } from "react-leaflet";
import Locate from "leaflet.locatecontrol";
// Cần phải import css file ở public/index.html trước
export default function LocateControl(props) {
  const map = useMap();

  useEffect(() => {
    const locateOptions = {
      position: "topright",
      strings: {
        title: "Vị trí hiện tại",
      },
      flyTo: true,
      returnToPrevBounds: true,
      showCompass: true,
      onActivate: () => {}, // callback before engine starts retrieving locations
    };

    const lc = new Locate(locateOptions);
    lc.addTo(map); //.start();
  }, [map]);

  return null;
}
