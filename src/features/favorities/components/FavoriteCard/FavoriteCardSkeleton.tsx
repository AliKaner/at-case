"use client";

import styles from "./FavoriteCardSkeleton.module.scss";

const FavoriteCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder} />
        <div className={styles.dropdownButton} />
      </div>

      <div className={styles.content}>
        <div className={styles.brand} />
        <div className={styles.title} />
        <div className={styles.titleSecond} />

        <div className={styles.priceContainer}>
          <div className={styles.price} />
          <div className={styles.oldPrice} />
        </div>

        <div className={styles.stock} />
      </div>
    </div>
  );
};

export default FavoriteCardSkeleton;

