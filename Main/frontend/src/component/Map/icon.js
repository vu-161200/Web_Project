import L from "leaflet";

var iconMark = L.icon({
  iconSize: [25, 41],
  iconAnchor: [13.5, 35],
  popupAnchor: [0, -35],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

var iconRoom = L.icon({
  iconSize: [40, 40],
  popupAnchor: [0, -20],
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/map-and-navigation-2-1/48/100-512.png",
});

var iconRoomBigger = L.icon({
  iconSize: [65, 65],
  popupAnchor: [0, -20],
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/map-and-navigation-2-1/48/100-512.png",
});

var iconLocation = L.icon({
  iconSize: [40, 40],
  popupAnchor: [0, -20],
  iconUrl: "http://cdn.onlinewebfonts.com/svg/img_537304.png",
});

export { iconMark, iconRoom, iconLocation, iconRoomBigger };
