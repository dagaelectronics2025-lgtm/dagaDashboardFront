import type {User} from "@/modules/users/data/types.ts";
import {ModalEditUser} from "@/modules/users/components/modal/ModalEditUser.tsx";
import {usePermissions} from "@/shared/hooks/usePermissions/hook.ts";

interface TableActionsUserProps {
    user: User
}

export const TableActionsUser = ({user}: TableActionsUserProps) => {

    const {can} = usePermissions()

    return (
        <div className="flex justify-center gap-2">
            {can("users:update") && <ModalEditUser user={user}/>}
        </div>

    )
}