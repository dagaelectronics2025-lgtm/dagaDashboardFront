// API

export interface Product {
    id: string
    name: string
    description: string
    price: number
    priceAlt: number
    stock: number
}

export interface CreateProductDto {
    name: string
    description: string
    price: number
    priceAlt: number
    stock: number
}

export interface UpdateProductDto {
    name: string
    description: string
    price: number
    priceAlt: number
    stock: number
}