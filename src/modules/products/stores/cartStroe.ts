import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import type {ProductCart} from "@/modules/products/data/types.ts";

export type CartState = {
    items: ProductCart[];
};

export type CartActions = {
    addItem: (item: Omit<ProductCart, "quantity">, quantity?: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
    getTotalItems: () => number;
    getSubtotalPrice: () => number;
    getSubtotalPriceAlt: () => number;
};

const initialState: CartState = {
    items: [],
};

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            ...initialState,
            addItem: (item, quantity = 1) => {
                const {items} = get();
                const existingIndex = items.findIndex((i) => i.id === item.id);

                if (existingIndex !== -1) {
                    const updated = [...items];
                    updated[existingIndex] = {
                        ...updated[existingIndex],
                        quantity: updated[existingIndex].quantity + quantity,
                    };
                    set({items: updated});
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                ...item,
                                quantity,
                            },
                        ],
                    });
                }
            },
            removeItem: (id: string) => {
                const {items} = get();
                set({items: items.filter((item) => item.id !== id)});
            },
            clearCart: () => {
                set(initialState);
                useCartStore.persist.clearStorage?.();
            },
            updateQuantity: (id: string, quantity: number) => {
                if (quantity <= 0) {
                    const {removeItem} = get();
                    removeItem(id);
                    return;
                }
                const {items} = get();
                set({
                    items: items.map((item) =>
                        item.id === id ? {...item, quantity} : item,
                    ),
                });
            },
            getTotalItems: () => {
                return get().items.reduce((acc, item) => acc + item.quantity, 0);
            },
            getSubtotalPrice: () => {
                return get().items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                );
            },
            getSubtotalPriceAlt: () => {
                return get().items.reduce(
                    (acc, item) => acc + item.priceAlt * item.quantity,
                    0,
                );
            },
        }),
        {
            name: "cart-storage",
        },
    ),
);
