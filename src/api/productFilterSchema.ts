import { z } from "zod";
import type { ProductFilterInput } from "@/gql/graphql";

export const productFilterSchema = z
  .object({
    keyword: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    pageSize: z.string().optional(),
    stockFilter: z.enum(["all", "inStock", "outOfStock"]).optional(),
    categoryId: z.array(z.number()).optional(),
    pageNumber: z.number().optional(),
  })
  .refine(
    (data) => {
      const minPrice = data.minPrice ? Number(data.minPrice) : undefined;
      const maxPrice = data.maxPrice ? Number(data.maxPrice) : undefined;
      if (
        minPrice &&
        maxPrice &&
        !Number.isNaN(minPrice) &&
        !Number.isNaN(maxPrice)
      ) {
        return minPrice <= maxPrice;
      }
      return true;
    },
    {
      message: "Min price must be less than or equal to max price",
      path: ["maxPrice"],
    }
  );

export type ProductFilterFormValues = z.infer<typeof productFilterSchema>;

export function convertFormValuesToFilterInput(
  values: ProductFilterFormValues
): ProductFilterInput {
  let stockStatus: number | undefined;

  if (values.stockFilter === "inStock") {
    stockStatus = -1;
  } else if (values.stockFilter === "outOfStock") {
    stockStatus = 3;
  }

  const minPriceStr = values.minPrice?.trim() || "";
  const maxPriceStr = values.maxPrice?.trim() || "";
  const pageSize = values.pageSize ? Number(values.pageSize) : undefined;

  const minPrice = minPriceStr ? Number(minPriceStr) : undefined;
  const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined;

  const filters: ProductFilterInput = {
    keyword: values.keyword?.trim() || undefined,
    minPrice:
      minPrice !== undefined && !Number.isNaN(minPrice) && minPrice >= 0
        ? minPrice
        : undefined,
    maxPrice:
      maxPrice !== undefined && !Number.isNaN(maxPrice) && maxPrice >= 0
        ? maxPrice
        : undefined,
    pageSize:
      pageSize && !Number.isNaN(pageSize) && pageSize > 0
        ? pageSize
        : undefined,
    stockStatus,
    categoryId:
      values.categoryId && values.categoryId.length > 0
        ? values.categoryId
        : undefined,
    pageNumber: values.pageNumber || 1,
  };

  return filters;
}
