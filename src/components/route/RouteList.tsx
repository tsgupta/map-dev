import React, { useCallback } from "react";
import { Route } from "../../models/Route";
import { Button, Exporter } from "../core";
import { RouteCard } from "./RouteCard";

interface RouteListProps {
    routes: Route[];
    onChange: (routes: Route[]) => void;
    onFocusChange: (route: Route) => void;
}

export const RouteList: React.FC<RouteListProps> = ({ routes, onChange, onFocusChange }) => {

    const onRouteChange = useCallback((route: Route, pos: number) => {
        const newRoutes = [...routes];
        if (pos < newRoutes.length)
            newRoutes[pos] = route;
        onChange(newRoutes);
    }, [routes, onChange]);

    const onRouteDelete = useCallback((pos: number) => {
        const routesClone = [...routes];
        routesClone.splice(pos, 1);
        onChange(routesClone);
    }, [routes, onChange]);

    const onRouteAdd = useCallback(() => {
        const routesClone = [...routes];
        const N = routes.length;
        routesClone.push(new Route(`r${N + 1}`, `Route${N + 1}`));
        onChange(routesClone);
    }, [routes, onChange]);

    return <div>
        <div style={{ display: "flex" }}>
            <h3>Routes</h3>
            {routes.length > 0 && <span className="exporter">
                <Exporter routes={routes} />
            </span>}
        </div>
        {routes.map((route, i) =>
            <RouteCard
                key={route.routeId}
                route={route}
                onChange={r => onRouteChange(r, i)}
                onDelete={() => onRouteDelete(i)}
                onFocus={() => onFocusChange(routes[i])}
            />
        )}
        <Button
            label={"+ Add route"}
            onClick={onRouteAdd}
        />
    </div>;
};
