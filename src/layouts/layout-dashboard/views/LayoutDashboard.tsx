import {type ReactNode, useState} from "react";
import {Menu} from "lucide-react";
import {Button} from "@/shared/components/button.tsx";
import {Card} from "@/shared/components/card.tsx";
import {Footer} from "@/layouts/layout-dashboard/components/Footer.tsx";
import {Sidebar} from "@/layouts/layout-dashboard/components/Sidebar.tsx";

export const LayoutDashboard = ({children, title, description}: {
    children: ReactNode;
    title?: string;
    description?: string
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const [themeConfigOpen, setThemeConfigOpen] = useState(false);

    return (
        <div className="flex h-screen bg-stone-50 grain-texture">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-10
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
      `}>
                <Sidebar onClose={() => setSidebarOpen(false)}/>
            </div>

            <main className="flex-1 overflow-y-auto p-3 lg:p-6 relative z-10 flex flex-col">
                {/* Mobile header with burger menu */}
                <div className="lg:hidden mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                    >
                        <Menu className="h-6 w-6"/>
                    </Button>
                </div>

                <Card className="flex-1 border border-stone-200 bg-white relative z-20">
                    {title && (
                        <div className="pt-6 px-3 lg:px-6 pb-4">
                            <h1 className="text-xl font-semibold text-stone-900 mb-1">{title}</h1>
                            {description && (
                                <p className="text-sm text-stone-600">{description}</p>
                            )}
                            <div className="border-b border-stone-200 mt-4"></div>
                        </div>
                    )}
                    {children}
                </Card>
                <Footer/>
            </main>

            {/* Theme Configurator Modal - Outside sidebar for proper z-index */}
            {/*<ThemeConfigurator*/}
            {/*    isOpen={themeConfigOpen}*/}
            {/*    onClose={() => setThemeConfigOpen(false)}*/}
            {/*/>*/}
        </div>
    );
}