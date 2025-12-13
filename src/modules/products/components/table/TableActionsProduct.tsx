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
import {ModalEditProduct} from "@/modules/products/components/modal/ModalEditProduct.tsx";
import type {Product} from "@/modules/products/data/types.ts";

interface TableActionsProductProps {
    product: Product
}

export const TableActionsProduct = ({product}: TableActionsProductProps) => {
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
                        <ModalEditProduct product={product}/>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => console.log("ELIMINAR", product.id)}
                >
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}