import {create} from "zustand/react";
import type {TAuthUser} from "@/shared/data/types.ts";
import {persist} from "zustand/middleware";

type State = {
    user?: TAuthUser
    accessToken?: string
    isAuthenticated: boolean
}

type Actions = {
    setUser: (user: TAuthUser) => void
    setAccessToken: (accessToken: string) => void
    clearSession: () => void
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<State & Actions>()(
    persist(
        (set) => ({
            user: undefined,
            accessToken: undefined,
            isAuthenticated: false,
            setUser: (user: TAuthUser) => set(() => ({user: user})),
            setAccessToken: (accessToken: string) => set(() => ({accessToken: accessToken})),
            clearSession: () => set({user: undefined, accessToken: undefined}),
            setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
        }), {
            name: 'auth-storage',
        }
    ))