import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {ModalCreateOrder} from "@/modules/orders/components/modal/ModalCreateOrder.tsx";
import {useOrderController} from "@/modules/orders/hooks/useOrderController.tsx";
import {CardOrderInfo} from "@/modules/orders/components/cards/CardOrderInfo.tsx";
import {TableSearchOrder} from "@/modules/orders/components/table/TableSearchOrder.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/components/pagination.tsx";

export const Orders = () => {
    const {
        paginatedOrders,
        page,
        totalPages,
        setPage,
        filteredOrders,
        search,
        setSearch,
    } = useOrderController();

    return (
        <div className="h-full overflow-y-auto p-6 custom-scrollbar">
            <div className="space-y-6">
                <Card className="border-stone-200">
                    <CardHeader
                        className="border-b border-stone-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="text-lg font-semibold text-stone-900">
                            Órdenes
                        </CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                            <TableSearchOrder
                                value={search}
                                onChange={(value) => {
                                    setSearch(value);
                                    setPage(1);
                                }}
                            />
                            <CardAction>
                                <ModalCreateOrder/>
                            </CardAction>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 space-y-4">
                        {filteredOrders.length === 0 && (
                            <div className="py-10 text-center text-sm text-stone-500">
                                No hay ordenes registradas.
                            </div>
                        )}

                        {filteredOrders.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {paginatedOrders.map((order) => (
                                        <CardOrderInfo key={order.id} order={order}/>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="pt-4">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (page > 1) setPage(page - 1);
                                                        }}
                                                    />
                                                </PaginationItem>

                                                {Array.from({length: totalPages}).map((_, index) => {
                                                    const pageNumber = index + 1;
                                                    return (
                                                        <PaginationItem key={pageNumber}>
                                                            <PaginationLink
                                                                href="#"
                                                                isActive={pageNumber === page}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setPage(pageNumber);
                                                                }}
                                                            >
                                                                {pageNumber}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    );
                                                })}

                                                <PaginationItem>
                                                    <PaginationNext
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (page < totalPages) setPage(page + 1);
                                                        }}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
