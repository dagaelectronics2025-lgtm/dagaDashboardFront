import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/shared/components/dialog.tsx";
import {Button} from "@/shared/components/button.tsx";
import {Input} from "@/shared/components/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/form.tsx";
import {Textarea} from "@/shared/components/textarea.tsx";
import type {Store} from "@/modules/stores/data/types.ts";
import type {UseFormReturn} from "react-hook-form";
import type {z} from "zod";
import type {createSchema} from "@/modules/stores/data/schemas.ts";

interface ModalEditStoreProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    store: Store | null
    formEdit: UseFormReturn<z.infer<typeof createSchema>>
    onUpdate: (values: z.infer<typeof createSchema>) => void
}

export const ModalEditStore = ({open, onOpenChange, store, formEdit, onUpdate}: ModalEditStoreProps) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Editar Tienda</DialogTitle>
                    <DialogDescription>
                        Edición de tiendas de la empresa.
                    </DialogDescription>
                </DialogHeader>

                {!store ? (
                    <div className="text-sm text-stone-600">Seleccione una tienda para editar.</div>
                ) : (
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
                                                    <Textarea placeholder="Dirección completa de la tienda" {...field}
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
                                    <Button
                                        variant="default"
                                        onClick={() => {
                                            formEdit.reset()
                                            onOpenChange(false)
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button variant="outline" type="submit">Editar Tienda</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}
