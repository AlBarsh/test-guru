import { useState, useEffect } from "react";

export function useProductsSearch(debounceMs: number = 500) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, debounceMs]);

  return {
    search: debouncedValue,
    inputValue,
    setSearch: setInputValue,
  };
}
