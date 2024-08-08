import axios, { type AxiosResponse } from 'axios'
import type { Passenger } from '@/type'
import type { Airline } from '@/type'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/se331-2022/passengerdb',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getAirlineById(id: number): Promise<AxiosResponse<Airline>> {
        return apiClient.get<Airline>(`/airline/${id}`)
    }
}
