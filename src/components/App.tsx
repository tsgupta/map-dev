import { faArrowsToCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LatLngTuple } from "leaflet";
import { useState } from "react";
import { Route } from "../models/Route";
import { Map } from "./Map";
import { RouteList } from "./route/RouteList";

export default function App() {
  // Bangalore
  const defaultCenter: LatLngTuple = [12.9716, 77.5946];
  const [routes, setRoutes] = useState<Route[]>([]);
  const [center, setCenter] = useState<LatLngTuple>(defaultCenter);

  const onFocusChange = (route: Route) => {
    if (route.stops.length > 0) {
      const firstStop = route.stops[0];
      setCenter([firstStop.lat, firstStop.long]);
    }
  };

  return <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
    <div style={{ width: "30vw", padding: "0px 8px" }}>
      <h3>Map-Center Info</h3>
      <div className='map-info'>
        <span style={{ marginRight: 8 }}>Latitude: {center[0]}</span>
        <span>Longitude: {center[1]}</span>
        <FontAwesomeIcon
          icon={faArrowsToCircle}
          title="Re-center to default"
          style={{ marginLeft: "auto" }}
          onClick={() => setCenter(defaultCenter)}
        />
      </div>
      <RouteList routes={routes} onChange={setRoutes} onFocusChange={onFocusChange} />
    </div>
    <Map routes={routes} center={center} />
  </div>;

};
