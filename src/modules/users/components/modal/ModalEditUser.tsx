import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/components/dialog.tsx";
import {Button} from "@/shared/components/button.tsx";
import {Input} from "@/shared/components/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/components/select.tsx";
import {useUserController} from "@/modules/users/hooks/useUserController.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/form.tsx";
import {userRolesOptions} from "@/modules/users/data/utils.ts";
import {useEffect} from "react";
import type {User} from "@/modules/users/data/types.ts";
import {PencilIcon} from "lucide-react";

interface ModalEditUserProps {
    user: User
}

export const ModalEditUser = ({user}: ModalEditUserProps) => {

    const {formCreate, showDialogEdit, setShowDialogEdit, setSelectedUser, onCreate} = useUserController()

    useEffect(() => {
        if (user) {
            setSelectedUser(user)
        }
    }, [user]);

    return (<Dialog open={showDialogEdit} onOpenChange={setShowDialogEdit}>
        <DialogTrigger>
            <Button variant="ghost" size="icon">
                <PencilIcon className="h-5 w-5"/>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogDescription>
                    Edicion de usuarios para la plataforma.
                </DialogDescription>
            </DialogHeader>
            <Form {...formCreate}>
                <form onSubmit={formCreate.handleSubmit(onCreate)}>
                    <div className="grid gap-4 mb-4">
                        <div className="grid gap-3">
                            <FormField
                                control={formCreate.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jhon Doe" {...field}
                                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={formCreate.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="correo@electronico.com" {...field}
                                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={formCreate.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123456" {...field}
                                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={formCreate.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123456" {...field}
                                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={formCreate.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nombre de Usuario</FormLabel>
                                        <FormControl>
                                            <Input placeholder="DagaCaja" {...field}
                                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField control={formCreate.control} name="role" render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>Rol de Usuario</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}>
                                                <SelectTrigger
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                                    <SelectValue placeholder="Selecciona un rol"
                                                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                                                </SelectTrigger>
                                                <SelectContent
                                                    className="px-4 py-3 border bg-white border-gray-300 rounded-lg">
                                                    {userRolesOptions.map(option => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )
                            }/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="default" onClick={() => formCreate.reset()}>Cancelar</Button>
                        </DialogClose>
                        <Button variant="outline" type="submit">Crear Usuario</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>)
}