import type {RoleKey} from "@/shared/hooks/usePermissions/types.ts";

export interface SignInDto {
    email: string
    password: string
}

export interface AuthResponse {
    access_token: string
    username: string
    role: RoleKey
}