// API

export interface Store {
    id: string
    name: string
    address: string
    phone: string
    location: string
}

export interface CreateStoreDto {
    name: string
    address: string
    phone: string
    location: string
}

export interface UpdateStoreDto {
    name: string
    address: string
    phone: string
    location: string
}