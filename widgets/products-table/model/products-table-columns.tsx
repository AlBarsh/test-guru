import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "entities/product";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Button } from "shared/ui/components/button";
import { Checkbox } from "shared/ui/components/checkbox";
import { cn } from "shared/lib/utils";

interface GetColumnsParams {
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  onSort: (column: string) => void;
  onRowSelect?: (productId: number, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
}

export function getProductsTableColumns({
  sortBy,
  sortOrder,
  onSort,
  onRowSelect,
  onSelectAll,
}: GetColumnsParams): ColumnDef<Product>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          variant="filled"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(checked) => {
            table.toggleAllPageRowsSelected(!!checked);
            onSelectAll?.(!!checked);
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          variant="filled"
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => {
            row.toggleSelected(!!checked);
            onRowSelect?.(row.original.id, !!checked);
          }}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => onSort("title")}
          className="h-8 px-2 hover:bg-transparent"
        >
          Наименование
          {sortBy === "title" ? (
            sortOrder === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-2 shrink-0">
            <img
              src={row.original.thumbnail}
              alt={row.original.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-body-2 text-text-black">
              {row.getValue("title")}
            </div>
            <div className="text-body-3 text-gray-3">
              {row.original.category}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "brand",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => onSort("brand")}
          className="h-8 px-2 hover:bg-transparent"
        >
          Вендор
          {sortBy === "brand" ? (
            sortOrder === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-body-2 text-text-black font-semibold">
          {row.getValue("brand")}
        </div>
      ),
    },
    {
      accessorKey: "sku",
      header: ({ column }) => (
        <span className="text-body-2 text-gray-3 font-semibold">Артикул</span>
      ),
      cell: ({ row }) => (
        <div>{row.original.sku || row.original.id.toString()}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => onSort("rating")}
          className="h-8 px-2 hover:bg-transparent"
        >
          Оценка
          {sortBy === "rating" ? (
            sortOrder === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      ),
      cell: ({ row }) => {
        const rating = parseFloat(row.getValue("rating"));
        return (
          <div className={cn("font-medium", rating < 3 && "text-red-500")}>
            {rating.toFixed(1)}/5
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => onSort("price")}
          className="h-8 px-2 hover:bg-transparent"
        >
          Цена, ₽
          {sortBy === "price" ? (
            sortOrder === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      ),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("ru-RU", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price);

        const [integerPart, decimalPart] = formatted.split(",");

        return (
          <div className="font-medium font-mono">
            {integerPart}
            <span className="text-gray-3">,{decimalPart}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <div className="flex items-center gap-8">
          <Button
            size="icon"
            className="text-body-3 py-[1.5px] px-2.5 rounded-full h-[27px]"
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];
}
