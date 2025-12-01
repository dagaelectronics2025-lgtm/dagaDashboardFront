export enum EProductRoles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    CASHIER = 'cashier',
    SELLER = 'seller'
}

// API

export interface Product {
    id: number
    email: string
    productname: string
    role: EProductRoles
    createdAt: string
}

export interface CreateProductDto {
    email: string
    password: string
    productname: string
    role: EProductRoles
}

export interface UpdateProductDto {
    name?: string
    email?: string
}