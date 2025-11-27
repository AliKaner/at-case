import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GetProductsQuery } from "@/gql/graphql";

type Product = NonNullable<
  NonNullable<GetProductsQuery["productsByFilter"]>["products"]
>[0];

interface FavoritesState {
  favorites: Map<string, Product>;
  isHydrated: boolean;
  setHydrated: () => void;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  getFavorites: () => Product[];
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Map<string, Product>(),
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
      addFavorite: (product: Product) => {
        if (!product) return;
        set((state) => {
          const newMap = new Map(state.favorites);
          newMap.set(String(product.id), product);
          return { favorites: newMap };
        });
      },
      removeFavorite: (id: string) => {
        set((state) => {
          const newMap = new Map(state.favorites);
          newMap.delete(id);
          return { favorites: newMap };
        });
      },
      toggleFavorite: (product: Product) => {
        if (!product) return;
        const { isFavorite, addFavorite, removeFavorite } = get();
        const id = String(product.id);
        if (isFavorite(id)) {
          removeFavorite(id);
        } else {
          addFavorite(product);
        }
      },
      isFavorite: (id: string) => {
        return get().favorites.has(id);
      },
      getFavorites: () => {
        return Array.from(get().favorites.values());
      },
    }),
    {
      name: "favorites",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
      storage: {
        getItem: (name) => {
          if (globalThis.window === undefined) return null;
          const str = globalThis.window.localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              favorites: new Map(
                parsed.state.favorites
                  ? Object.entries(parsed.state.favorites).map(([k, v]) => [
                      k,
                      v,
                    ])
                  : []
              ),
            },
          };
        },
        setItem: (name, value) => {
          if (globalThis.window === undefined) return;
          const favoritesMap = value.state.favorites;
          const favoritesObj = Object.fromEntries(favoritesMap);
          const toStore = {
            ...value,
            state: {
              ...value.state,
              favorites: favoritesObj,
            },
          };
          globalThis.window.localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => {
          if (globalThis.window === undefined) return;
          globalThis.window.localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useFavoritesStore;
