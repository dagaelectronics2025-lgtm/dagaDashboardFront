import {z} from "zod";
import {EUserRoles} from "@/modules/users/data/types.ts";

export const createSchema = z.object({
    username: z.string().min(4, {
        message: "Nombre de usuario debe contener minimo 4 caracteres.",
    }),
    password: z.string().min(8, {
        message: "Contraseña debe contener minimo 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Confrimacion de contraseña debe contener minimo 8 caracteres.",
    }),
    role: z.enum(EUserRoles, {
        message: 'Rol de usuario es requerido'
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Contraseña y Confirmacion deben ser iguales",
    path: ["confirmPassword"]
})
