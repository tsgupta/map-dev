import L from 'leaflet';

export const CustomMarkerIcon = new L.Icon({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: new L.Point(20, 30),
    iconAnchor: [10, 30]
});
