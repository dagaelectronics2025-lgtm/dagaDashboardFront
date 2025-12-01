import type {RoleKey} from "@/shared/hooks/usePermissions/types.ts";

export type TAuthUser = {
    username: string,
    role: RoleKey,
}