"use client";

import { useMemo } from "react";
import { useGetProducts } from "@/api/useGetProducts";
import { useProductsStore } from "@/store/products";
import ProductCard from "@/features/products/components/ProductCard";
import ProductCardSkeleton from "@/features/products/components/ProductCard/ProductCardSkeleton";
import ProductFilters from "@/features/products/layout/ProductFilters";
import Button from "@/shared/components/Button";
import Spinner from "@/shared/components/Spinner";
import Error from "@/shared/components/Error";
import type { CategoryDto } from "@/gql/graphql";
import styles from "./ProductsPageContent.module.scss";

const ProductsPageContent = () => {
  const { filters } = useProductsStore();
  const { data, isLoading, error, refetch } = useGetProducts({
    filter: filters,
  });

  const { data: allCategoriesData } = useGetProducts({
    filter: {
      pageNumber: 1,
      pageSize: 1000,
    },
  });

  const products = useMemo(
    () => data?.productsByFilter?.products || [],
    [data?.productsByFilter?.products]
  );
  const pagination = data?.productsByFilter;

  const categories = useMemo(() => {
    const categoryMap = new Map<number, CategoryDto>();

    if (allCategoriesData?.productsByFilter?.products) {
      for (const product of allCategoriesData.productsByFilter.products) {
        if (product?.category?.id) {
          if (!categoryMap.has(product.category.id)) {
            categoryMap.set(
              product.category.id,
              product.category as CategoryDto
            );
          }
        }
      }
    }

    if (products.length > 0) {
      for (const product of products) {
        if (product?.category?.id) {
          if (!categoryMap.has(product.category.id)) {
            categoryMap.set(
              product.category.id,
              product.category as CategoryDto
            );
          }
        }
      }
    }

    return Array.from(categoryMap.values()).sort((a, b) => {
      const nameA = a.categoryName || "";
      const nameB = b.categoryName || "";
      return nameA.localeCompare(nameB);
    });
  }, [allCategoriesData, products]);

  const { setFilters, resetFilters } = useProductsStore();

  const handlePageChange = (pageNumber: number) => {
    setFilters({
      ...filters,
      pageNumber,
    });
  };

  const hasProducts = products.length > 0;
  const hasNextPage = pagination?.hasNextPage || false;
  const hasPreviousPage = pagination?.hasPreviousPage || false;
  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 0;

  if (error) {
    return (
      <div className={styles.container}>
        <Error
          message={error instanceof Error ? error.message : "An error occurred"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <ProductFilters categories={categories} />
        </aside>

        <main className={styles.content}>
          {isLoading && !hasProducts && (
            <div className={styles.productsGrid}>
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!isLoading && hasProducts && (
            <>
              <div className={styles.productsGrid}>
                {products
                  .filter((product) => product !== null)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Button
                    text="Previous"
                    variant="secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPreviousPage || isLoading}
                    block={false}
                  />
                  <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    text="Next"
                    variant="secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage || isLoading}
                    block={false}
                  />
                </div>
              )}

              {isLoading && (
                <div className={styles.loadingOverlay}>
                  <Spinner size="medium" />
                </div>
              )}
            </>
          )}
          {!isLoading && !hasProducts && (
            <div className={styles.emptyState}>
              <div className={styles.emptyContent}>
                <p className={styles.emptyText}>No products found</p>
                <Button
                  text="Reset Filters"
                  variant="primary"
                  onClick={resetFilters}
                  block={false}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPageContent;
