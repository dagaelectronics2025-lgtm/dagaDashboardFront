import {create} from "zustand/react";
import type {TAuthUser} from "@/shared/data/types.ts";
import {persist} from "zustand/middleware";
import type {RoleKey} from "@/shared/hooks/usePermissions/types.ts";

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
    getUserRole: () => RoleKey | undefined
}

const initialState: State = {
    user: undefined,
    accessToken: undefined,
    isAuthenticated: false,
}

export const useAuthStore = create<State & Actions>()(
    persist(
        (set, get) => ({
            ...initialState,
            setUser: (user: TAuthUser) => set(() => ({user: user})),
            setAccessToken: (accessToken: string) => set(() => ({accessToken: accessToken})),
            setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
            getUserRole: () => get().user?.role,
            clearSession: () => {
                set(initialState)
                useAuthStore.persist.clearStorage()
            },
        }), {
            name: 'auth-storage',
        }
    ))