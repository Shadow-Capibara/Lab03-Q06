import axios, { type AxiosResponse } from 'axios'
import type { Passenger } from '@/type'  // Adjust the import to match your folder structure

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/se331-2022/passengerdb',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getPassengers(perPage: number, page: number): Promise<AxiosResponse<Passenger[]>> {
        return apiClient.get<Passenger[]>(`/passenger?_limit=${perPage}&_page=${page}`)
    },
    getPassengerById(id: number): Promise<AxiosResponse<Passenger>> {
        return apiClient.get<Passenger>(`/passenger/${id}`)
    }
}
