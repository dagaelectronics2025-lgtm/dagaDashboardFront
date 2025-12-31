import {z} from "zod";

export const orderSchema = z.object({
    code: z.string().min(1, "El código es requerido"),
    customer: z.string().min(1, "El cliente es requerido"),
    seller: z.string().min(1, "El vendedor es requerido"),
    total: z.number().min(0, "El total debe ser mayor o igual a 0"),
    status: z.string().min(1, "El estado es requerido"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
