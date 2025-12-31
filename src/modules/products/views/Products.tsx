import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {TableActionsProduct} from "@/modules/products/components/table/TableActionsProduct.tsx";
import {ModalCreateProduct} from "@/modules/products/components/modal/ModalCreateProduct.tsx";
import {useProductController} from "@/modules/products/hooks/useProductController.tsx";
import {useUtils} from "@/shared/hooks/useUtils";
import {useMemo, useState} from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/shared/components/pagination";
import {ModalEditProduct} from "@/modules/products/components/modal/ModalEditProduct.tsx";

export const Products = () => {
    const {
        products,
        openEditProduct,
        deleteProductById,
        selectedProduct,
        showDialogEdit,
        setShowDialogEdit,
        formEdit,
        onUpdate
    } = useProductController();

    const {formatAmountFromCents} = useUtils();

    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const totalItems = products?.length ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paginatedProducts = useMemo(() => {
        if (!products) return [];
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return products.slice(start, end);
    }, [products, page, pageSize]);

    const onPrevPage = () => setPage((prev) => Math.max(1, prev - 1));
    const onNextPage = () => setPage((prev) => Math.min(totalPages, prev + 1));
    const onPageChange = (newPage: number) => setPage(newPage);

    return (
        <div className="h-full overflow-y-auto p-6 custom-scrollbar">
            <div className="space-y-6">
                {/* Authors Table */}
                <Card className="border-stone-200">
                    <CardHeader className="border-b border-stone-200">
                        <CardTitle className="text-lg font-semibold text-stone-900">Tabla de Productos</CardTitle>
                        <CardAction>
                            <ModalCreateProduct/>
                        </CardAction>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-stone-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        NOMBRE
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        DESCRIPCIÓN
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        CATEGORÍA
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        PRECIO DETAL
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        PRECIO MAYORISTA
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        STOCK
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        ACCIONES
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-stone-200">
                                {paginatedProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-stone-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 max-w-xs truncate">
                                            {product.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                                            {formatAmountFromCents(product.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                                            {formatAmountFromCents(product.priceAlt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-normal">
                                            <TableActionsProduct product={product} onEdit={openEditProduct}
                                                                 onDelete={deleteProductById}/>
                                        </td>
                                    </tr>
                                ))}
                                {totalItems === 0 && (
                                    <tr>
                                        <td
                                            className="px-6 py-4 text-center text-sm text-stone-500"
                                            colSpan={7}
                                        >
                                            No hay productos registrados.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination controls using shadcn components */}
                        {totalItems > 0 && (
                            <div
                                className="flex items-center justify-between px-6 py-4 border-t border-stone-200 text-sm text-stone-600">
                                <span>
                                    Página {page} de {totalPages}
                                </span>
                                <Pagination className="w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onPrevPage();
                                                }}
                                                aria-disabled={page === 1}
                                                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                            />
                                        </PaginationItem>
                                        {Array.from({length: totalPages}, (_, index) => {
                                            const pageNumber = index + 1;
                                            return (
                                                <PaginationItem key={pageNumber}>
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={pageNumber === page}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onPageChange(pageNumber);
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
                                                    onNextPage();
                                                }}
                                                aria-disabled={page === totalPages}
                                                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <ModalEditProduct
                    open={showDialogEdit}
                    onOpenChange={setShowDialogEdit}
                    product={selectedProduct}
                    formEdit={formEdit}
                    onUpdate={onUpdate}
                />

            </div>
        </div>)
}