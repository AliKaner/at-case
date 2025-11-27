"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import SegmentedControl from "@/shared/components/SegmentedControl";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import CategoryFilter from "@/features/products/components/CategoryFilter";
import { useDebounce, useUrlFilters } from "@/shared/hooks";
import { useProductsStore } from "@/store/products";
import {
  productFilterSchema,
  type ProductFilterFormValues,
  convertFormValuesToFilterInput,
} from "@/api/productFilterSchema";
import type { CategoryDto, ProductFilterInput } from "@/gql/graphql";
import styles from "./ProductFilters.module.scss";

export interface ProductFiltersProps {
  categories?: Array<CategoryDto>;
}

const pageSizeOptions = [
  { value: "12", label: "12 per page" },
  { value: "24", label: "24 per page" },
  { value: "48", label: "48 per page" },
];

const stockFilterOptions = [
  { value: "all", label: "All" },
  { value: "inStock", label: "In Stock" },
  { value: "outOfStock", label: "Out of Stock" },
];

type StockFilterValue = "all" | "inStock" | "outOfStock";

const getStockFilterValue = (stockStatus?: number | null): StockFilterValue => {
  if (stockStatus === -1) return "inStock";
  if (stockStatus === 3) return "outOfStock";
  return "all";
};

const getFormDefaultValues = (
  filters: ProductFilterInput
): ProductFilterFormValues => ({
  keyword: filters?.keyword || "",
  minPrice:
    filters?.minPrice !== undefined && filters?.minPrice !== null
      ? String(Number(filters.minPrice))
      : "",
  maxPrice:
    filters?.maxPrice !== undefined && filters?.maxPrice !== null
      ? String(Number(filters.maxPrice))
      : "",
  pageSize:
    filters?.pageSize && filters.pageSize !== 12
      ? String(filters.pageSize)
      : "",
  stockFilter: getStockFilterValue(filters?.stockStatus),
  categoryId: filters?.categoryId?.filter(
    (id): id is number => id !== null && id !== undefined
  ),
});

const ProductFilters = ({ categories = [] }: ProductFiltersProps) => {
  const { filters, setFilters, resetFilters } = useProductsStore();
  const { updateUrl, copyShareableUrl } = useUrlFilters(filters, setFilters);
  const [copySuccess, setCopySuccess] = useState(false);
  const isInitialMount = useRef(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProductFilterFormValues>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: getFormDefaultValues(filters),
  });

  const keyword = watch("keyword");
  const debouncedKeyword = useDebounce(keyword, 300);
  const stockFilter = watch("stockFilter") || "all";
  const categoryId = watch("categoryId");

  const applyFilters = useCallback(
    (updates: Partial<ProductFilterInput>) => {
      const newFilters = { ...filters, ...updates, pageNumber: 1 };
      setFilters(newFilters);
      updateUrl(newFilters);
    },
    [filters, setFilters, updateUrl]
  );

  const prevFiltersRef = useRef(filters);
  useEffect(() => {
    const prev = prevFiltersRef.current;
    const hasChanged =
      filters?.keyword !== prev?.keyword ||
      filters?.minPrice !== prev?.minPrice ||
      filters?.maxPrice !== prev?.maxPrice ||
      filters?.stockStatus !== prev?.stockStatus ||
      filters?.pageSize !== prev?.pageSize ||
      JSON.stringify(filters?.categoryId) !== JSON.stringify(prev?.categoryId);

    if (hasChanged) {
      prevFiltersRef.current = filters;
      reset(getFormDefaultValues(filters));
    }
  }, [filters, reset]);

  const prevKeywordRef = useRef(debouncedKeyword?.trim() || undefined);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentKeyword = debouncedKeyword?.trim() || undefined;
    if (currentKeyword !== prevKeywordRef.current) {
      prevKeywordRef.current = currentKeyword;
      applyFilters({ keyword: currentKeyword });
    }
  }, [debouncedKeyword, applyFilters]);

  const handleStockFilterChange = useCallback(
    (value: string) => {
      const typedValue = value as StockFilterValue;
      setValue("stockFilter", typedValue);
      let stockStatus: number | undefined;
      if (typedValue === "inStock") stockStatus = -1;
      else if (typedValue === "outOfStock") stockStatus = 3;
      applyFilters({ stockStatus });
    },
    [setValue, applyFilters]
  );

  const handleCategoryChange = useCallback(
    (ids: number[] | undefined) => {
      setValue("categoryId", ids);
      applyFilters({ categoryId: ids && ids.length > 0 ? ids : undefined });
    },
    [setValue, applyFilters]
  );

  const onSubmit = (data: ProductFilterFormValues) => {
    const filterInput = convertFormValuesToFilterInput(data);
    setFilters(filterInput);
    updateUrl(filterInput);
  };

  const handleReset = () => {
    reset({
      keyword: "",
      minPrice: "",
      maxPrice: "",
      pageSize: "",
      stockFilter: "all",
      categoryId: undefined,
    });
    resetFilters();
    updateUrl({ pageNumber: 1, pageSize: 12 });
  };

  const handleShareFilter = async () => {
    const success = await copyShareableUrl();
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const hasActiveFilters =
    filters?.keyword ||
    (filters?.minPrice !== undefined && filters?.minPrice !== null) ||
    (filters?.maxPrice !== undefined && filters?.maxPrice !== null) ||
    filters?.stockStatus ||
    (filters?.categoryId && filters.categoryId.length > 0) ||
    (filters?.pageSize && filters.pageSize !== 12);

  return (
    <Card className={styles.filtersCard}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {hasActiveFilters && (
          <div className={styles.shareRow}>
            <Button
              type="button"
              text={copySuccess ? "Copied!" : "Share Filter"}
              variant="secondary"
              onClick={handleShareFilter}
              block
            />
          </div>
        )}

        <div className={styles.formRow}>
          <Input
            label="Search"
            placeholder="Search products..."
            {...register("keyword")}
            error={errors.keyword?.message}
            className={styles.input}
          />
        </div>

        {categories.length > 0 && (
          <div className={styles.formRow}>
            <CategoryFilter
              categories={categories}
              value={categoryId}
              onChange={handleCategoryChange}
              className={styles.input}
            />
          </div>
        )}

        <div className={styles.formRow}>
          <div className={styles.stockFilterWrapper}>
            <span className={styles.label}>Stock Status</span>
            <SegmentedControl
              options={stockFilterOptions}
              value={stockFilter}
              onChange={handleStockFilterChange}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <Input
            label="Min Price"
            type="number"
            placeholder="0"
            step="0.01"
            {...register("minPrice")}
            error={errors.minPrice?.message}
            className={styles.input}
          />
          <Input
            label="Max Price"
            type="number"
            placeholder="10000"
            step="0.01"
            {...register("maxPrice")}
            error={errors.maxPrice?.message}
            className={styles.input}
          />
        </div>

        <div className={styles.formRow}>
          <Select
            label="Items Per Page"
            options={pageSizeOptions}
            placeholder="Select page size"
            {...register("pageSize")}
            error={errors.pageSize?.message}
            className={styles.select}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            text="Apply Filters"
            variant="primary"
            block={false}
          />
          <Button
            type="button"
            text="Reset"
            variant="secondary"
            onClick={handleReset}
            block={false}
          />
        </div>
      </form>
    </Card>
  );
};

export default ProductFilters;
