import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/components/table";
import type { Product } from "entities/product";
import { RefreshCcw, CirclePlus } from "lucide-react";
import { Button } from "shared/ui/components/button";
import { cn } from "shared/lib/utils";
import { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/components/dialog";
import { Dialog, DialogContent } from "shared/ui/components/dialog";
import { AddProductForm } from "features/add-product-form/ui/add-product-form";
import { useProducts } from "../lib/use-products";
import { getProductsTableColumns } from "../model/products-table-columns";

interface ProductsTableProps {
  products: Product[];
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  onSort: (column: string) => void;
  selectedRows?: number[];
  onRowSelect?: (productId: number, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
}

export function ProductsTable({
  products,
  sortBy,
  sortOrder,
  onSort,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
}: ProductsTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = getProductsTableColumns({
    sortBy,
    sortOrder,
    onSort,
    onRowSelect,
    onSelectAll,
  });

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading, refetch } = useProducts();

  return (
    <div className="rounded-md  bg-background">
      <div className=" flex items-center justify-between px-7.5 pt-7.5 pb-10">
        <h2 className="text-h4 font-semibold">Все позиции</h2>
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCcw
              className={cn("size-[22px]", isLoading && "animate-spin")}
            />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <CirclePlus className="size-6 mr-[15px]" />
                Добавить
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить товар</DialogTitle>
              </DialogHeader>
              <AddProductForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(row.getIsSelected() && "bg-muted/50")}
                data-selected={row.getIsSelected()}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(index === 0 && "relative")}
                  >
                    {index === 0 && row.getIsSelected() && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Нет данных
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
