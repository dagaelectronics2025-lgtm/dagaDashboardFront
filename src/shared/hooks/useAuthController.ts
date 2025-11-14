import {useFirebase} from "@/shared/hooks/useFirebase.ts";
import {useAuthStore} from "@/shared/stores/authStore.ts";
import {useNavigate} from "react-router-dom";

export const useAuthController = () => {

    const navigate = useNavigate();

    const {auth, signInWithEmailAndPassword, signOut} = useFirebase()

    const {setUser, setAccessToken, setIsAuthenticated, clearSession, isAuthenticated} = useAuthStore()

    const logIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password).then(data => {
            console.log("SIGN IN USER >> ", data.user)
            // @ts-ignore
            setAccessToken(data.user.accessToken as string)
            setUser({
                email: data.user.email as string,
                displayName: data.user.displayName as string
            })
            setIsAuthenticated(true)
        }).catch(error => {
            console.log("SIGN IN ERROR >> ", error)
            setAccessToken(error)
        })
    }

    const logOut = () => {
        console.log("SIGN OUT")
        signOut(auth).then(r => {

            clearSession()

            navigate("/")

        })
    }

    return {
        // DATA
        isAuthenticated,
        // METHODS
        logIn,
        logOut
    }

}