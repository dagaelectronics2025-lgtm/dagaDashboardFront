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
import type {Product} from "@/modules/products/data/types.ts";
import {useUtils} from "@/shared/hooks/useUtils";
import type {UseFormReturn} from "react-hook-form";
import type {z} from "zod";
import type {createSchema} from "@/modules/products/data/schemas.ts";

interface ModalEditProductProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: Product | null
    formEdit: UseFormReturn<z.infer<typeof createSchema>>
    onUpdate: (values: z.infer<typeof createSchema>) => void
}

export const ModalEditProduct = ({open, onOpenChange, product, formEdit, onUpdate}: ModalEditProductProps) => {

    const {formatAmountFromCents, parseAmountToCents} = useUtils()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Editar Producto</DialogTitle>
                    <DialogDescription>
                        Edición de productos para la plataforma.
                    </DialogDescription>
                </DialogHeader>

                {!product ? (
                    <div className="text-sm text-stone-600">Seleccione un producto para editar.</div>
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
                                                    <Input placeholder="Categoría" {...field}
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
                                <Button variant="outline" type="submit">Editar Producto</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}
