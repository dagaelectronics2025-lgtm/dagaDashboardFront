import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {TableActionsStore} from "@/modules/stores/components/table/TableActionsStore.tsx";
import {ModalCreateStore} from "@/modules/stores/components/modal/ModalCreateStore.tsx";
import {useStoreController} from "@/modules/stores/hooks/useStoreController.tsx";

export const Stores = () => {
    const {stores} = useStoreController();

    return (
        <div className="h-full overflow-y-auto p-6 custom-scrollbar">
            <div className="space-y-6">
                {/* Authors Table */}
                <Card className="border-stone-200">
                    <CardHeader className="border-b border-stone-200">
                        <CardTitle className="text-lg font-semibold text-stone-900">Tabla de Tiendas</CardTitle>
                        <CardAction>
                            <ModalCreateStore/>
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
                                        DIRECCIÓN
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        TELÉFONO
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        UBICACIÓN
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        ACCIONES
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-stone-200">
                                {stores?.map((store) => (
                                    <tr key={store.id} className="hover:bg-stone-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                                            {store.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 max-w-xs truncate">
                                            {store.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            {store.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            {store.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-normal">
                                            <TableActionsStore store={store}/>
                                        </td>
                                    </tr>
                                ))}
                                {(!stores || stores.length === 0) && (
                                    <tr>
                                        <td
                                            className="px-6 py-4 text-center text-sm text-stone-500"
                                            colSpan={5}
                                        >
                                            No hay tiendas registradas.
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