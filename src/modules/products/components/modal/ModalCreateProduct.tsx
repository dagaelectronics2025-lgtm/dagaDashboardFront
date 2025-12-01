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
import {EProductRoles} from "@/modules/products/data/types.ts";
import {useProductController} from "@/modules/products/hooks/useProductController.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/form.tsx";

export const productRolesOptions = [
    {value: EProductRoles.ADMIN, label: 'Administrador'},
    {value: EProductRoles.MANAGER, label: 'Gerente'},
    {value: EProductRoles.CASHIER, label: 'Cajero'},
    {value: EProductRoles.SELLER, label: 'Vendedor'}
];

export const ModalCreateProduct = () => {

    const {formCreate, onCreate} = useProductController()

    return (<Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Crear Producto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>Crear Producto</DialogTitle>
                <DialogDescription>
                    Creación de productos para la plataforma.
                </DialogDescription>
            </DialogHeader>
            <Form {...formCreate}>
                <form onSubmit={formCreate.handleSubmit(onCreate)}>
                    <div className="grid gap-4 mb-4">
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
                                name="productname"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nombre de Producto</FormLabel>
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
                                        <FormLabel>Rol de Producto</FormLabel>
                                        <FormControl>
                                            <Select {...field}>
                                                <SelectTrigger
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                                    <SelectValue placeholder="Selecciona un rol"
                                                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                                                </SelectTrigger>
                                                <SelectContent
                                                    className="px-4 py-3 border bg-white border-gray-300 rounded-lg">
                                                    {productRolesOptions.map(option => (
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
                            <Button variant="default">Cancelar</Button>
                        </DialogClose>
                        <Button variant="outline" type="submit">Crear Producto</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>)
}