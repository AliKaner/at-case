"use client";

import useCartStore from "@/store/cart";
import type {
  Product,
  ProductProperty,
} from "@/features/product-detail/utils/productVariantUtils";
import { CartIcon, HeartIcon } from "@/shared/components/icons";
import styles from "./ProductDetailInfo.module.scss";

export interface ProductDetailInfoProps {
  product: Product;
  selectedProperty: ProductProperty | null;
  displayPrice: unknown;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  variantOptions: Record<string, string[]>;
  selectedVariants: Record<string, string>;
  onVariantChange: (key: string, value: string) => void;
}

const ProductDetailInfo = ({
  product,
  selectedProperty,
  displayPrice,
  isFavorite,
  onToggleFavorite,
  variantOptions,
  selectedVariants,
  onVariantChange,
}: ProductDetailInfoProps) => {
  const { addToCart, items } = useCartStore();
  const productIdStr = String(product.id);

  const formatPrice = (price: unknown, currency: string | null): string => {
    if (typeof price === "number") {
      return `${price.toFixed(2)} ${currency || "TRY"}`;
    }
    return "N/A";
  };

  const currentStock = selectedProperty?.stock ?? product.stock ?? 0;
  const isOutOfStock = currentStock === 0;

  const getCartKey = () => {
    if (selectedProperty?.barcode) {
      return `${productIdStr}-${selectedProperty.barcode}`;
    }
    return productIdStr;
  };

  const cartKey = getCartKey();
  const cartItem = items.get(cartKey);
  const quantity = cartItem?.quantity || 0;
  const canAddMore = currentStock > quantity;

  const handleAddToCart = () => {
    if (!canAddMore) return;

    const cartProduct = {
      ...product,
      id: product.id,
    };

    const selectedVariant = selectedProperty
      ? {
          barcode: selectedProperty.barcode,
          price:
            typeof selectedProperty.price === "number"
              ? selectedProperty.price
              : null,
          stock: selectedProperty.stock,
          attributes: selectedVariants,
        }
      : undefined;

    addToCart(cartProduct as Product, 1, selectedVariant);
  };

  return (
    <div className={styles.mainCard}>
      <div className={styles.header}>
        <h1 className={styles.title}>{product.name || "Unnamed Product"}</h1>
      </div>

      {product.brand?.mname && (
        <p className={styles.brand}>Brand: {product.brand.mname}</p>
      )}
      {product.category?.categoryName && (
        <p className={styles.category}>
          Category: {product.category.categoryName}
        </p>
      )}

      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {formatPrice(displayPrice, product.currency)}
          </span>
          {product.oldPrice != null &&
            typeof displayPrice === "number" &&
            typeof product.oldPrice === "number" &&
            displayPrice !== product.oldPrice && (
              <span className={styles.oldPrice}>
                {formatPrice(product.oldPrice, product.currency)}
              </span>
            )}
        </div>
        <p
          className={`${styles.stock} ${isOutOfStock ? styles.outOfStock : ""}`}
        >
          {isOutOfStock ? "Out of stock" : `Stock: ${currentStock} units`}
        </p>
        {selectedProperty && (
          <p className={styles.barcode}>
            Barcode: {selectedProperty.barcode || "N/A"}
          </p>
        )}
      </div>

      {Object.keys(variantOptions).length > 0 && (
        <div className={styles.variantSection}>
          <h3 className={styles.variantTitle}>Options</h3>
          <div className={styles.variantOptions}>
            {Object.entries(variantOptions).map(([key, values]) => (
              <div key={key} className={styles.variantGroup}>
                <label className={styles.variantLabel}>{key}:</label>
                <div className={styles.variantButtons}>
                  {values.map((value) => (
                    <button
                      key={value}
                      onClick={() => onVariantChange(key, value)}
                      className={`${styles.variantButton} ${
                        selectedVariants[key] === value ? styles.active : ""
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actionButtons}>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || !canAddMore}
          className={styles.addToCartButton}
        >
          <CartIcon className={styles.cartIcon} />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={onToggleFavorite}
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.active : ""
          }`}
          aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <HeartIcon className={styles.favoriteIcon} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
