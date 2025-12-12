import {z} from "zod";

export const createSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre del producto debe contener al menos 3 caracteres.",
    }),
    address: z.string().min(10, {
        message: "La dirección debe contener al menos 10 caracteres.",
    }),
    phone: z.string().min(7, {
        message: "El teléfono debe contener al menos 7 caracteres.",
    }),
    location: z.url().min(5, {
        message: "Ingrese una url de Google Maps"
    })
})
