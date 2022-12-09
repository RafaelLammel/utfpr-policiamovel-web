export interface LocationsResponse {
    locations: Location[]
}

export interface Location {
    userId: string,
    login: string,
    longitude: string,
    latitude: string,
    lastPutDate: string,
}  