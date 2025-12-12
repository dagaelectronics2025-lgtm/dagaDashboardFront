import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/products/data/schemas.ts";
import {useState} from "react";
import {toast} from "sonner";
import type {Product} from "@/modules/products/data/types.ts";
import {useProductsApi} from "@/modules/products/hooks/useProductsApi.ts";

export const useProductController = () => {

    const {useCreateProduct, useUpdateProduct, useGetProducts, useDeleteProduct} = useProductsApi()

    // DATA
    const {data: products, refetch: refetchProducts} = useGetProducts()

    // STATES
    const [showDialogCreate, setShowDialogCreate] = useState(false)
    const [showDialogEdit, setShowDialogEdit] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    // ACTIONS
    const {mutate: create} = useCreateProduct()
    const {mutate: update} = useUpdateProduct(selectedProduct?.id || "")
    const {mutateAsync: deleteProduct} = useDeleteProduct(selectedProduct?.id || "")


    // FORMS
    const formCreate = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            priceAlt: 0,
            stock: 0,
        }
    })

    const formEdit = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: selectedProduct?.name || "",
            description: selectedProduct?.description || "",
            price: selectedProduct?.price || 0,
            priceAlt: selectedProduct?.priceAlt || 0,
            stock: selectedProduct?.stock || 0,
        }
    })

    // METHODS
    const onCreate = (values: z.infer<typeof createSchema>) => {
        create(
            values, {
                onSuccess: async (values) => {
                    console.log("PRODUCT CREATED >> ", values)
                    toast.success("Producto creado exitosamente", {className: "success"})
                    await refetchProducts().then(() => setShowDialogCreate(false))
                    formCreate.reset()
                }
            }
        )
    }

    const onUpdate = (values: z.infer<typeof createSchema>) => {
        update(
            values, {
                onSuccess: async (values) => {
                    console.log("PRODUCT UPDATED >> ", values)
                    toast.success("Producto actualizado exitosamente", {className: "success"})
                    await refetchProducts().then(() => setShowDialogEdit(false))
                    formEdit.reset()
                }
            }
        )
    }

    const onDelete = async () => {
        await deleteProduct(undefined, {
            onSuccess: async (data) => {
                console.log("PRODUCT DELETED >> ", selectedProduct?.id || "")
                console.log("PRODUCT DELETED DATA >> ", data)
                toast.success("Producto eliminado exitosamente", {className: "success"})
                await refetchProducts()
            }
        })
    }

    return {
        // DATA
        products,
        showDialogCreate,
        showDialogEdit,
        selectedProduct,
        formCreate,
        formEdit,
        // METHODS
        onCreate,
        onUpdate,
        onDelete,
        setShowDialogCreate,
        setShowDialogEdit,
        setSelectedProduct

    }
}