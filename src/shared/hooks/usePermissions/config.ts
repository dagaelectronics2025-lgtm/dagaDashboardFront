import {type Permission, PERMISSION_GROUPS, type RoleKey, type RolesConfig} from './types.ts';

export const ROLES_CONFIG: RolesConfig = {
    admin: {
        name: 'Administrador',
        description: 'Administración del sistema sin límites',
        permissions: [
            ...PERMISSION_GROUPS.USER_MANAGEMENT,
            ...PERMISSION_GROUPS.PRODUCT_MANAGEMENT,
        ],
        inherits: ['manager']
    },

    manager: {
        name: 'Gerente',
        description: 'Gestión de equipos y operaciones',
        permissions: [
            'users:read',
            'products:read',
            'products:update',
        ],
        inherits: ['cashier']
    },

    cashier: {
        name: 'Cajero',
        description: 'Acceso a funciones de caja y ventas',
        permissions: [
            'products:read',
        ],
        inherits: ['seller']
    },

    seller: {
        name: 'Vendedor',
        description: 'Acceso a ventas y gestión básica de productos',
        permissions: [
            'products:read',
        ],
        inherits: []
    },

};

export class PermissionService {
    static getAllRolePermissions(roleKey: RoleKey): Permission[] {
        const role = ROLES_CONFIG[roleKey];
        if (!role) return [];

        let permissions = [...role.permissions];

        if (role.inherits) {
            role.inherits.forEach(inheritedRole => {
                permissions = [...permissions, ...this.getAllRolePermissions(inheritedRole)];
            });
        }

        return [...new Set(permissions)];
    }

    static hasPermission(role: RoleKey | null, permission: Permission): boolean {
        if (!role) return false;
        const permissions = this.getAllRolePermissions(role);
        return permissions.includes(permission);
    }

    static hasAnyPermission(role: RoleKey | null, requiredPermissions: Permission[]): boolean {
        if (!role) return false;
        const userPermissions = this.getAllRolePermissions(role);
        return requiredPermissions.some(permission =>
            userPermissions.includes(permission)
        );
    }

    static hasAllPermissions(role: RoleKey | null, requiredPermissions: Permission[]): boolean {
        if (!role) return false;
        const userPermissions = this.getAllRolePermissions(role);
        return requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );
    }

    static getPermissionsByModule(role: RoleKey, module: string): Permission[] {
        const allPermissions = this.getAllRolePermissions(role);
        return allPermissions.filter(permission =>
            permission.startsWith(`${module}:`)
        );
    }

    static canAccessModule(role: RoleKey, module: string): boolean {
        const modulePermissions = this.getPermissionsByModule(role, module);
        return modulePermissions.length > 0;
    }
}