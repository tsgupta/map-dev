export enum RouteDirection {
    UP="up",
    DOWN="down"
}

export enum RouteStatus {
    ACTIVE="active",
    INACTIVE="inactive"
}

export class RouteStop {
    id: string;
    name: string;
    lat: number;
    long: number;

    constructor(id?: string, name?: string, lat?: number, long?: number) {
        this.id = id ?? "";
        this.name = name ?? "";
        this.lat = lat ?? 0;
        this.long = long ?? 0;
    }
}

export class Route {
    name: string;
    direction: RouteDirection;
    routeId: string;
    status: RouteStatus;
    stops: RouteStop[];

    constructor(routeId?: string, name?: string, direction?: RouteDirection,
        status?: RouteStatus, stops?: RouteStop[]) {
        this.name = name ?? "";
        this.direction = direction ?? RouteDirection.UP;
        this.routeId = routeId ?? "";
        this.status = status ?? RouteStatus.ACTIVE;
        this.stops = stops ?? [];
    }
}
