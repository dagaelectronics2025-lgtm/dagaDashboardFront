import type {RoleKey} from "@/shared/hooks/usePermissions/types.ts";

export type TAuthUser = {
    email: string,
    displayName: string,
    role: RoleKey,
}