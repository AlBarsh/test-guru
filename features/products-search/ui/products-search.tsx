import { Search } from "lucide-react";
import { cn } from "shared/lib/utils";

interface ProductsSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ProductsSearch({
  value,
  onChange,
  className,
}: ProductsSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-icon" />
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "flex h-12 rounded-lg w-full bg-gray-bg px-5 py-3 pl-12 text-body-1",
          "file:bg-transparent file:text-body-1 file:font-medium",
          "placeholder:text-gray-icon",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  );
}
