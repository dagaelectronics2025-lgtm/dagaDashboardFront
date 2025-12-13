import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/dropdown-menu.tsx";
import {Button} from "@/shared/components/button.tsx";
import {EllipsisVertical} from "lucide-react";
import {ModalEditStore} from "@/modules/stores/components/modal/ModalEditStore.tsx";
import type {Store} from "@/modules/stores/data/types.ts";

interface TableActionsStoreProps {
    store: Store
}

export const TableActionsStore = ({store}: TableActionsStoreProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EllipsisVertical/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-56">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator className=""/>
                <DropdownMenuItem asChild>
                    <div className="w-full cursor-pointer">
                        <ModalEditStore store={store}/>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => console.log("ELIMINAR", store.id)}
                >
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}