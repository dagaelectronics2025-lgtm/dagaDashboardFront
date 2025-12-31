import type {User} from "@/modules/users/data/types.ts";
import {ModalEditUser} from "@/modules/users/components/modal/ModalEditUser.tsx";
import {usePermissions} from "@/shared/hooks/usePermissions/hook.ts";
import {Button} from "@/shared/components/button";
import {Trash2} from "lucide-react";

interface TableActionsUserProps {
    user: User
    onDelete: (user: User) => void | Promise<void>
}

export const TableActionsUser = ({user, onDelete}: TableActionsUserProps) => {

    const {can} = usePermissions()

    return (
        <div className="flex justify-center gap-2">
            {can("users:update") && <ModalEditUser user={user}/>}
            {can("users:delete") && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => void onDelete(user)}
                    className="text-red-600 hover:text-red-700"
                    aria-label={`Eliminar usuario ${user.name}`}
                >
                    <Trash2 className="h-5 w-5"/>
                </Button>
            )}
        </div>

    )
}