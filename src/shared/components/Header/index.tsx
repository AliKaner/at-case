"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useFavoritesStore from "@/store/favorities";
import useCartStore from "@/store/cart";
import { formatPrice } from "@/shared/utils/price";
import { ROUTES } from "@/shared/constants/routes";
import { CartIcon, HeartIcon } from "@/shared/components/icons";
import styles from "./Header.module.scss";

const Header = () => {
  const router = useRouter();
  const favoritesCount = useFavoritesStore((state) => state.favorites.size);
  const cartItems = useCartStore((state) => state.items);

  const cartItemCount = useMemo(() => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item.quantity;
    });
    return count;
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = item.selectedVariant?.price ?? item.product?.salePrice ?? item.product?.price ?? 0;
      if (typeof price === "number") {
        total += price * item.quantity;
      }
    });
    return total;
  }, [cartItems]);

  const handleFavoritesClick = () => {
    router.push(ROUTES.FAVORITES);
  };

  const handleCartClick = () => {
    router.push(ROUTES.CART);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={ROUTES.PRODUCTS} className={styles.logo}>
          <span className={styles.logoText}>logo</span>
        </Link>

        <div className={styles.actions}>
          <button
            onClick={handleCartClick}
            className={styles.cartButton}
            aria-label="Cart"
          >
            <CartIcon className={styles.cartIcon} />
            {cartItemCount > 0 && (
              <>
                <span className={styles.cartBadge}>{cartItemCount}</span>
                <div className={styles.cartInfo}>
                  <span className={styles.cartTotal}>{formatPrice(cartTotal, "TL")}</span>
                </div>
              </>
            )}
          </button>
          <button
            onClick={handleFavoritesClick}
            className={styles.favoritesButton}
            aria-label="Favorites"
          >
            <HeartIcon className={styles.heartIcon} />
            <span className={styles.favoritesText}>favorites</span>
            {favoritesCount > 0 && (
              <span className={styles.favoritesBadge}>{favoritesCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
