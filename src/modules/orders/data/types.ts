export interface Order {
    id: string
    code: string
    status: string
    total: number
    customer: string
    seller: string
}

export interface UpdateOrderDto {
    status: string
    total: number
    customer: string
    seller: string
}

export interface CreateOrderDto {
    status: string
    total: number
    customer: string
    seller: string
}
