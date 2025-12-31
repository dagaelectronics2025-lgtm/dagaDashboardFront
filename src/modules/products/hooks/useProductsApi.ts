import {useMutation, useQuery} from "@tanstack/react-query";
import type {CreateProductDto, Product, UpdateProductDto} from "@/modules/products/data/types.ts";
import {testProducts} from "@/modules/products/data/data-test.ts";

// Simula latencia de red
const fakeDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let productsMemory: Product[] = [...testProducts];

export const useProductsApi = () => {
    const useGetProducts = () =>
        useQuery<Product[]>({
            queryKey: ["products"],
            queryFn: async () => {
                await fakeDelay(150);
                return productsMemory;
            },
        });

    const useGetProduct = (productId: string) =>
        useQuery<Product>({
            queryKey: ["products", productId],
            queryFn: async () => {
                await fakeDelay(150);
                const product = productsMemory.find((p) => p.id === productId);
                if (!product) throw new Error("Product not found");
                return product;
            },
            enabled: Boolean(productId),
        });

    const useCreateProduct = () =>
        useMutation({
            mutationFn: async (dto: CreateProductDto) => {
                await fakeDelay(150);
                const newProduct: Product = {
                    id: crypto.randomUUID(),
                    category: "",
                    ...dto,
                };

                productsMemory = [newProduct, ...productsMemory];
                return newProduct;
            },
        });

    const useUpdateProduct = (productId: string) =>
        useMutation({
            mutationFn: async (dto: UpdateProductDto) => {
                await fakeDelay(150);
                productsMemory = productsMemory.map((p) =>
                    p.id === productId ? ({...p, ...dto} as Product) : p,
                );
                const updated = productsMemory.find((p) => p.id === productId);
                if (!updated) throw new Error("Product not found");
                return updated;
            },
        });

    const useDeleteProduct = (productId: string) =>
        useMutation({
            mutationFn: async () => {
                await fakeDelay(150);
                productsMemory = productsMemory.filter((p) => p.id !== productId);
                return;
            },
        });

    return {
        useGetProducts,
        useGetProduct,
        useCreateProduct,
        useUpdateProduct,
        useDeleteProduct,
    };
};
