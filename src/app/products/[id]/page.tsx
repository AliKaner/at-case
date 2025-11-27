import { notFound } from "next/navigation";
import { graphqlFetcher } from "@/shared/api/graphqlFetcher";
import {
  GetProductDetailsDocument,
  type GetProductDetailsQuery,
  type GetProductDetailsQueryVariables,
  GetProductImagesDocument,
  type GetProductImagesQuery,
  type GetProductImagesQueryVariables,
} from "@/gql/graphql";
import ProductDetailClient from "@/features/product-detail/components/ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(productId: number) {
  try {
    const detailsData = await graphqlFetcher<
      GetProductDetailsQuery,
      GetProductDetailsQueryVariables
    >(GetProductDetailsDocument, {
      productId,
    });

    const product = detailsData.productDetails;
    if (!product) return null;

    try {
      const imagesData = await graphqlFetcher<
        GetProductImagesQuery,
        GetProductImagesQueryVariables
      >(GetProductImagesDocument, {
        productId,
      });

      const imageProduct = imagesData.productsByFilter?.products?.[0];

      if (imageProduct?.id === productId && imageProduct.productImages) {
        return {
          ...product,
          productImages: imageProduct.productImages,
        };
      }
    } catch {}

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number.parseInt(id, 10);

  if (!productId || Number.isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
