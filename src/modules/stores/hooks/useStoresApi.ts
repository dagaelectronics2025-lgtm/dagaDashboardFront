import {type QueryOptions, useApi} from "@/shared/hooks/useApi";
import type {CreateStoreDto, Store, UpdateStoreDto} from "@/modules/stores/data/types.ts";

export const useStoresApi = () => {
    const {useGet, usePost, usePut, useDelete} = useApi()

    const useGetStores = (options?: QueryOptions) =>
        useGet<Store[]>('/stores', options)

    const useGetStore = (storeId: string, options?: QueryOptions) =>
        useGet<Store>(`/stores/${storeId}`, options)

    const useCreateStore = () =>
        usePost<Store, CreateStoreDto>('/stores')

    const useUpdateStore = (storeId: string) =>
        usePut<Store, UpdateStoreDto>(`/stores/${storeId}`)

    const useDeleteStore = (storeId: string) =>
        useDelete<void>(`/stores/${storeId}`)

    return {
        useGetStores,
        useGetStore,
        useCreateStore,
        useUpdateStore,
        useDeleteStore,
    }
}