import {z} from "zod";
import {EProductRoles} from "@/modules/products/data/types.ts";

export const createSchema = z.object({
    email: z.email({pattern: z.regexes.email, message: "Introduzca un email válido"}),
    password: z.string().min(8, {
        message: "Contraseña debe contener minimo 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Confrimacion de contraseña debe contener minimo 8 caracteres.",
    }),
    productname: z.string().min(3, {
        message: "Nombre de producto debe contener minimo 3 caracteres.",
    }),
    role: z.enum(EProductRoles, {
        message: 'Rol de producto es requerido'
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Contraseña y Confirmacion deben ser iguales",
    path: ["confirmPassword"]
})
