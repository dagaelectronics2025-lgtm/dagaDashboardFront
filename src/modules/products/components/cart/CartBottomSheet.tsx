import {Button} from "@/shared/components/button";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/shared/components/sheet";
import {cn} from "@/shared/lib/utils";
import {CartItemSheet} from "@/modules/products/components/cart/CartItemSheet";
import {useCartController} from "@/modules/products/hooks/useCartController";

interface CartBottomTabProps {
    label?: string;
    title?: string;
    description?: string;
    className?: string;
}

export function CartBottomSheet({
                                    label = "Ver carrito",
                                    title = "Carrito de compra",
                                    description = "Aquí puedes ver un resumen de los productos seleccionados.",
                                    className,
                                }: CartBottomTabProps) {
    const {totalItems} = useCartController();

    const labelWithCount = totalItems > 0 ? `${label} (${totalItems})` : label;

    return (
        <div className={cn("fixed bottom-4 right-4 z-40", className)}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="default"
                        size="sm"
                        className="shadow-lg rounded-full px-4 py-2"
                    >
                        {labelWithCount}
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="max-w-full sm:max-w-md ml-auto mr-4 mb-4 rounded-t-2xl sm:rounded-2xl border shadow-lg bg-white"
                >
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 p-2 text-sm text-stone-700">
                        <CartItemSheet/>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}