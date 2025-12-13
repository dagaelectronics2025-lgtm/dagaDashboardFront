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
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/form.tsx";
import {Textarea} from "@/shared/components/textarea.tsx";
import {useStoreController} from "@/modules/stores/hooks/useStoreController.tsx";
import type {Store} from "@/modules/stores/data/types.ts";
import {PencilIcon} from "lucide-react";

interface ModalEditStoreProps {
    store: Store
}

export const ModalEditStore = ({store}: ModalEditStoreProps) => {

    const {formEdit, showDialogEdit, setShowDialogEdit, setSelectedStore, onUpdate} = useStoreController()

    const setFormValues = (store: Store) => {
        formEdit.setValue("name", store.name)
        formEdit.setValue("phone", store.phone)
        formEdit.setValue("address", store.address)
        formEdit.setValue("location", store.location)
    }

    const onOpenChange = (open: boolean) => {
        setShowDialogEdit(open)
        if (open) {
            setSelectedStore(store)
            setFormValues(store)
        }
    }

    return (<Dialog open={showDialogEdit} onOpenChange={onOpenChange}>
        <DialogTrigger>
            <Button variant="ghost" size="icon">
                <PencilIcon className="h-5 w-5"/>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>Editar Tienda</DialogTitle>
                <DialogDescription>
                    Edición de tiendas de la empresa.
                </DialogDescription>
            </DialogHeader>
            <Form {...formEdit}>
                <form onSubmit={formEdit.handleSubmit(onUpdate)}>
                    <div className="grid gap-4 mb-4">
                        <div className="grid gap-3">
                            <FormField
                                control={formEdit.control}
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
                                control={formEdit.control}
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
                                control={formEdit.control}
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
                                control={formEdit.control}
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
                            <Button variant="default" onClick={() => formEdit.reset()}>Cancelar</Button>
                        </DialogClose>
                        <Button variant="outline" type="submit">Editar Tienda</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>)
}

