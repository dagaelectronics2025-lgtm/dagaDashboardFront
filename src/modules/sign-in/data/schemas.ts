import {z} from "zod";

export const formSchema = z.object({
    email: z.email({pattern: z.regexes.email, message: "Introduzca un email válido"}),
    password: z.string().min(8, {
        message: "Contraseña requiere al menos 8 caracteres.",
    })
}).required();
