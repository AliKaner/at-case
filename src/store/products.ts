import { create } from "zustand";
import type { ProductFilterInput } from "@/gql/graphql";

interface ProductsState {
  filters: ProductFilterInput;
  setFilters: (filters: ProductFilterInput) => void;
  resetFilters: () => void;
}

const defaultFilters: ProductFilterInput = {
  pageNumber: 1,
  pageSize: 12,
};

export const useProductsStore = create<ProductsState>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: defaultFilters }),
}));


