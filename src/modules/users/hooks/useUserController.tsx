import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/users/data/schemas.ts";

export const useUserController = () => {

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
    })

    const onSubmit = (values: z.infer<typeof createSchema>) => {
        console.log("CREATE USER VALUES >>", values)
    }

    return {
        // DATA
        form,
        // METHODS
        onSubmit

    }
}