import type {RoleKey} from "@/shared/hooks/usePermissions/types.ts";

export enum EUserRoles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    CASHIER = 'cashier',
    SELLER = 'seller'
}

// API

export interface User {
    id: string
    name: string
    email: string
    username: string
    role: EUserRoles
    createdAt: string
}

export interface CreateUserDto {
    name: string
    email: string
    password: string
    username: string
    role: RoleKey
}

export interface UpdateUserDto {
    name: string
    email: string
    password: string
    username: string
    role: RoleKey
}