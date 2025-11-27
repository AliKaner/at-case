"use client";

import styles from "./ProductCardSkeleton.module.scss";

const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder} />
        <div className={styles.favoriteButton} />
      </div>

      <div className={styles.content}>
        <div className={styles.brand} />
        <div className={styles.title} />
        <div className={styles.titleSecond} />

        <div className={styles.priceContainer}>
          <div className={styles.price} />
        </div>

        <div className={styles.addToCartButton} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

