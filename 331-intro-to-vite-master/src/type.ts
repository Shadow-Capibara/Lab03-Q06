export interface Passenger {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    ip_address: string,
    Source: string,
    Destination: string,
    travelDate: string,
    airlineId: number
}
export interface Airline {
    id: number,
    AirlineName: string,
    email: string,
    address: string
}