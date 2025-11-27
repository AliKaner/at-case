"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Product } from "@/features/product-detail/utils/productVariantUtils";
import styles from "./ProductDetailImage.module.scss";

export interface ProductDetailImageProps {
  product: Product;
  selectedImagePath: string;
}

const ProductDetailImage = ({
  product,
  selectedImagePath,
}: ProductDetailImageProps) => {
  const [errorPath, setErrorPath] = useState<string | null>(null);

  const validImagePath = useMemo(() => {
    if (errorPath === selectedImagePath) {
      return "/next.svg";
    }

    if (
      selectedImagePath &&
      typeof selectedImagePath === "string" &&
      selectedImagePath.trim() !== ""
    ) {
      return selectedImagePath;
    }
    return "/next.svg";
  }, [selectedImagePath, errorPath]);

  const handleError = () => {
    if (validImagePath !== "/next.svg") {
      setErrorPath(selectedImagePath);
    }
  };

  const isExternal = validImagePath.startsWith("http");

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          key={selectedImagePath}
          src={validImagePath}
          alt={product?.name || "Product"}
          fill
          className={styles.image}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          onError={handleError}
          onLoad={() => {
            if (errorPath === selectedImagePath) {
              setErrorPath(null);
            }
          }}
          unoptimized={isExternal}
        />
      </div>
    </div>
  );
};

export default ProductDetailImage;
