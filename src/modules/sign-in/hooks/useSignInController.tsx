import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {formSchema} from "@/modules/sign-in/data/schemas.ts";
import {useAuthController} from "@/shared/hooks/useAuthController.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export function useSignInController() {

    const navigate = useNavigate();

    const {logIn, isAuthenticated} = useAuthController()

    const [authError, setAuthError] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const {email, password} = values
        console.log("SIGN IN VALUES >> ", {email, password})

        logIn(email, password)

        if (isAuthenticated) {
            return navigate("/dashboard")
        }
        return setAuthError(true)
    }

    return {
        // DATA
        form,
        authError,
        // METHODS
        onSubmit

    }
}