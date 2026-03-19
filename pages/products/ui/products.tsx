import { useProducts } from "widgets/products-table";
import { ProductsTable } from "widgets/products-table";
import { ProductsSearch } from "features/products-search";
import { Pagination } from "shared/ui/components/pagination";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function ProductsPage() {
  const {
    products,
    isLoading,
    search,
    setSearch,
    sortBy,
    sortOrder,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    total,
    startItem,
    endItem,
  } = useProducts();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowSelect = (productId: number, selected: boolean) => {
    if (selected) {
      setSelectedRows((prev) => [...prev, productId]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(products.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedRows([]); // Сбрасываем выбор при смене страницы
  };

  return (
    <main className="container py-8">
      <div className="space-y-6">
        <div className="flex items-center py-[26px] px-7.5 bg-background rounded-[10px]">
          <h1 className="text-h3 font-semibold">Товары</h1>
          <div className="flex items-center gap-3 max-w-[1023px] mx-auto w-full">
            <ProductsSearch
              value={search}
              onChange={setSearch}
              className="w-full "
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <ProductsTable
              products={products}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              startItem={startItem}
              endItem={endItem}
              total={total}
            />
          </>
        )}
      </div>
    </main>
  );
}
