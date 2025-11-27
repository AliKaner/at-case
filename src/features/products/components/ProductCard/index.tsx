"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/shared/components/Card";
import useFavoritesStore from "@/store/favorities";
import useCartStore from "@/store/cart";
import type { GetProductsQuery } from "@/gql/graphql";
import { formatPrice } from "@/shared/utils/price";
import { ROUTES } from "@/shared/constants/routes";
import {
  HeartIcon,
  CartIcon,
  PlusIcon,
  MinusIcon,
} from "@/shared/components/icons";
import styles from "./ProductCard.module.scss";

type Product = NonNullable<
  NonNullable<NonNullable<GetProductsQuery["productsByFilter"]>["products"]>[0]
>;

export interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { addToCart, updateQuantity, removeFromCart, items } = useCartStore();
  const productIdStr = String(product.id);
  const isFav = isFavorite(productIdStr);

  const cartItem = items.get(productIdStr);
  const quantity = cartItem?.quantity || 0;
  const inCart = quantity > 0;

  const productImage =
    product.productImages?.find(
      (img) => img.imagePath && img.imagePath.trim() !== ""
    )?.imagePath || "/next.svg";

  const displayPrice = product.salePrice || product.price;
  const hasDiscount =
    product.oldPrice != null &&
    typeof displayPrice === "number" &&
    typeof product.oldPrice === "number" &&
    displayPrice < product.oldPrice;

  const discountPercentage =
    hasDiscount &&
    typeof product.oldPrice === "number" &&
    typeof displayPrice === "number"
      ? Math.round(((product.oldPrice - displayPrice) / product.oldPrice) * 100)
      : 0;

  const stock = product.stock ?? 0;
  const isOutOfStock = stock === 0;

  const handleCardClick = () => {
    router.push(ROUTES.PRODUCT_DETAIL(product.id));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stock > quantity) {
      addToCart(product, 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stock > quantity) {
      updateQuantity(productIdStr, quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(productIdStr, quantity - 1);
    } else {
      removeFromCart(productIdStr);
    }
  };

  const isLowStock = stock > 0 && stock <= 5;
  const canAddMore = stock > quantity;

  return (
    <Card hover className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <Image
          src={productImage}
          alt={product.name || "Product"}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src && !target.src.includes("next.svg")) {
              target.src = "/next.svg";
            }
          }}
          unoptimized={productImage.startsWith("http")}
        />

        {hasDiscount && discountPercentage > 0 && (
          <span className={styles.discountBadge}>%{discountPercentage}</span>
        )}

        {isOutOfStock && (
          <div className={styles.outOfStockOverlay}>
            <span className={styles.outOfStockText}>Out of Stock</span>
          </div>
        )}

        <button
          onClick={handleFavoriteClick}
          className={styles.favoriteButton}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon
            className={`${styles.favoriteIcon} ${isFav ? styles.active : ""}`}
          />
        </button>
      </div>

      <div className={styles.content}>
        {product.brand?.mname && (
          <p className={styles.brand}>{product.brand.mname}</p>
        )}
        <h3 className={styles.title}>{product.name || "Unnamed Product"}</h3>

        <div className={styles.priceContainer}>
          {hasDiscount && (
            <span className={styles.oldPrice}>
              {formatPrice(product.oldPrice, product.currency)}
            </span>
          )}
          <span className={styles.price}>
            {formatPrice(displayPrice, product.currency)}
          </span>
        </div>

        {isLowStock && <p className={styles.lowStock}>Only {stock} left</p>}

        {inCart ? (
          <div
            className={styles.quantityControl}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="group"
            aria-label="Quantity controls"
          >
            <button
              onClick={handleDecrement}
              className={styles.quantityButton}
              aria-label="Decrease"
            >
              <MinusIcon />
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              onClick={handleIncrement}
              className={styles.quantityButton}
              disabled={!canAddMore}
              aria-label="Increase"
            >
              <PlusIcon />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={styles.addToCartButton}
            aria-label="Add to cart"
          >
            <CartIcon className={styles.cartIcon} />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
