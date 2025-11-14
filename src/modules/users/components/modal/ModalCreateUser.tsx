import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/components/dialog.tsx";
import {Button} from "@/shared/components/button.tsx";
import {Label} from "@/shared/components/label.tsx";
import {Input} from "@/shared/components/input.tsx";

export const ModalCreateUser = () => {
    return (<Dialog>
        <form>
            <DialogTrigger asChild>
                <Button variant="outline">Crear Usuario</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Crear Usuario</DialogTitle>
                    <DialogDescription>
                        Creación de usuarios para el uso de la plataforma.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Name</Label>
                        <Input id="name-1" name="name" defaultValue="Pedro Duarte"/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Username</Label>
                        <Input id="username-1" name="username" defaultValue="@peduarte"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="default">Cancelar</Button>
                    </DialogClose>
                    <Button variant="outline" type="submit">Crear Usuario</Button>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>)
}