import {Trash2} from "lucide-react";
import {Button} from "@/shared/components/button";
import {Input} from "@/shared/components/input";
import {useCartController} from "@/modules/products/hooks/useCartController";
import {useUtils} from "@/shared/hooks/useUtils";

export function CartItemSheet() {
    const {items, updateQuantity, removeFromCart, subtotalPrice, subtotalPriceAlt} = useCartController();
    const {formatAmountFromCents} = useUtils();

    if (!items.length) {
        return (
            <div className="py-4 text-sm text-stone-500">
                No hay productos en el carrito.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 border rounded-md px-3 py-2 bg-stone-50"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-stone-500">
                                Precio: {formatAmountFromCents(item.price)}
                            </p>
                            <p className="text-xs text-stone-500">
                                Precio alt: {formatAmountFromCents(item.priceAlt)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                min={1}
                                className="w-20 h-8 text-sm"
                                value={item.quantity}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (!Number.isNaN(value)) {
                                        updateQuantity(item.id, value);
                                    }
                                }}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Eliminar del carrito"
                            >
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t pt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal (precio):</span>
                    <span className="font-medium">
            {formatAmountFromCents(subtotalPrice)}
          </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal (precio alt):</span>
                    <span className="font-medium">
            {formatAmountFromCents(subtotalPriceAlt)}
          </span>
                </div>
            </div>
        </div>
    );
}

