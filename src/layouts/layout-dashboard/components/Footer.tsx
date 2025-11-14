import {Heart} from "lucide-react";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 mt-8 border-t border-stone-200">
            <div className="px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                    <div className="text-center lg:text-left">
                        <div className="text-sm text-stone-600">
                            © {currentYear}, creado con {" "}
                            <Heart className="w-3 h-3 inline-block text-red-500 fill-current"/>{" "}
                            por{" "}
                            <span
                                className="font-semibold text-stone-900 hover:text-stone-700 transition-colors"
                            >
                                Wolf Code's
                            </span>{" "}
                            para una mejor web.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}