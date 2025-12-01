import {PermissionService} from './config.ts';
import {useAuthStore} from "@/shared/stores/authStore.ts";
import {
    type Permission,
    PERMISSION_GROUPS,
    type PermissionModule,
    type RoleKey
} from "@/shared/hooks/usePermissions/types.ts";

export const usePermissions = () => {
    const {getUserRole} = useAuthStore.getState();
    const userRole = getUserRole() || null;

    return {
        // Verificaciones básicas
        can: (permission: Permission): boolean =>
            PermissionService.hasPermission(userRole, permission),

        canAny: (permissions: Permission[]): boolean =>
            PermissionService.hasAnyPermission(userRole, permissions),

        canAll: (permissions: Permission[]): boolean =>
            PermissionService.hasAllPermissions(userRole, permissions),

        // Verificaciones por módulo
        canAccessModule: (module: PermissionModule): boolean =>
            userRole ? PermissionService.canAccessModule(userRole, module) : false,

        getModulePermissions: (module: PermissionModule) =>
            userRole ? PermissionService.getPermissionsByModule(userRole, module) : [],

        // Grupos predefinidos
        canManageUsers: (): boolean =>
            PermissionService.hasAnyPermission(userRole, PERMISSION_GROUPS.USER_MANAGEMENT),

        canManageProducts: (): boolean =>
            PermissionService.hasAnyPermission(userRole, PERMISSION_GROUPS.PRODUCT_MANAGEMENT),

        // Información del usuario
        userPermissions: userRole ? PermissionService.getAllRolePermissions(userRole) : [],

        // Verificaciones de rol
        hasRole: (role: RoleKey): boolean => userRole === role,
        hasAnyRole: (roles: RoleKey[]): boolean =>
            userRole ? roles.includes(userRole) : false
    };
};