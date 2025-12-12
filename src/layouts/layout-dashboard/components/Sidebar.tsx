import {NavLink, useLocation} from "react-router-dom";
import {LayoutDashboard, LogOut, ShoppingBag, Store, User, X} from "lucide-react";
import {Button} from "@/shared/components/button.tsx";
import {cn} from "@/shared/lib/utils.ts";
import {Separator} from "@/shared/components/separator.tsx";
import {useAuthController} from "@/shared/hooks/auth/useAuthController.ts";

const navItems = [
    {
        title: "Inicio",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Usuarios",
        href: "/users",
        icon: User,
    },
    {
        title: "Tiendas",
        href: "/stores",
        icon: Store,
    },
    {
        title: "Productos",
        href: "/products",
        icon: ShoppingBag,
    },
    // {
    //     title: "Tables",
    //     href: "/tables",
    //     icon: Table,
    // },
    // {
    //     title: "Notifications",
    //     href: "/notifications",
    //     icon: Bell,
    // },
    // {
    //     title: "Subscriptions",
    //     href: "/subscriptions",
    //     icon: CreditCard,
    // },
    // {
    //     title: "Cerrar Sesion",
    //     href: "",
    //     icon: LogOut
    // }
    //

];

export const Sidebar = ({onClose}: { onClose?: () => void }) => {

    const location = useLocation();

    const {logOut} = useAuthController()

    return (
        <aside
            className="w-60 bg-white lg:bg-transparent flex flex-col relative z-10 h-full border-r border-stone-200 lg:border-0">
            {/* Brand Header */}
            <div className="p-6 pb-0 relative z-10 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-stone-900">
                    Daga Dashboard
                </h1>
                {/* Close button for mobile */}
                {onClose && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="lg:hidden p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                    >
                        <X className="h-5 w-5"/>
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 relative z-10">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                        <NavLink key={item.href} to={item.href}>
                            <div
                                className={cn(
                                    "flex items-center text-sm font-normal rounded-lg cursor-pointer",
                                    isActive
                                        ? "px-3 py-2 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border border-stone-900 text-stone-50 hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none duration-300 ease-in align-middle select-none font-sans text-center antialiased"
                                        : "px-3 py-2 text-stone-700 hover:bg-stone-100 transition-colors duration-200 border border-transparent"
                                )}
                            >
                                <Icon className="mr-3 w-4 h-4"/>
                                {item.title}
                            </div>
                        </NavLink>
                    );
                })}
            </nav>
            <Separator/>
            <Button
                variant="secondary"
                onClick={logOut}
            >
                <LogOut className="mr-3 w-4 h-4"/>
                Cerrar Sesion
            </Button>


        </aside>
    );
}