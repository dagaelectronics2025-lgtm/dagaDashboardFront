import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {TableActionsProduct} from "@/modules/products/components/table/TableActionsProduct.tsx";
import {ModalCreateProduct} from "@/modules/products/components/modal/ModalCreateProduct.tsx";
import {useProductController} from "@/modules/products/hooks/useProductController.tsx";
import {useUtils} from "@/shared/hooks/useUtils";

export const Products = () => {
    const {products} = useProductController();
    const {formatAmountFromCents} = useUtils();

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
                                {products?.map((product) => (
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
                                            <TableActionsProduct product={product}/>
                                        </td>
                                    </tr>
                                ))}
                                {(!products || products.length === 0) && (
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
                    </CardContent>
                </Card>

            </div>
        </div>)
}