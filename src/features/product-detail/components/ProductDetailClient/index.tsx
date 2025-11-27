"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import useFavoritesStore from "@/store/favorities";
import ProductDetailImage from "@/features/product-detail/components/ProductDetailImage";
import ProductDetailInfo from "@/features/product-detail/components/ProductDetailInfo";
import ProductDetailVersions from "@/features/product-detail/components/ProductDetailVersions";
import {
  getProductImagePath,
  getSelectedProperty,
  getVariantOptions,
  type ProductProperty,
  type Product,
} from "@/features/product-detail/utils/productVariantUtils";
import { ROUTES } from "@/shared/constants/routes";
import styles from "./ProductDetailClient.module.scss";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { isFavorite: checkIsFavorite, toggleFavorite } = useFavoritesStore();
  const productIdStr = String(product?.id);

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(checkIsFavorite(productIdStr));
  }, [checkIsFavorite, productIdStr]);

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setSelectedVariants({});
  }, [product?.id]);

  const selectedProperty = useMemo(
    () => getSelectedProperty(product, selectedVariants),
    [product, selectedVariants]
  );

  const productImage = useMemo(
    () => getProductImagePath(product, selectedProperty),
    [product, selectedProperty]
  );

  const handleVariantChange = (key: string, value: string) => {
    setSelectedVariants((prev) => {
      const newSelectedVariants = {
        ...prev,
        [key]: value,
      };

      const matchingProperty = product.productProperties?.find((prop) =>
        prop.variantValues.every(
          (vv) => newSelectedVariants[vv.key] === vv.value
        )
      );

      if (matchingProperty) {
        return newSelectedVariants;
      }

      const fallbackProperty = product.productProperties?.find((prop) =>
        prop.variantValues.some((vv) => vv.key === key && vv.value === value)
      );

      if (fallbackProperty) {
        const fallbackVariants: Record<string, string> = {};
        for (const vv of fallbackProperty.variantValues) {
          fallbackVariants[vv.key] = vv.value;
        }
        return fallbackVariants;
      }
      return newSelectedVariants;
    });
  };

  const handleVersionSelect = (property: ProductProperty) => {
    const newVariants: Record<string, string> = {};
    for (const vv of property.variantValues) {
      newVariants[vv.key] = vv.value;
    }
    setSelectedVariants(newVariants);
  };

  const effectiveSelectedVariants = useMemo(() => {
    if (Object.keys(selectedVariants).length > 0 || !selectedProperty) {
      return selectedVariants;
    }

    const initial: Record<string, string> = {};
    for (const vv of selectedProperty.variantValues) {
      initial[vv.key] = vv.value;
    }

    return initial;
  }, [selectedProperty, selectedVariants]);

  const variantOptions = useMemo(() => getVariantOptions(product), [product]);

  const displayPrice =
    selectedProperty?.price || product?.salePrice || product?.price;

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setIsFav(!isFav);
  };

  const hasProductDetails =
    product.stockCode ||
    product.gtin ||
    product.manufacturerPartNumber ||
    product.vat != null;

  return (
    <div className={styles.container}>
      <Button
        text="← Back to Products"
        variant="secondary"
        onClick={() => router.push(ROUTES.PRODUCTS)}
        className={styles.backButton}
        block={false}
      />

      <div className={styles.mainLayout}>
        <div className={styles.imageSection}>
          <ProductDetailImage
            product={product}
            selectedImagePath={productImage}
          />
        </div>

        <div className={styles.infoSection}>
          <ProductDetailInfo
            product={product}
            selectedProperty={selectedProperty}
            displayPrice={displayPrice}
            isFavorite={isFav}
            onToggleFavorite={handleToggleFavorite}
            variantOptions={variantOptions}
            selectedVariants={effectiveSelectedVariants}
            onVariantChange={handleVariantChange}
          />
        </div>
      </div>

      <div className={styles.fullWidthSection}>
        {hasProductDetails && (
          <Card className={styles.detailsCard}>
            <h3 className={styles.detailsTitle}>Product Details</h3>
            <div className={styles.detailsList}>
              {product.stockCode && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Stock Code</span>
                  <span className={styles.detailValue}>
                    {product.stockCode}
                  </span>
                </div>
              )}
              {product.gtin && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>GTIN</span>
                  <span className={styles.detailValue}>{product.gtin}</span>
                </div>
              )}
              {product.manufacturerPartNumber && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>
                    Manufacturer Part No
                  </span>
                  <span className={styles.detailValue}>
                    {product.manufacturerPartNumber}
                  </span>
                </div>
              )}
              {product.vat != null && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>VAT</span>
                  <span className={styles.detailValue}>
                    %{String(product.vat)}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}
        <ProductDetailVersions
          product={product}
          selectedProperty={selectedProperty}
          onVersionSelect={handleVersionSelect}
        />
      </div>
    </div>
  );
}
