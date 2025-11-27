"use client";

import styles from "./CartItemSkeleton.module.scss";

const CartItemSkeleton = () => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <div className={styles.imagePlaceholder} />
      </div>

      <div className={styles.itemDetails}>
        <div className={styles.itemInfo}>
          <div className={styles.itemName} />
          <div className={styles.itemBrand} />
          <div className={styles.stockInfo} />
        </div>

        <div className={styles.itemActions}>
          <div className={styles.quantityControl} />
          <div className={styles.removeButton} />
        </div>
      </div>

      <div className={styles.itemPrice}>
        <div className={styles.unitPrice} />
        <div className={styles.totalItemPrice} />
      </div>
    </div>
  );
};

export default CartItemSkeleton;

