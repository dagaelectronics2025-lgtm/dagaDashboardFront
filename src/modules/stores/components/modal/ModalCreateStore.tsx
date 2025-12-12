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
import {useStoreController} from "@/modules/stores/hooks/useStoreController.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/form.tsx";
import {Textarea} from "@/shared/components/textarea.tsx";

export const ModalCreateStore = () => {

    const {formCreate, onCreate} = useStoreController()

    return (<Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Crear Tienda</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>Crear Tienda</DialogTitle>
                <DialogDescription>
                    Creación de tiendas de la empresa.
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
                                        <FormLabel>Nombre de la tienda</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tienda 1" {...field}
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
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>TELÉFONO</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+584141234567" {...field}
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
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>DIRECCIÓN</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Direccion completa de la tienda" {...field}
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
                                name="location"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>UBICACIÓN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Url de Google Maps" {...field}
                                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="default">Cancelar</Button>
                        </DialogClose>
                        <Button variant="outline" type="submit">Crear Tienda</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>)
}