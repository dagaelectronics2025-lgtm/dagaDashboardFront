import {type QueryOptions, useApi} from "@/shared/hooks/useApi";
import type {CreateProductDto, Product, UpdateProductDto} from "@/modules/products/data/types.ts";

export const useProductsApi = () => {
    const {useGet, usePost, usePut, useDelete} = useApi()

    const useGetProducts = (options?: QueryOptions) =>
        useGet<Product[]>('/products', options)

    const useGetProduct = (productId: string, options?: QueryOptions) =>
        useGet<Product>(`/products/${productId}`, options)

    const useCreateProduct = () =>
        usePost<Product, CreateProductDto>('/products')

    const useUpdateProduct = (productId: string) =>
        usePut<Product, UpdateProductDto>(`/products/${productId}`)

    const useDeleteProduct = (productId: string) =>
        useDelete<void>(`/products/${productId}`)

    return {
        useGetProducts,
        useGetProduct,
        useCreateProduct,
        useUpdateProduct,
        useDeleteProduct,
    }
}