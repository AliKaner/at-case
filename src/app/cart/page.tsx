"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useCartStore, { type CartItem } from "@/store/cart";
import Button from "@/shared/components/Button";
import { formatPrice } from "@/shared/utils/price";
import { ROUTES } from "@/shared/constants/routes";
import {
  CartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/shared/components/icons";
import CartItemSkeleton from "./CartItemSkeleton";
import styles from "./page.module.scss";

type ValidCartItem = CartItem & { product: NonNullable<CartItem["product"]> };

const isValidCartItem = (item: CartItem): item is ValidCartItem =>
  item.product != null;

const CartPage = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const cartItems = useMemo(
    () => Array.from(items.values()).filter(isValidCartItem),
    [items]
  );

  const totalPrice = useMemo(() => {
    let total = 0;
    for (const item of cartItems) {
      const price =
        item.selectedVariant?.price ??
        item.product?.salePrice ??
        item.product?.price ??
        0;
      if (typeof price === "number") {
        total += price * item.quantity;
      }
    }
    return total;
  }, [cartItems]);

  const itemCount = useMemo(() => {
    let count = 0;
    for (const item of cartItems) {
      count += item.quantity;
    }
    return count;
  }, [cartItems]);

  const getItemPrice = (item: ValidCartItem) => {
    return (
      item.selectedVariant?.price ??
      item.product?.salePrice ??
      item.product?.price ??
      0
    );
  };

  const getItemStock = (item: ValidCartItem) => {
    return item.selectedVariant?.stock ?? item.product?.stock ?? 0;
  };

  const getItemKey = (item: ValidCartItem) => {
    if (item.selectedVariant?.barcode) {
      return `${item.product.id}-${item.selectedVariant.barcode}`;
    }
    return String(item.product.id);
  };

  const handleQuantityChange = (item: ValidCartItem, delta: number) => {
    const key = getItemKey(item);
    const newQuantity = item.quantity + delta;
    const stock = getItemStock(item);

    if (newQuantity <= 0) {
      removeFromCart(key);
    } else if (newQuantity <= stock) {
      updateQuantity(key, newQuantity);
    }
  };

  const handleRemove = (item: ValidCartItem) => {
    const key = getItemKey(item);
    removeFromCart(key);
  };

  const handleProductClick = (productId: number | string) => {
    router.push(ROUTES.PRODUCT_DETAIL(productId));
  };

  if (!isHydrated) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Cart</h1>
          <div className={styles.countSkeleton} />
        </div>
        <div className={styles.content}>
          <div className={styles.itemsSection}>
            <div className={styles.itemsList}>
              {Array.from({ length: 3 }).map((_, index) => (
                <CartItemSkeleton key={index} />
              ))}
            </div>
          </div>
          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryDetailsSkeleton}>
                <div className={styles.skeletonRow} />
                <div className={styles.skeletonRow} />
              </div>
              <div className={styles.summaryTotalSkeleton}>
                <div className={styles.skeletonLabel} />
                <div className={styles.skeletonAmount} />
              </div>
              <div className={styles.skeletonButton} />
              <div className={styles.skeletonButtonSecondary} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <CartIcon className={styles.emptyIcon} strokeWidth={1.5} />
            <h1 className={styles.emptyTitle}>Your cart is empty</h1>
            <p className={styles.emptyText}>
              You haven&apos;t added any products to your cart yet. Start
              exploring products!
            </p>
            <Button
              text="Explore Products"
              variant="primary"
              onClick={() => router.push(ROUTES.PRODUCTS)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Cart</h1>
        <p className={styles.count}>{itemCount} items</p>
      </div>

      <div className={styles.content}>
        <div className={styles.itemsSection}>
          <div className={styles.itemsList}>
            {cartItems.map((item) => {
              const productImage =
                item.product.productImages?.find(
                  (img) => img.imagePath && img.imagePath.trim() !== ""
                )?.imagePath || "/next.svg";
              const price = getItemPrice(item);
              const stock = getItemStock(item);
              const itemKey = getItemKey(item);

              return (
                <div key={itemKey} className={styles.cartItem}>
                  <div
                    className={styles.itemImage}
                    onClick={() => handleProductClick(item.product.id)}
                  >
                    <Image
                      src={productImage}
                      alt={item.product.name || "Product"}
                      fill
                      className={styles.image}
                      sizes="120px"
                      unoptimized={productImage.startsWith("http")}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    <div className={styles.itemInfo}>
                      <h3
                        className={styles.itemName}
                        onClick={() => handleProductClick(item.product.id)}
                      >
                        {item.product.name}
                      </h3>
                      {item.product.brand?.mname && (
                        <p className={styles.itemBrand}>
                          {item.product.brand.mname}
                        </p>
                      )}
                      {item.selectedVariant?.attributes && (
                        <p className={styles.itemVariant}>
                          {Object.entries(item.selectedVariant.attributes)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(", ")}
                        </p>
                      )}
                      <p className={styles.stockInfo}>Stock: {stock} units</p>
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button
                          className={styles.quantityButton}
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          <MinusIcon />
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                          className={styles.quantityButton}
                          onClick={() => handleQuantityChange(item, 1)}
                          disabled={item.quantity >= stock}
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemove(item)}
                        aria-label="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemPrice}>
                    <span className={styles.unitPrice}>
                      {formatPrice(price, item.product.currency)} x{" "}
                      {item.quantity}
                    </span>
                    <span className={styles.totalItemPrice}>
                      {formatPrice(
                        typeof price === "number" ? price * item.quantity : 0,
                        item.product.currency
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className={styles.clearButton} onClick={clearCart}>
            <TrashIcon />
            Clear Cart
          </button>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Products ({itemCount} items)</span>
                <span>{formatPrice(totalPrice, "TL")}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.freeShipping}>Free</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalAmount}>
                {formatPrice(totalPrice, "TL")}
              </span>
            </div>

            <Button
              text="Complete Order"
              variant="primary"
              block
              className={styles.checkoutButton}
            />

            <Button
              text="Continue Shopping"
              variant="secondary"
              block
              onClick={() => router.push(ROUTES.PRODUCTS)}
              className={styles.continueButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
