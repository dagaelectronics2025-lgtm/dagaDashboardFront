import {useApi} from "@/shared/hooks/useApi";
import type {AuthResponse, SignInDto} from "@/shared/hooks/auth/types.ts";

export const useAuthApi = () => {

    const {usePost} = useApi()

    const useSignIn = () =>
        usePost<AuthResponse, SignInDto>('/auth/login')

    return {
        useSignIn,
    }
}