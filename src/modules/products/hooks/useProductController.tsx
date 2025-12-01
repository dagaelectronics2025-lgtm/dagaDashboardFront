import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/products/data/schemas.ts";

export const useProductController = () => {

    const formCreate = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {}
    })

    const onCreate = (values: z.infer<typeof createSchema>) => {
        console.log("CREATE PRODUCT VALUES >>", values)
    }

    return {
        // DATA
        formCreate,
        // METHODS
        onCreate

    }
}