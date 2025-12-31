import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/dropdown-menu.tsx";
import {Button} from "@/shared/components/button.tsx";
import {EllipsisVertical, PencilIcon, Trash2} from "lucide-react";
import type {Store} from "@/modules/stores/data/types.ts";

interface TableActionsStoreProps {
    store: Store
    onEdit: (store: Store) => void
    onDelete: (store: Store) => void | Promise<void>
}

export const TableActionsStore = ({store, onEdit, onDelete}: TableActionsStoreProps) => {

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
                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault()
                    onEdit(store)
                }}>
                    <div className="flex items-center gap-2">
                        <PencilIcon className="h-4 w-4"/>
                        <span>Editar</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault()
                    void onDelete(store)
                }}>
                    <div className="flex items-center gap-2 text-red-600">
                        <Trash2 className="h-4 w-4"/>
                        <span>Eliminar</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}