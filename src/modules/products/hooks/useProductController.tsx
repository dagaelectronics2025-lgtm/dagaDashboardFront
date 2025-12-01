import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/products/data/schemas.ts";
import {EProductRoles} from "@/modules/products/data/types.ts";

export const useProductController = () => {

    const formCreate = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            role: EProductRoles.SELLER
        }
    })

    const onCreate = (values: z.infer<typeof createSchema>) => {
        console.log("CREATE USER VALUES >>", values)
    }

    return {
        // DATA
        formCreate,
        // METHODS
        onCreate

    }
}