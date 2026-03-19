import type { Product, ProductsResponse } from "../model/types";

const API_BASE_URL = "https://dummyjson.com/products";

export const productsApi = {
  async getProducts(params?: {
    search?: string;
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.search) {
      searchParams.append("q", params.search);
    }
    if (params?.limit) {
      searchParams.append("limit", params.limit.toString());
    }
    if (params?.skip) {
      searchParams.append("skip", params.skip.toString());
    }

    const url = params?.search
      ? `${API_BASE_URL}/search?${searchParams.toString()}`
      : `${API_BASE_URL}?${searchParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsResponse = await response.json();

    if (params?.sortBy && data.products.length > 0) {
      data.products.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Product];
        const bValue = b[params.sortBy as keyof Product];

        if (typeof aValue === "string" && typeof bValue === "string") {
          if (params.order === "desc") {
            return bValue.localeCompare(aValue);
          }
          return aValue.localeCompare(bValue);
        }

        const aNum = Number(aValue);
        const bNum = Number(bValue);

        if (params.order === "desc") {
          return bNum > aNum ? 1 : bNum < aNum ? -1 : 0;
        }
        return aNum > bNum ? 1 : aNum < bNum ? -1 : 0;
      });
    }

    return data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json();
  },
};
