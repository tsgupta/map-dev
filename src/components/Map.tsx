import { LatLngExpression, LatLngTuple, PathOptions } from "leaflet";
import { useEffect } from "react";
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { CustomMarkerIcon } from "../icons/MarkerIcon";
import { Route, RouteStatus } from "../models/Route";


export const Map: React.FC<{ routes: Route[], center: LatLngExpression }> = ({ routes, center }) => {
  const activeRoutes = routes.filter(r => r.status === RouteStatus.ACTIVE);
  const inactiveRoutes = routes.filter(r => r.status === RouteStatus.INACTIVE);

  const getStops = (r: Route): LatLngTuple[] => r.stops.map(s => ([s.lat, s.long]));
  const activePolylines = activeRoutes.map(getStops);
  const inactivePolylines = inactiveRoutes.map(getStops);

  const commonPathOptions: PathOptions = { weight: 4, fillOpacity: 1 };
  const activePathOptions: PathOptions = { color: 'lime', fillColor: "lime", ...commonPathOptions };
  const inactivePathOptions: PathOptions = { color: 'red', fillColor: "red", ...commonPathOptions };

  return <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapPanner center={center} />
    //Marker for current center of the map
    <Marker position={center} icon={CustomMarkerIcon} />

    <StopMarkers routes={activeRoutes} options={activePathOptions} />
    <StopMarkers routes={inactiveRoutes} options={inactivePathOptions} />
    
    <Polyline pathOptions={activePathOptions} positions={activePolylines} />
    <Polyline pathOptions={inactivePathOptions} positions={inactivePolylines} />
  </MapContainer>;
};

const MapPanner: React.FC<{ center: LatLngExpression }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 12, {
      animate: true
    });
  }, [center, map]);

  return <></>;
};

const StopMarkers: React.FC<{ routes: Route[], options: PathOptions }> = ({ routes, options }) => {
  return <>
    {routes
      .map(r => r.stops)
      .flat()
      .map(s => <CircleMarker center={([s.lat, s.long])} pathOptions={options} radius={5}>
        <Popup><div>{s.name}</div></Popup>
      </CircleMarker>)}
  </>;
};
