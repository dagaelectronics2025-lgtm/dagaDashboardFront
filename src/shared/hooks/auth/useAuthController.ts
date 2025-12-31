import {useAuthStore} from "@/shared/stores/authStore.ts";
import {useNavigate} from "react-router-dom";

export const useAuthController = () => {

    const navigate = useNavigate();

    const {setAccessToken, setIsAuthenticated, setUser, getUserRole, clearSession, isAuthenticated} = useAuthStore()

    const logIn = async (email: string, password: string): Promise<boolean> => {
        // Local auth (modo sin backend)
        const normalizedEmail = email.trim().toLowerCase()

        if (normalizedEmail === 'test@test.com' && password === '12340987') {
            setUser({username: 'test', role: 'admin'})
            setAccessToken('local-access-token')
            setIsAuthenticated(true)
            navigate("/dashboard")
            return true
        }

        setIsAuthenticated(false)
        return false
    }

    const logOut = () => {
        console.log("SIGN OUT")

        clearSession()

        navigate("/")

    }

    return {
        // DATA
        isAuthenticated,
        loadingSignIn: false,
        // METHODS
        logIn,
        logOut,
        getUserRole
    }

}