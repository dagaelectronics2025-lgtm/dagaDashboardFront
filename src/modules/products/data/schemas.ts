import {z} from "zod";

export const createSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre del producto debe contener al menos 3 caracteres.",
    }),
    description: z.string().min(10, {
        message: "La descripción del producto debe contener al menos 10 caracteres.",
    }),
    price: z.number().positive({
        message: "El precio mayorista del producto debe ser un número positivo.",
    }),
    priceAlt: z.number().positive({
        message: "El precio minorista del producto debe ser un número positivo.",
    }),
    category: z.string().min(3, {
        message: "La categoría del producto debe contener al menos 3 caracteres.",
    }),
    stock: z.number().int().nonnegative({
        message: "El stock del producto debe ser un número entero no negativo.",
    }),
    code: z.string().min(8, {
        message: "El código del producto debe contener al menos 8 caracteres.",
    })
})
