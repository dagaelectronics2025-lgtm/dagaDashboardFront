import {EUserRoles} from "@/modules/users/data/types.ts";

export const userRolesOptions = [
    {value: EUserRoles.ADMIN, label: 'Administrador'},
    {value: EUserRoles.MANAGER, label: 'Gerente'},
    {value: EUserRoles.CASHIER, label: 'Cajero'},
    {value: EUserRoles.SELLER, label: 'Vendedor'}
];
