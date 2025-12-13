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
import {useProductController} from "@/modules/products/hooks/useProductController.tsx";
import type {Product} from "@/modules/products/data/types.ts";
import {PencilIcon} from "lucide-react";
import {useUtils} from "@/shared/hooks/useUtils";

interface ModalEditProductProps {
    product: Product
}

export const ModalEditProduct = ({product}: ModalEditProductProps) => {

    const {formEdit, showDialogEdit, setShowDialogEdit, setSelectedProduct, onUpdate} = useProductController()
    const {formatAmountFromCents, parseAmountToCents} = useUtils()

    const setFormValues = (product: Product) => {
        formEdit.setValue("name", product.name)
        formEdit.setValue("description", product.description)
        formEdit.setValue("category", product.category)
        formEdit.setValue("price", product.price)
        formEdit.setValue("priceAlt", product.priceAlt)
        formEdit.setValue("stock", product.stock)
        formEdit.setValue("code", product.code)
    }

    const onOpenChange = (open: boolean) => {
        setShowDialogEdit(open)
        if (open) {
            setSelectedProduct(product)
            setFormValues(product)
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
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogDescription>
                    Edición de productos para la plataforma.
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
                                control={formEdit.control}
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
                                control={formEdit.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Categoría</FormLabel>
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
                                control={formEdit.control}
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
                                control={formEdit.control}
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
                                control={formEdit.control}
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
                        <div className="grid gap-3">
                            <FormField
                                control={formEdit.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Código del Producto</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="1234ABCD"
                                                {...field}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-100 cursor-not-allowed"
                                                readOnly
                                                disabled
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
                        <Button variant="outline" type="submit">Editar Producto</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>)
}
