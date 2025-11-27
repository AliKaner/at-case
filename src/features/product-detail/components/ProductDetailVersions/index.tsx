"use client";

import { useMemo } from "react";
import Image from "next/image";
import type {
  Product,
  ProductProperty,
} from "@/features/product-detail/utils/productVariantUtils";
import styles from "./ProductDetailVersions.module.scss";

export interface ProductDetailVersionsProps {
  product: Product;
  selectedProperty: ProductProperty | null;
  onVersionSelect: (property: ProductProperty) => void;
}

const ProductDetailVersions = ({
  product,
  selectedProperty,
  onVersionSelect,
}: ProductDetailVersionsProps) => {
  const versions = useMemo(() => {
    if (!product?.productProperties) return [];
    return product.productProperties;
  }, [product]);

  const getFallbackImageUrl = (): string => {
    if (product?.id) {
      return `https://storefront.dukkanhifi.com//images/prod/${product.id}.jpg`;
    }
    return "/next.svg";
  };

  const getVersionImage = (property: ProductProperty): string => {
    if (product?.productImages && product.productImages.length > 0) {
      if (property.barcode) {
        const targetBarcode = String(property.barcode).trim();

        const matchingImage = product.productImages.find((img) => {
          if (img.relatedBarcodes && Array.isArray(img.relatedBarcodes)) {
            return img.relatedBarcodes.some(
              (b) => String(b).trim() === targetBarcode
            );
          }

          if (img.relatedBarcodesRaw) {
            const rawBarcodes = String(img.relatedBarcodesRaw)
              .split(",")
              .map((b) => b.trim())
              .filter((b) => b.length > 0);
            if (rawBarcodes.includes(targetBarcode)) {
              return true;
            }
          }

          return false;
        });

        if (matchingImage?.imagePath && matchingImage.imagePath.trim() !== "") {
          return matchingImage.imagePath;
        }
      }

      const firstValidImage = product.productImages.find(
        (img) => img.imagePath && img.imagePath.trim() !== ""
      );

      if (firstValidImage?.imagePath) {
        return firstValidImage.imagePath;
      }
    }

    return getFallbackImageUrl();
  };

  const getVersionName = (property: ProductProperty): string => {
    if (property.variantValues.length === 0) return "Default";
    return property.variantValues
      .map((vv) => `${vv.key}: ${vv.value}`)
      .join(", ");
  };

  if (versions.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Available Versions</h3>
      <div className={styles.versionsGrid}>
        {versions.map((version) => {
          const isSelected = selectedProperty?.id === version.id;
          const versionImage = getVersionImage(version);
          const versionName = getVersionName(version);

          return (
            <button
              key={version.id}
              onClick={() => onVersionSelect(version)}
              className={`${styles.versionCard} ${
                isSelected ? styles.selected : ""
              }`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={versionImage}
                  alt={versionName}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 150px, 200px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes("next.svg")) {
                      target.src = "/next.svg";
                    }
                  }}
                  unoptimized={versionImage.startsWith("http")}
                />
              </div>
              <div className={styles.versionInfo}>
                <p className={styles.versionName}>{versionName}</p>
                {typeof version.price === "number" && (
                  <p className={styles.versionPrice}>
                    {`${version.price.toFixed(2)} ${product.currency || "TRY"}`}
                  </p>
                )}
                {version.stock != null && (
                  <p className={styles.versionStock}>Stock: {version.stock}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailVersions;
