"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { ProductFilterInput } from "@/gql/graphql";

export function useUrlFilters(
  filters: ProductFilterInput,
  setFilters: (filters: ProductFilterInput) => void
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const urlFilters: ProductFilterInput = {
      pageNumber: 1,
      pageSize: 12,
    };

    const keyword = searchParams.get("keyword");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const pageSize = searchParams.get("pageSize");
    const pageNumber = searchParams.get("page");
    const stockStatus = searchParams.get("stockStatus");
    const categoryId = searchParams.get("categoryId");

    if (keyword) urlFilters.keyword = keyword;
    if (minPrice) urlFilters.minPrice = Number(minPrice);
    if (maxPrice) urlFilters.maxPrice = Number(maxPrice);
    if (pageSize) urlFilters.pageSize = Number(pageSize);
    if (pageNumber) urlFilters.pageNumber = Number(pageNumber);
    if (stockStatus) urlFilters.stockStatus = Number(stockStatus);
    if (categoryId) {
      urlFilters.categoryId = categoryId.split(",").map(Number);
    }

    const hasUrlFilters =
      keyword ||
      minPrice ||
      maxPrice ||
      pageSize ||
      pageNumber ||
      stockStatus ||
      categoryId;

    if (hasUrlFilters) {
      setFilters(urlFilters);
    }
  }, [searchParams, setFilters]);

  const updateUrl = useCallback(
    (newFilters: ProductFilterInput) => {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams();

      if (newFilters.keyword) {
        params.set("keyword", newFilters.keyword);
      }
      if (newFilters.minPrice !== undefined && newFilters.minPrice !== null) {
        params.set("minPrice", String(newFilters.minPrice));
      }
      if (newFilters.maxPrice !== undefined && newFilters.maxPrice !== null) {
        params.set("maxPrice", String(newFilters.maxPrice));
      }
      if (newFilters.pageSize && newFilters.pageSize !== 12) {
        params.set("pageSize", String(newFilters.pageSize));
      }
      if (newFilters.pageNumber && newFilters.pageNumber !== 1) {
        params.set("page", String(newFilters.pageNumber));
      }
      if (newFilters.stockStatus) {
        params.set("stockStatus", String(newFilters.stockStatus));
      }
      if (newFilters.categoryId && newFilters.categoryId.length > 0) {
        const validIds = newFilters.categoryId.filter(
          (id): id is number => id !== null && id !== undefined
        );
        if (validIds.length > 0) {
          params.set("categoryId", validIds.join(","));
        }
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      window.history.replaceState(null, "", newUrl);
    },
    [pathname]
  );

  const getShareableUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.keyword) {
      params.set("keyword", filters.keyword);
    }
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      params.set("minPrice", String(filters.minPrice));
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      params.set("maxPrice", String(filters.maxPrice));
    }
    if (filters.pageSize && filters.pageSize !== 12) {
      params.set("pageSize", String(filters.pageSize));
    }
    if (filters.pageNumber && filters.pageNumber !== 1) {
      params.set("page", String(filters.pageNumber));
    }
    if (filters.stockStatus) {
      params.set("stockStatus", String(filters.stockStatus));
    }
    if (filters.categoryId && filters.categoryId.length > 0) {
      const validIds = filters.categoryId.filter(
        (id): id is number => id !== null && id !== undefined
      );
      if (validIds.length > 0) {
        params.set("categoryId", validIds.join(","));
      }
    }

    const queryString = params.toString();
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return queryString
      ? `${baseUrl}${pathname}?${queryString}`
      : `${baseUrl}${pathname}`;
  }, [filters, pathname]);

  const copyShareableUrl = useCallback(async () => {
    const url = getShareableUrl();
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }, [getShareableUrl]);

  return {
    updateUrl,
    getShareableUrl,
    copyShareableUrl,
  };
}
