import { apiClient, fetchApi, handleApiResponse } from "../client";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateProductData {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductData {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

export const productsService = {
  async getProducts(page = 1, limit = 10): Promise<ProductsResponse> {
    return fetchApi<ProductsResponse>(
      `/api/products?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );
  },

  async getProduct(id: string): Promise<Product> {
    return fetchApi<Product>(`/api/products/${id}`, {
      method: "GET",
    });
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    return fetchApi<Product>("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateProduct(id: string, data: UpdateProductData): Promise<Product> {
    return fetchApi<Product>(`/api/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async deleteProduct(id: string): Promise<void> {
    return fetchApi(`/api/products/${id}`, {
      method: "DELETE",
    });
  },
};
