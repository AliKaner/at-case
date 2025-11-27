"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Card from "@/shared/components/Card";
import useFavoritesStore from "@/store/favorities";
import type { GetProductsQuery } from "@/gql/graphql";
import { formatPrice } from "@/shared/utils/price";
import { ROUTES } from "@/shared/constants/routes";
import {
  MoreVerticalIcon,
  ExternalLinkIcon,
  ShareIcon,
  CheckIcon,
} from "@/shared/components/icons";
import styles from "./FavoriteCard.module.scss";

type Product = NonNullable<
  NonNullable<NonNullable<GetProductsQuery["productsByFilter"]>["products"]>[0]
>;

export interface FavoriteCardProps {
  product: Product;
}

const FavoriteCard = ({ product }: FavoriteCardProps) => {
  const router = useRouter();
  const { removeFavorite } = useFavoritesStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const productImage =
    product.productImages?.find(
      (img) => img.imagePath && img.imagePath.trim() !== ""
    )?.imagePath || "/next.svg";

  const displayPrice = product.salePrice || product.price;
  const hasDiscount =
    product.oldPrice != null &&
    typeof displayPrice === "number" &&
    typeof product.oldPrice === "number" &&
    displayPrice !== product.oldPrice;

  const handleCardClick = () => {
    router.push(ROUTES.PRODUCT_DETAIL(product.id));
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRemoveFromFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavorite(String(product.id));
    setIsDropdownOpen(false);
  };

  const handleGoToDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(ROUTES.PRODUCT_DETAIL(product.id));
    setIsDropdownOpen(false);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${globalThis.window.location.origin}/products/${product.id}`;
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <Card hover className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <Image
          src={productImage}
          alt={product.name || "Product"}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src && !target.src.includes("next.svg")) {
              target.src = "/next.svg";
            }
          }}
          unoptimized={productImage.startsWith("http")}
        />
        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <button
            onClick={handleDropdownToggle}
            className={styles.dropdownButton}
            aria-label="Options"
          >
            <MoreVerticalIcon size={20} />
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button
                onClick={handleGoToDetail}
                className={styles.dropdownItem}
              >
                <ExternalLinkIcon size={16} />
                View Details
              </button>
              <button onClick={handleShare} className={styles.dropdownItem}>
                <ShareIcon size={16} />
                Share
              </button>
              <button
                onClick={handleRemoveFromFavorites}
                className={`${styles.dropdownItem} ${styles.removeItem}`}
              >
                <CheckIcon size={16} />
                Remove from Favorites
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        {product?.brand?.mname && (
          <p className={styles.brand}>{product?.brand?.mname}</p>
        )}
        <h3 className={styles.title}>{product?.name || "Unnamed Product"}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            {formatPrice(displayPrice, product?.currency ?? null)}
          </span>
          {hasDiscount && (
            <span className={styles.oldPrice}>
              {formatPrice(product?.oldPrice, product?.currency ?? null)}
            </span>
          )}
        </div>
        {product?.stock !== undefined && (
          <p
            className={`${styles.stock} ${
              product?.stock === 0 ? styles.outOfStock : ""
            }`}
          >
            {product.stock === 0 ? "Out of stock" : `Stock: ${product.stock}`}
          </p>
        )}
      </div>
    </Card>
  );
};

export default FavoriteCard;
