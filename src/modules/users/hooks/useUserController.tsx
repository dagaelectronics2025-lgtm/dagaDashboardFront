import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/users/data/schemas.ts";
import {useUsersApi} from "@/modules/users/hooks/useUsersApi.ts";
import {EUserRoles, type User} from "@/modules/users/data/types.ts";
import {toast} from "sonner";
import {useState} from "react";

export const useUserController = () => {

    const {useCreateUser, useUpdateUser, useGetUsers, useDeleteUser} = useUsersApi()

    // DATA
    const {data: users, refetch: refetchUsers} = useGetUsers()

    // STATES
    const [showDialogCreate, setShowDialogCreate] = useState(false)
    const [showDialogEdit, setShowDialogEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    // ACTIONS
    const {mutate: create} = useCreateUser()
    const {mutate: update} = useUpdateUser(selectedUser?.id || "")
    const {mutateAsync: deleteUser} = useDeleteUser(selectedUser?.id || "")


    // FORMS
    const formCreate = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            role: EUserRoles.SELLER
        }
    })

    const formEdit = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: selectedUser?.name || "",
            email: selectedUser?.email || "",
            password: "",
            confirmPassword: "",
            username: selectedUser?.username || "",
            role: selectedUser?.role || EUserRoles.SELLER
        }
    })

    // METHODS
    const onCreate = (values: z.infer<typeof createSchema>) => {
        const {confirmPassword, ...restValues} = values
        create(
            restValues, {
                onSuccess: async (values) => {
                    console.log("USER CREATED >> ", values)
                    toast.success("Usuario creado exitosamente", {className: "success"})
                    await refetchUsers().then(() => setShowDialogCreate(false))
                    formCreate.reset()
                }
            }
        )
    }

    const onUpdate = (values: z.infer<typeof createSchema>) => {
        const {confirmPassword, ...restValues} = values
        update(
            restValues, {
                onSuccess: async (values) => {
                    console.log("USER UPDATED >> ", values)
                    toast.success("Usuario actualizado exitosamente", {className: "success"})
                    await refetchUsers().then(() => setShowDialogEdit(false))
                    formEdit.reset()
                }
            }
        )
    }

    const onDelete = async () => {
        await deleteUser(undefined, {
            onSuccess: async (data) => {
                console.log("USER DELETED >> ", selectedUser?.id || "")
                console.log("USER DELETED DATA >> ", data)
                toast.success("Usuario eliminado exitosamente", {className: "success"})
                await refetchUsers()
            }
        })
    }

    return {
        // DATA
        users,
        showDialogCreate,
        showDialogEdit,
        selectedUser,
        formCreate,
        formEdit,
        // METHODS
        onCreate,
        onUpdate,
        onDelete,
        setShowDialogCreate,
        setShowDialogEdit,
        setSelectedUser

    }
}