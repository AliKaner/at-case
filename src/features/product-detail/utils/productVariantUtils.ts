import type { GetProductDetailsQuery } from "@/gql/graphql";

export type Product = NonNullable<GetProductDetailsQuery["productDetails"]>;

export type ProductProperty = NonNullable<
  NonNullable<NonNullable<Product>["productProperties"]>[0]
>;

export function getSelectedProperty(
  product: Product | null | undefined,
  selectedVariants: Record<string, string>
): ProductProperty | null {
  if (!product?.productProperties) return null;

  if (!selectedVariants || Object.keys(selectedVariants).length === 0) {
    return product.productProperties[0] ?? null;
  }

  return (
    product.productProperties.find((prop) =>
      prop.variantValues.every((vv) => selectedVariants[vv.key] === vv.value)
    ) || null
  );
}

export function getVariantOptions(
  product: Product | null | undefined
): Record<string, string[]> {
  if (!product?.productProperties) return {};

  const options: Record<string, string[]> = {};

  product.productProperties.forEach((prop) => {
    prop.variantValues.forEach((vv) => {
      if (!options[vv.key]) {
        options[vv.key] = [];
      }
      if (!options[vv.key].includes(vv.value)) {
        options[vv.key].push(vv.value);
      }
    });
  });

  return options;
}

export function getProductImagePath(
  product: Product | null | undefined,
  selectedProperty: ProductProperty | null
): string {
  const isValidImagePath = (path: string | null | undefined): boolean => {
    return (
      path !== null &&
      path !== undefined &&
      typeof path === "string" &&
      path.trim() !== ""
    );
  };

  const getFallbackImageUrl = (): string => {
    if (product?.id) {
      return `https://storefront.dukkanhifi.com//images/prod/${product.id}.jpg`;
    }
    return "/next.svg";
  };

  if (product?.productImages && product.productImages.length > 0) {
    if (selectedProperty?.barcode) {
      const targetBarcode = String(selectedProperty.barcode).trim();

      const matchingImage = product.productImages.find((img) => {
        if (img.relatedBarcodes && Array.isArray(img.relatedBarcodes)) {
          const found = img.relatedBarcodes.some(
            (b) => String(b).trim() === targetBarcode
          );
          if (found) return true;
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

      if (matchingImage && isValidImagePath(matchingImage.imagePath)) {
        return matchingImage.imagePath!;
      }
    }

    const firstValidImage = product.productImages.find((img) =>
      isValidImagePath(img.imagePath)
    );

    if (firstValidImage && isValidImagePath(firstValidImage.imagePath)) {
      return firstValidImage.imagePath!;
    }
  }

  return getFallbackImageUrl();
}
