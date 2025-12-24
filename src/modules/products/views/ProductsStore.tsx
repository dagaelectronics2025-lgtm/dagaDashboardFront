import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {ModalCreateProduct} from "@/modules/products/components/modal/ModalCreateProduct.tsx";
import {useUtils} from "@/shared/hooks/useUtils";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/shared/components/pagination";
import {TableSearchProduct} from "@/modules/products/components/table/TableSearchProduct";
import {Checkbox} from "@/shared/components/checkbox";
import {useProductStoreController} from "@/modules/products/hooks/useProductStoreController";
import {CartBottomSheet} from "@/modules/products/components/cart/CartBottomSheet.tsx";

export const ProductsStore = () => {
    const {formatAmountFromCents} = useUtils();
    const {
        search,
        page,
        totalItems,
        totalPages,
        paginatedProducts,
        isInCart,
        handleToggleCart,
        setSearch,
        setPage,
        onPrevPage,
        onNextPage,
        onPageChange,
    } = useProductStoreController();

    return (
        <div className="h-full overflow-y-auto p-6 custom-scrollbar">
            <div className="space-y-6">
                <Card className="border-stone-200">
                    <CardHeader className="border-b border-stone-200 flex items-center justify-between gap-4">
                        <CardTitle className="text-lg font-semibold text-stone-900">Productos</CardTitle>
                        <div className="flex items-center gap-3">
                            <TableSearchProduct value={search} onChange={(value) => {
                                setPage(1);
                                setSearch(value);
                            }}/>
                            <CardAction>
                                <ModalCreateProduct/>
                            </CardAction>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-stone-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        CODE
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        NOMBRE
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
                                        SELECCIONAR
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-stone-200">
                                {paginatedProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-stone-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                                            {product.code}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 max-w-xs truncate">
                                            {product.name}
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
                                            <Checkbox
                                                checked={isInCart(product.id)}
                                                onCheckedChange={(checked) =>
                                                    handleToggleCart(product.id, Boolean(checked))
                                                }
                                                aria-label={`Seleccionar producto ${product.name}`}
                                            />
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

            </div>
            <CartBottomSheet/>
        </div>)
}