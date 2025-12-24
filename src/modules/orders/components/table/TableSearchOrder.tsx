import {Input} from "@/shared/components/input";
import {Search} from "lucide-react";
import {cn} from "@/shared/lib/utils";

interface TableSearchOrderProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function TableSearchOrder({
                                     value,
                                     onChange,
                                     placeholder = "Buscar orden, cliente o vendedor...",
                                     className,
                                 }: TableSearchOrderProps) {
    return (
        <div className={cn("relative w-full max-w-xs", className)}>
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
        <Search className="h-4 w-4"/>
      </span>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pl-9 pr-3 py-2 h-9 text-sm"
            />
        </div>
    );
}

