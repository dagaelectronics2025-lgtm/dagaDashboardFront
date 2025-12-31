import {useMutation, useQuery} from "@tanstack/react-query";
import type {CreateUserDto, UpdateUserDto, User} from "@/modules/users/data/types.ts";
import {testUsers} from "@/modules/users/data/data-test.ts";

const fakeDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let usersMemory: User[] = [...testUsers];

export const useUsersApi = () => {
    const useGetUsers = () =>
        useQuery<User[]>({
            queryKey: ["users"],
            queryFn: async () => {
                await fakeDelay(150);
                return usersMemory;
            },
        });

    const useGetUser = (userId: string) =>
        useQuery<User>({
            queryKey: ["users", userId],
            queryFn: async () => {
                await fakeDelay(150);
                const user = usersMemory.find((u) => u.id === userId);
                if (!user) throw new Error("User not found");
                return user;
            },
            enabled: Boolean(userId),
        });

    const useCreateUser = () =>
        useMutation({
            mutationFn: async (dto: CreateUserDto) => {
                await fakeDelay(150);
                const newUser: User = {
                    id: crypto.randomUUID(),
                    name: dto.name,
                    email: dto.email,
                    username: dto.username,
                    role: dto.role as User["role"],
                    createdAt: new Date().toISOString(),
                };
                usersMemory = [newUser, ...usersMemory];
                return newUser;
            },
        });

    const useUpdateUser = (userId: User["id"]) =>
        useMutation({
            mutationFn: async (dto: UpdateUserDto) => {
                await fakeDelay(150);
                usersMemory = usersMemory.map((u) =>
                    u.id === userId
                        ? ({
                            ...u,
                            name: dto.name,
                            email: dto.email,
                            username: dto.username,
                            role: dto.role as User["role"],
                        } as User)
                        : u,
                );
                const updated = usersMemory.find((u) => u.id === userId);
                if (!updated) throw new Error("User not found");
                return updated;
            },
        });

    const useDeleteUser = (userId: User["id"]) =>
        useMutation({
            mutationFn: async () => {
                await fakeDelay(150);
                usersMemory = usersMemory.filter((u) => u.id !== userId);
                return;
            },
        });

    return {
        useGetUsers,
        useGetUser,
        useCreateUser,
        useUpdateUser,
        useDeleteUser,
    };
};
