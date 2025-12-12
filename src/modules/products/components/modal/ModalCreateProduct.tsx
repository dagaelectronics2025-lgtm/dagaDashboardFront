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
import {useProductController} from "@/modules/products/hooks/useProductController.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/form.tsx";
import {Textarea} from "@/shared/components/textarea.tsx";
import {useUtils} from "@/shared/hooks/useUtils";

export const ModalCreateProduct = () => {

    const {formCreate, onCreate} = useProductController()
    const {formatAmountFromCents, parseAmountToCents} = useUtils()

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
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Producto</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Producto1" {...field}
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
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Descripción del producto" {...field}
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
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Precio</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="200.00"
                                                value={formatAmountFromCents(field.value)}
                                                onChange={(e) => {
                                                    const cents = parseAmountToCents(e.target.value)
                                                    field.onChange(cents)
                                                }}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                inputMode="decimal"
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
                                name="priceAlt"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Precio al Mayor</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="150.00"
                                                value={formatAmountFromCents(field.value)}
                                                onChange={(e) => {
                                                    const cents = parseAmountToCents(e.target.value)
                                                    field.onChange(cents)
                                                }}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                inputMode="decimal"
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
                                name="stock"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="10" {...field}
                                                   type="number"
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
                        <Button variant="outline" type="submit">Crear Producto</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>)
}