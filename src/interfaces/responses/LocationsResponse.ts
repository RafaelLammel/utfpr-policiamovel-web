export interface LocationsResponse {
    locations: Location[]
}

export interface Location {
    userId: string,
    longitude: string,
    latitude: string
}  