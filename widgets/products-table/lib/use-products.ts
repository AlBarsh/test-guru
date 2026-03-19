import { useQuery } from "@tanstack/react-query";
import { productsApi } from "entities/product";
import { useState, useEffect } from "react";
import { useProductsSort } from "features/products-sort";
import { useProductsSearch } from "features/products-search";

const ITEMS_PER_PAGE = 20;

export function useProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { sortBy, sortOrder, handleSort } = useProductsSort();
  const {
    search,
    inputValue,
    setSearch: setSearchValue,
  } = useProductsSearch(500);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", search, sortBy, sortOrder, currentPage],
    queryFn: () =>
      productsApi.getProducts({
        search: search || undefined,
        limit: ITEMS_PER_PAGE,
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
        sortBy: sortBy || undefined,
        order: sortOrder,
      }),
  });

  const totalPages = data?.total ? Math.ceil(data.total / ITEMS_PER_PAGE) : 1;
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, data?.total || 0);

  return {
    products: data?.products || [],
    isLoading,
    error,
    search: inputValue,
    setSearch: handleSearch,
    sortBy,
    sortOrder,
    handleSort,
    currentPage,
    setCurrentPage: (page: number) => {
      setCurrentPage(page);
    },
    totalPages,
    total: data?.total || 0,
    startItem,
    endItem,
    refetch,
  };
}
