import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { Route, RouteDirection, RouteStatus, RouteStop } from "../../models/Route";
import { Button, RadioButtons, TextInput } from '../core';

interface RouteFormProps {
    route: Route;
    onChange: (newRoute: Route) => void;
}

export const RouteForm: React.FC<RouteFormProps> = ({ route, onChange }) => {
    const { name, direction, routeId, status, stops } = route;

    const onPartialChange = useCallback((pRoute: Partial<Route>) => {
        const newRoute = Object.assign({}, route, pRoute);
        onChange(newRoute);
    }, [onChange, route]);

    const onStopChange = useCallback((stop: RouteStop, pos: number) => {
        const updatedStops = [...stops];
        if (pos < updatedStops.length)
            updatedStops[pos] = stop;
        onPartialChange({ stops: updatedStops });
    }, [stops, onPartialChange]);

    const onAddStop = useCallback(() => {
        const updatedStops = [...stops];
        const N = updatedStops.length;
        updatedStops.push(new RouteStop(`${routeId}s${N + 1}`, `Stop ${N + 1}`));
        onPartialChange({ stops: updatedStops });
    }, [stops, routeId, onPartialChange]);

    const onRemoveStop = useCallback((pos: number) => {
        const updatedStops = [...stops];
        updatedStops.splice(pos, 1);
        onPartialChange({ stops: updatedStops });
    }, [stops, onPartialChange]);

    return <div className="route-form">
        <div style={{ display: "flex" }}>
            <TextInput
                label="Id"
                type="text"
                onChange={(newId) => onPartialChange({ routeId: newId })}
                value={routeId}
            />
            <span style={{ marginRight: 6 }} />
            <TextInput
                label="Name"
                type="text"
                onChange={(newName) => onPartialChange({ name: newName })}
                value={name}
            />
        </div>
        <span style={{ marginBottom: 8 }} />
        <RadioButtons
            label="Direction"
            name="dir"
            selectedValue={direction}
            values={[RouteDirection.UP, RouteDirection.DOWN]}
            onChange={(d) => onPartialChange({ direction: d as RouteDirection })}
        />
        <span style={{ marginBottom: 8 }} />
        <RadioButtons
            label="Status"
            name="status"
            selectedValue={status}
            values={[RouteStatus.ACTIVE, RouteStatus.INACTIVE]}
            onChange={(s) => onPartialChange({ status: s as RouteStatus })}
        />
        <span style={{ marginBottom: 8 }} />
        <span className="form-label">Stops</span>
        {stops.map((stop, i) =>
            <React.Fragment key={stop.id}>
                <div style={{ display: "flex" }}>
                    <h2 className='vertical-center'>{i + 1}</h2>
                    <span style={{ marginRight: 12 }} />
                    <StopForm stop={stop} onChange={st => onStopChange(st, i)} />
                    <span style={{ marginRight: 16 }} />
                    <div className='vertical-center'>
                        <FontAwesomeIcon icon={faTrash} onClick={() => onRemoveStop(i)} />
                    </div>
                </div>
                <span style={{ margin: "16px 100px", borderTop: "1px solid" }} />
            </React.Fragment>
        )}
        <Button label={"+ Add stop"} onClick={onAddStop} />
    </div>;
};

const StopForm: React.FC<{ stop: RouteStop, onChange: (newStop: RouteStop) => void }> = (props) => {
    const { stop, onChange } = props;
    const { id, name, lat, long } = stop;

    const onPartialChange = useCallback((pRouteStop: Partial<RouteStop>) => {
        const newRoute = Object.assign({}, stop, pRouteStop);
        onChange(newRoute);
    }, [onChange, stop]);

    return <div>
        <div style={{ display: "flex" }}>
            <TextInput
                label="Id"
                type="text"
                onChange={(id) => onPartialChange({ id })}
                value={id}
            />
            <span style={{ marginRight: 6 }} />
            <TextInput
                label="Name"
                type="text"
                onChange={(name) => onPartialChange({ name })}
                value={name}
            />
        </div>
        <div style={{ display: "flex" }}>
            <TextInput
                label="Lattitude"
                type="number"
                onChange={(lat) => onPartialChange({ lat })}
                value={lat.toString()}
            />
            <span style={{ marginRight: 6 }} />
            <TextInput
                label="Longitude"
                type="number"
                onChange={(long) => onPartialChange({ long })}
                value={long.toString()}
            />
        </div>
        <span style={{ marginBottom: 8 }} />
    </div>;
};
