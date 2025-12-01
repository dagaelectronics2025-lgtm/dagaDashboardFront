import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/modules/users/data/schemas.ts";
import {useUsersApi} from "@/modules/users/hooks/useUsersApi.ts";
import {EUserRoles, type User} from "@/modules/users/data/types.ts";
import {toast} from "sonner";
import {useState} from "react";

export const useUserController = () => {

    const {useCreateUser, useGetUsers, useDeleteUser} = useUsersApi()

    const {data: users, refetch: refetchUsers} = useGetUsers()
    const {mutate: create} = useCreateUser()

    // STATES
    const [showDialogCreate, setShowDialogCreate] = useState(false)
    const [showDialogEdit, setShowDialogEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    // ACTIONS
    const {mutateAsync: deleteUser} = useDeleteUser(selectedUser?.id || "")

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
        // METHODS
        onCreate,
        onDelete,
        setShowDialogCreate,
        setShowDialogEdit,
        setSelectedUser

    }
}