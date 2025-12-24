import type {Order} from "@/modules/orders/data/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {useState} from "react";
import {ModalInfoOrder} from "@/modules/orders/components/modal/ModalInfoOrder.tsx";

interface CardOrderInfoProps {
    order: Order;
}

export const CardOrderInfo = ({order}: CardOrderInfoProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card
                className="border-stone-200 h-full flex flex-col cursor-pointer transition hover:shadow-md"
                onClick={() => setOpen(true)}
            >
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-stone-900 flex items-center justify-between">
                        <span>{order.code}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                    <div className="space-y-1 text-sm">
                        <div>
                            <span className="font-medium text-stone-700">Cliente: </span>
                            <span className="text-stone-600">{order.customer}</span>
                        </div>
                        <div>
                            <span className="font-medium text-stone-700">Vendedor: </span>
                            <span className="text-stone-600">{order.seller}</span>
                        </div>
                        <div>
                            <span className="font-medium text-stone-700">Total: </span>
                            <span className="text-stone-900 font-semibold">
                                {order.total.toFixed(2)}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-stone-700">Estado: </span>
                            <span className="text-stone-600">{order.status}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ModalInfoOrder order={order} open={open} onOpenChange={setOpen}/>
        </>
    );
};
