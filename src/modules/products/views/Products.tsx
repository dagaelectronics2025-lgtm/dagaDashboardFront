import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {authorsData} from "@/shared/lib/data.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/components/avatar.tsx";
import {cn} from "@/shared/lib/utils.ts";
import {Badge} from "@/shared/components/badge.tsx";
import {TableActionsProduct} from "@/modules/products/components/table/TableActionsProduct.tsx";
import {ModalCreateProduct} from "@/modules/products/components/modal/ModalCreateProduct.tsx";

export const Products = () => {
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
                                        USUARIOS
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        TIPO DE USUARIO
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                        ESTADO
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
                                {authorsData.map((author) => (
                                    <tr key={author.id} className="hover:bg-stone-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={author.avatar} alt={author.name}/>
                                                    <AvatarFallback>
                                                        {author.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4">
                                                    <div
                                                        className="text-sm font-normal text-stone-900">{author.name}</div>
                                                    <div className="text-sm text-stone-500">{author.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-stone-900">{author.role}</div>
                                            <div className="text-sm text-stone-500">{author.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge
                                                variant={author.status === 'online' ? 'default' : 'secondary'}
                                                className={cn(
                                                    author.status === 'online'
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                                        : 'bg-stone-100 text-stone-800 hover:bg-stone-100'
                                                )}
                                            >
                                                {author.status === 'online' ? 'Online' : 'Offline'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            Próximamente
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-normal">
                                            <TableActionsProduct/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>)
}