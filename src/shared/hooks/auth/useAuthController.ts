import {useAuthStore} from "@/shared/stores/authStore.ts";
import {useNavigate} from "react-router-dom";
import {useAuthApi} from "@/shared/hooks/auth/useAuthApi.ts";

export const useAuthController = () => {

    const navigate = useNavigate();

    // FIREBASE AUTH METHODS
    // const {auth, signInWithEmailAndPassword, signOut} = useFirebase()

    const {setAccessToken, setIsAuthenticated, getUserRole, clearSession, isAuthenticated} = useAuthStore()

    const {useSignIn} = useAuthApi()
    const {mutate: signIn, isPending: loadingSignIn} = useSignIn()

    const logIn = async (email: string, password: string) =>
        signIn({email, password}, {
            onSuccess: (data) => {
                console.log("SIGN IN USER >> ", data.token)

                setAccessToken(data.token)
                setIsAuthenticated(true)
                navigate("/dashboard")

            },
            onError: (error) => {
                console.log("SIGN IN ERROR >> ", error)

                setIsAuthenticated(false)

            }
        })


    const logOut = () => {
        console.log("SIGN OUT")

        clearSession()

        navigate("/")

    }

    return {
        // DATA
        isAuthenticated,
        loadingSignIn,
        // METHODS
        logIn,
        logOut,
        getUserRole
    }

}