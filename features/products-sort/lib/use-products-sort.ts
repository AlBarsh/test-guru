import { useState, useEffect } from "react";

const SORT_STORAGE_KEY = "products-sort";

interface SortState {
  sortBy: string | null;
  sortOrder: "asc" | "desc";
}

export function useProductsSort() {
  const [sortState, setSortState] = useState<SortState>(() => {
    if (typeof window === "undefined") {
      return { sortBy: null, sortOrder: "asc" };
    }
    
    const stored = localStorage.getItem(SORT_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { sortBy: null, sortOrder: "asc" };
      }
    }
    
    return { sortBy: null, sortOrder: "asc" };
  });

  useEffect(() => {
    localStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(sortState));
  }, [sortState]);

  const handleSort = (column: string) => {
    setSortState((prev) => {
      if (prev.sortBy === column) {
        return {
          sortBy: column,
          sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
        };
      } else {
        return {
          sortBy: column,
          sortOrder: "asc",
        };
      }
    });
  };

  return {
    sortBy: sortState.sortBy,
    sortOrder: sortState.sortOrder,
    handleSort,
  };
}
