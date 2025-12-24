import {useCallback, useMemo} from "react";
import {useCartStore} from "@/modules/products/stores/cartStroe";
import type {ProductCart} from "@/modules/products/data/types";

export function useCartController() {
    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const clearCart = useCartStore((state) => state.clearCart);
    const updateQuantityStore = useCartStore((state) => state.updateQuantity);
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const getSubtotalPrice = useCartStore((state) => state.getSubtotalPrice);
    const getSubtotalPriceAlt = useCartStore((state) => state.getSubtotalPriceAlt);

    const handleUpdateQuantity = useCallback(
        (id: string, quantity: number) => {
            if (Number.isNaN(quantity)) return;
            updateQuantityStore(id, quantity);
        },
        [updateQuantityStore],
    );

    const totalItems = useMemo(() => getTotalItems(), [items, getTotalItems]);
    const subtotalPrice = useMemo(() => getSubtotalPrice(), [items, getSubtotalPrice]);
    const subtotalPriceAlt = useMemo(() => getSubtotalPriceAlt(), [items, getSubtotalPriceAlt]);

    const addToCart = useCallback(
        (item: Omit<ProductCart, "quantity">, quantity = 1) => {
            addItem(item, quantity);
        },
        [addItem],
    );

    const removeFromCart = useCallback(
        (id: string) => {
            removeItem(id);
        },
        [removeItem],
    );

    const clear = useCallback(() => {
        clearCart();
    }, [clearCart]);

    return {
        items,
        totalItems,
        subtotalPrice,
        subtotalPriceAlt,
        addToCart,
        removeFromCart,
        clear,
        updateQuantity: handleUpdateQuantity,
    };
}

