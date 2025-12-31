import {useMutation, useQuery} from "@tanstack/react-query";
import type {CreateStoreDto, Store, UpdateStoreDto} from "@/modules/stores/data/types.ts";
import {testStores} from "@/modules/stores/data/data-test.ts";

const fakeDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let storesMemory: Store[] = [...testStores];

export const useStoresApi = () => {
    const useGetStores = () =>
        useQuery<Store[]>({
            queryKey: ["stores"],
            queryFn: async () => {
                await fakeDelay(150);
                return storesMemory;
            },
        });

    const useGetStore = (storeId: string) =>
        useQuery<Store>({
            queryKey: ["stores", storeId],
            queryFn: async () => {
                await fakeDelay(150);
                const store = storesMemory.find((s) => s.id === storeId);
                if (!store) throw new Error("Store not found");
                return store;
            },
            enabled: Boolean(storeId),
        });

    const useCreateStore = () =>
        useMutation({
            mutationFn: async (dto: CreateStoreDto) => {
                await fakeDelay(150);
                const newStore: Store = {
                    id: crypto.randomUUID(),
                    ...dto,
                };
                storesMemory = [newStore, ...storesMemory];
                return newStore;
            },
        });

    const useUpdateStore = (storeId: string) =>
        useMutation({
            mutationFn: async (dto: UpdateStoreDto) => {
                await fakeDelay(150);
                storesMemory = storesMemory.map((s) =>
                    s.id === storeId ? ({...s, ...dto} as Store) : s,
                );
                const updated = storesMemory.find((s) => s.id === storeId);
                if (!updated) throw new Error("Store not found");
                return updated;
            },
        });

    const useDeleteStore = (storeId: string) =>
        useMutation({
            mutationFn: async () => {
                await fakeDelay(150);
                storesMemory = storesMemory.filter((s) => s.id !== storeId);
                return;
            },
        });

    return {
        useGetStores,
        useGetStore,
        useCreateStore,
        useUpdateStore,
        useDeleteStore,
    };
};
