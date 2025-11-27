import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GetProductsQuery } from "@/gql/graphql";

type Product = NonNullable<
  NonNullable<GetProductsQuery["productsByFilter"]>["products"]
>[0];

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: {
    barcode?: string | null;
    price?: number | null;
    stock?: number | null;
    attributes?: Record<string, string>;
  };
}

interface CartState {
  items: Map<string, CartItem>;
  isHydrated: boolean;
  setHydrated: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedVariant?: CartItem["selectedVariant"]
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartItems: () => CartItem[];
  getItemCount: () => number;
  getTotalPrice: () => number;
  isInCart: (id: string) => boolean;
}

const getCartItemKey = (
  productId: string,
  variant?: CartItem["selectedVariant"]
): string => {
  if (variant?.barcode) {
    return `${productId}-${variant.barcode}`;
  }
  return productId;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: new Map<string, CartItem>(),
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),

      addToCart: (
        product: Product,
        quantity = 1,
        selectedVariant?: CartItem["selectedVariant"]
      ) => {
        if (!product) return;
        set((state) => {
          const newMap = new Map(state.items);
          const key = getCartItemKey(String(product.id), selectedVariant);
          const existingItem = newMap.get(key);

          if (existingItem) {
            newMap.set(key, {
              ...existingItem,
              quantity: existingItem.quantity + quantity,
            });
          } else {
            newMap.set(key, {
              product,
              quantity,
              selectedVariant,
            });
          }
          return { items: newMap };
        });
      },

      removeFromCart: (id: string) => {
        set((state) => {
          const newMap = new Map(state.items);
          newMap.delete(id);
          return { items: newMap };
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => {
          const newMap = new Map(state.items);
          const item = newMap.get(id);
          if (item) {
            newMap.set(id, { ...item, quantity });
          }
          return { items: newMap };
        });
      },

      clearCart: () => {
        set({ items: new Map() });
      },

      getCartItems: () => {
        return Array.from(get().items.values());
      },

      getItemCount: () => {
        let count = 0;
        get().items.forEach((item) => {
          count += item.quantity;
        });
        return count;
      },

      getTotalPrice: () => {
        let total = 0;
        get().items.forEach((item) => {
          const price =
            item.selectedVariant?.price ??
            item.product?.salePrice ??
            item.product?.price ??
            0;
          if (typeof price === "number") {
            total += price * item.quantity;
          }
        });
        return total;
      },

      isInCart: (id: string) => {
        const items = get().items;
        for (const key of items.keys()) {
          if (key === id || key.startsWith(`${id}-`)) {
            return true;
          }
        }
        return false;
      },
    }),
    {
      name: "cart",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
      storage: {
        getItem: (name) => {
          if (typeof window === "undefined") return null;
          const str = window.localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              items: new Map(
                parsed.state.items
                  ? Object.entries(parsed.state.items).map(([k, v]) => [k, v])
                  : []
              ),
            },
          };
        },
        setItem: (name, value) => {
          if (typeof window === "undefined") return;
          const itemsMap = value.state.items;
          const itemsObj = Object.fromEntries(itemsMap);
          const toStore = {
            ...value,
            state: {
              ...value.state,
              items: itemsObj,
            },
          };
          window.localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => {
          if (typeof window === "undefined") return;
          window.localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useCartStore;
