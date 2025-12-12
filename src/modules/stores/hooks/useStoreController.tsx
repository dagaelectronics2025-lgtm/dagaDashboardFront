import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/stores/data/schemas.ts";

export const useStoreController = () => {

    const formCreate = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            location: ''
        }
    })

    const onCreate = (values: z.infer<typeof createSchema>) => {
        console.log("CREATE STORE VALUES >>", values)
    }

    return {
        // DATA
        formCreate,
        // METHODS
        onCreate
    }
}