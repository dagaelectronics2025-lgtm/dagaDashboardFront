// =============================================
// MÓDULOS Y PERMISOS ESPECÍFICOS
// =============================================

// Módulo de Usuarios
export type UserPermissions =
    | 'users:create'
    | 'users:read'
    | 'users:update'
    | 'users:delete'
    | 'users:roles:assign'
    | 'users:permissions:manage';

// Módulo de Productos
export type ProductPermissions =
    | 'products:create'
    | 'products:read'
    | 'products:update'
    | 'products:delete'
    | 'products:bulk_operations'
    | 'products:categories:manage'
    | 'products:inventory:manage';

// =============================================
// TIPOS UNIÓN Y CONFIGURACIÓN PRINCIPAL
// =============================================

// Unión de todos los permisos
export type Permission =
    | UserPermissions
    | ProductPermissions

// Roles del sistema
export type RoleKey =
    | 'admin'
    | 'manager'
    | 'seller'
    | 'cashier';

// Grupos predefinidos de permisos para uso común
export const PERMISSION_GROUPS = {

    USER_MANAGEMENT: [
        'users:read',
        'users:create',
        'users:update',
        'users:delete'
    ] as UserPermissions[],

    PRODUCT_MANAGEMENT: [
        'products:create',
        'products:read',
        'products:update',
        'products:delete',
        'products:categories:manage'
    ] as ProductPermissions[]

} as const;

// =============================================
// TIPOS PARA VALIDACIÓN Y CONFIGURACIÓN
// =============================================

// Para validar módulos específicos
export type PermissionModule =
    | 'users'
    | 'products';

// Para configuraciones de roles
export interface RoleConfig {
    name: string;
    description: string;
    permissions: Permission[];
    inherits?: RoleKey[];
    isSystemRole?: boolean;
}

export type RolesConfig = Record<RoleKey, RoleConfig>;

// Utilidad para extraer permisos por módulo
export type PermissionsByModule<T extends PermissionModule> =
    T extends 'users' ? UserPermissions :
        T extends 'products' ? ProductPermissions : never