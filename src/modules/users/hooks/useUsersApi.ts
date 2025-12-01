import {type QueryOptions, useApi} from "@/shared/hooks/useApi";
import type {CreateUserDto, UpdateUserDto, User} from "@/modules/users/data/types.ts";

export const useUsersApi = () => {
    const {useGet, usePost, usePut, useDelete} = useApi()

    const useGetUsers = (options?: QueryOptions) =>
        useGet<User[]>('/users', options)

    const useGetUser = (userId: number, options?: QueryOptions) =>
        useGet<User>(`/users/${userId}`, options)

    const useCreateUser = () =>
        usePost<User, CreateUserDto>('/users')

    const useUpdateUser = (userId: number) =>
        usePut<User, UpdateUserDto>(`/users/${userId}`)

    const useDeleteUser = (userId: User["id"]) =>
        useDelete(`/users/${userId}`)

    return {
        useGetUsers,
        useGetUser,
        useCreateUser,
        useUpdateUser,
        useDeleteUser,
    }
}