import { faAngleRight, faAngleUp, faTrash, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Route, RouteStatus } from "../../models/Route";
import { RouteForm } from './RouteForm';

interface RouteCardProps {
    route: Route;
    onChange: (newRoute: Route) => void;
    onDelete: () => void;
    onFocus: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onChange, onDelete, onFocus }) => {
    const { name, stops, status } = route;
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const stopsLen = stops.length;
    const stopText = stopsLen === 0 ? "" : stopsLen === 1 ? "1 Stop" : `${stopsLen} Stops`;

    const isActive = status === RouteStatus.ACTIVE;
    return <>
        <div className={`route-card-details ${isActive ? "active" : "inactive"}`} >
            <div style={{flexGrow: 1}} onClick={() => setShowDetails(!showDetails)}>
                <span style={{ marginRight: 6 }}>
                    <FontAwesomeIcon icon={showDetails ? faAngleUp : faAngleRight} />
                </span>
                <span><b>{name || "<New Route>"}</b>{stopText ? ` - ${stopText}` : ''}</span>
            </div>
            <div className="card-actions">
                {stops.length > 0 && <FontAwesomeIcon icon={faLocationDot} onClick={onFocus} title="Re-center map to first stop" />}
                <span style={{ marginRight: 12 }} />
                <FontAwesomeIcon icon={faTrash} onClick={onDelete} />
            </div>
        </div>
        <div>
            {showDetails && <RouteForm route={route} onChange={onChange} />}
        </div>
    </>;
};
