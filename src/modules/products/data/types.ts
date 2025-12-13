// API

export interface Product {
    id: string
    name: string
    description: string
    category: string
    price: number
    priceAlt: number
    stock: number
    code: string
}

export interface CreateProductDto {
    name: string
    description: string
    price: number
    priceAlt: number
    stock: number
    code: string
}

export interface UpdateProductDto {
    name: string
    description: string
    price: number
    priceAlt: number
    stock: number
}