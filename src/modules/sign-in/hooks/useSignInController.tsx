import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {formSchema} from "@/modules/sign-in/data/schemas.ts";
import {useAuthController} from "@/shared/hooks/auth/useAuthController.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export function useSignInController() {

    const navigate = useNavigate();

    const {logIn, isAuthenticated, loadingSignIn} = useAuthController()

    const [authError, setAuthError] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("SIGN IN VALUES >> ", values)

        await logIn(values.email, values.password)

        if (isAuthenticated) {
            console.log("DATA >> ", {isAuthenticated})
            return navigate("/dashboard")
        }
        return setAuthError(true)
    }

    return {
        // DATA
        form,
        authError,
        loadingSignIn,
        // METHODS
        onSubmit

    }
}