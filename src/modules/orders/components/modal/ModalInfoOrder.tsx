import type {Order} from "@/modules/orders/data/types.ts";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/shared/components/dialog.tsx";

interface ModalInfoOrderProps {
    order: Order;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ModalInfoOrder = ({order, open, onOpenChange}: ModalInfoOrderProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Información de la orden</DialogTitle>
                    <DialogDescription>
                        Detalle de la orden {order.code}
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="font-medium text-stone-700">Código:</span>
                        <span className="text-stone-900">{order.code}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-stone-700">Cliente:</span>
                        <span className="text-stone-900">{order.customer}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-stone-700">Vendedor:</span>
                        <span className="text-stone-900">{order.seller}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-stone-700">Total:</span>
                        <span className="text-stone-900 font-semibold">{order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-stone-700">Estado:</span>
                        <span className="text-stone-900">{order.status}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
