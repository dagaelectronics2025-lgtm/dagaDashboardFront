import {useMutation, useQuery} from "@tanstack/react-query";
import type {CreateOrderDto, Order, UpdateOrderDto} from "@/modules/orders/data/types.ts";
import {testOrders} from "@/modules/orders/data/data-test.ts";

// TODO: replace with real API client
const fakeDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let ordersMemory: Order[] = [...testOrders];

export const useOrdersApi = () => {
    const useGetOrders = () =>
        useQuery<Order[]>({
            queryKey: ["orders"],
            queryFn: async () => {
                await fakeDelay(200);
                return ordersMemory;
            },
        });

    const useCreateOrder = () =>
        useMutation({
            mutationFn: async (dto: CreateOrderDto) => {
                await fakeDelay(200);
                const newOrder: Order = {
                    id: crypto.randomUUID(),
                    ...dto,
                };
                ordersMemory = [newOrder, ...ordersMemory];
                return newOrder;
            },
        });

    const useUpdateOrder = (id: string) =>
        useMutation({
            mutationFn: async (dto: UpdateOrderDto) => {
                await fakeDelay(200);
                ordersMemory = ordersMemory.map((order) =>
                    order.id === id ? {...order, ...dto} : order,
                );
                return ordersMemory.find((o) => o.id === id)!;
            },
        });

    const useDeleteOrder = (id: string) =>
        useMutation({
            mutationFn: async () => {
                await fakeDelay(200);
                ordersMemory = ordersMemory.filter((order) => order.id !== id);
                return {id};
            },
        });

    return {useGetOrders, useCreateOrder, useUpdateOrder, useDeleteOrder};
};
