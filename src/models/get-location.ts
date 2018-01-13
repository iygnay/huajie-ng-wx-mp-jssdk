export interface GetLocationRequest {
    type: string,
}

export interface GetLocationResult {
    latitude: number,
    longitude: number,
    speed: number,
    accuracy: any,
}