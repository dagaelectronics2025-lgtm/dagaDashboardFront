import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/stores/data/schemas.ts";
import {toast} from "sonner";
import type {Store} from "@/modules/stores/data/types.ts";
import {useState} from "react";
import {useStoresApi} from "@/modules/stores/hooks/useStoresApi.ts";

export const useStoreController = () => {

    const {useCreateStore, useUpdateStore, useGetStores, useDeleteStore} = useStoresApi()

    // DATA
    const {data: stores, refetch: refetchStores} = useGetStores()

    // STATES
    const [showDialogCreate, setShowDialogCreate] = useState(false)
    const [showDialogEdit, setShowDialogEdit] = useState(false)
    const [selectedStore, setSelectedStore] = useState<Store | null>(null)

    // ACTIONS
    const {mutate: create} = useCreateStore()
    const {mutate: update} = useUpdateStore(selectedStore?.id || "")
    const {mutateAsync: deleteStore} = useDeleteStore(selectedStore?.id || "")


    // FORMS
    const formCreate = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
            location: ''
        }
    })

    const formEdit = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
            location: ''
        }
    })

    const setFormValuesForEdit = (store: Store) => {
        formEdit.setValue("name", store.name)
        formEdit.setValue("phone", store.phone)
        formEdit.setValue("address", store.address)
        formEdit.setValue("location", store.location)
    }

    const openEditStore = (store: Store) => {
        setSelectedStore(store)
        setFormValuesForEdit(store)
        setShowDialogEdit(true)
    }

    // METHODS
    const onCreate = (values: z.infer<typeof createSchema>) => {
        create(
            values, {
                onSuccess: async (values) => {
                    console.log("STORE CREATED >> ", values)
                    toast.success("Tienda creado exitosamente", {className: "success"})
                    await refetchStores().then(() => setShowDialogCreate(false))
                    formCreate.reset()
                }
            }
        )
    }

    const onUpdate = (values: z.infer<typeof createSchema>) => {
        update(
            values, {
                onSuccess: async (values) => {
                    console.log("STORE UPDATED >> ", values)
                    toast.success("Tienda actualizado exitosamente", {className: "success"})
                    await refetchStores().then(() => setShowDialogEdit(false))
                    formEdit.reset()
                }
            }
        )
    }

    const onDelete = async () => {
        await deleteStore(undefined, {
            onSuccess: async (data) => {
                console.log("STORE DELETED >> ", selectedStore?.id || "")
                console.log("STORE DELETED DATA >> ", data)
                toast.success("Tienda eliminada exitosamente", {className: "success"})
                await refetchStores()
            }
        })
    }

    const deleteStoreById = async (store: Store) => {
        const ok = window.confirm(`¿Eliminar la tienda "${store.name}"?`)
        if (!ok) return

        setSelectedStore(store)
        await deleteStore(undefined, {
            onSuccess: async () => {
                toast.success("Tienda eliminada exitosamente", {className: "success"})
                await refetchStores()
            }
        })
    }

    return {
        // DATA
        stores,
        showDialogCreate,
        showDialogEdit,
        selectedStore,
        formCreate,
        formEdit,
        // METHODS
        onCreate,
        onUpdate,
        onDelete,
        openEditStore,
        deleteStoreById,
        setShowDialogCreate,
        setShowDialogEdit,
        setSelectedStore

    }
}