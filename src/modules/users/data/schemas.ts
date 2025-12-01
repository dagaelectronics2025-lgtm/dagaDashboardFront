import {z} from "zod";
import {EUserRoles} from "@/modules/users/data/types.ts";

export const createSchema = z.object({
    name: z.string().min(3, {
        message: "Nombre debe contener minimo 3 caracteres.",
    }),
    email: z.email({pattern: z.regexes.email, message: "Introduzca un email válido"}),
    password: z.string().min(8, {
        message: "Contraseña debe contener minimo 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Confrimacion de contraseña debe contener minimo 8 caracteres.",
    }),
    username: z.string().min(3, {
        message: "Nombre de usuario debe contener minimo 3 caracteres.",
    }),
    role: z.nativeEnum(EUserRoles, {
        message: 'Rol de usuario es requerido'
    })

}).refine(data => data.password === data.confirmPassword, {
    message: "Contraseña y Confirmacion deben ser iguales",
    path: ["confirmPassword"]
})

export const editSchema = createSchema.omit({});