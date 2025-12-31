import type {User} from "@/modules/users/data/types";
import {EUserRoles} from "@/modules/users/data/types";

export const testUsers: User[] = [
    {
        id: "1",
        name: "Admin Principal",
        email: "admin@daga.local",
        username: "admin",
        role: EUserRoles.ADMIN,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "María López",
        email: "maria.lopez@daga.local",
        username: "mlopez",
        role: EUserRoles.MANAGER,
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Carlos Pérez",
        email: "carlos.perez@daga.local",
        username: "cperez",
        role: EUserRoles.SELLER,
        createdAt: new Date().toISOString(),
    },
    {
        id: "4",
        name: "Ana Sánchez",
        email: "ana.sanchez@daga.local",
        username: "asanchez",
        role: EUserRoles.CASHIER,
        createdAt: new Date().toISOString(),
    },
    {
        id: "5",
        name: "Juan Rodríguez",
        email: "juan.rodriguez@daga.local",
        username: "jrodriguez",
        role: EUserRoles.SELLER,
        createdAt: new Date().toISOString(),
    },
];

