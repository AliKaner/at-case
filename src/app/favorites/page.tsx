"use client";

import { useMemo } from "react";
import useFavoritesStore from "@/store/favorities";
import FavoriteCard from "@/features/favorities/components/FavoriteCard";
import FavoriteCardSkeleton from "@/features/favorities/components/FavoriteCard/FavoriteCardSkeleton";
import { HeartIcon } from "@/shared/components/icons";
import styles from "./page.module.scss";

export default function FavoritesPage() {
  const favoritesMap = useFavoritesStore((state) => state.favorites);
  const isHydrated = useFavoritesStore((state) => state.isHydrated);
  const favorites = useMemo(
    () =>
      Array.from(favoritesMap.values()).filter(
        (p): p is NonNullable<typeof p> => p !== null
      ),
    [favoritesMap]
  );

  if (!isHydrated) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Favorites</h1>
          <div className={styles.countSkeleton} />
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <FavoriteCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <HeartIcon className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Your favorites list is empty</h2>
            <p className={styles.emptyText}>
              Add products you like to favorites to see them here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Favorites</h1>
        <p className={styles.count}>{favorites.length} items</p>
      </div>
      <div className={styles.grid}>
        {favorites.map((product) => (
          <FavoriteCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
