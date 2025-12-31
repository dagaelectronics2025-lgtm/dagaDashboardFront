import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/components/avatar.tsx";
import {Badge} from "@/shared/components/badge.tsx";
import {TableActionsUser} from "@/modules/users/components/table/TableActionsUser.tsx";
import {ModalCreateUser} from "@/modules/users/components/modal/ModalCreateUser.tsx";
import {useUserController} from "@/modules/users/hooks/useUserController.tsx";
import type {User} from "@/modules/users/data/types.ts";
import {usePermissions} from "@/shared/hooks/usePermissions/hook.ts";

export const Users = () => {

    const {canManageUsers, can} = usePermissions()

    const {users, deleteUserById} = useUserController()

    return (
        <div className="h-full overflow-y-auto p-6 custom-scrollbar">
            <div className="space-y-6">
                {/* Authors Table */}
                <Card className="border-stone-200">
                    <CardHeader className="border-b border-stone-200">
                        <CardTitle className="text-lg font-semibold text-stone-900">Tabla de Usuarios</CardTitle>
                        <CardAction>
                            {
                                can('users:create') && <ModalCreateUser/>
                            }
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
                                    {canManageUsers() &&
                                        <th className="px-6 py-3 text-left text-xs font-normal text-stone-500 uppercase tracking-wider">
                                            ACCIONES
                                        </th>}
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-stone-200">
                                {users?.map((user) => (
                                    <tr key={user.id} className="hover:bg-stone-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={user.name} alt={user.name}/>
                                                    <AvatarFallback>
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4">
                                                    <div
                                                        className="text-sm font-normal text-stone-900">{user.name}</div>
                                                    <div className="text-sm text-stone-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-stone-900">{user.role}</div>
                                            {/*<div className="text-sm text-stone-500">{user.department}</div>*/}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge
                                                variant='secondary'
                                                className='bg-stone-100 text-stone-800 hover:bg-stone-100'

                                            >
                                                Offline
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            Próximamente
                                        </td>
                                        {canManageUsers() &&
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal">
                                                <TableActionsUser user={user as unknown as User}
                                                                  onDelete={deleteUserById}/>
                                            </td>}
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