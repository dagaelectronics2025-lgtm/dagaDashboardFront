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

export const TableActionsProduct = () => {
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
                <DropdownMenuItem
                    onClick={() => console.log("EDITAR")}
                >
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => console.log("ELIMINAR")}
                >
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}