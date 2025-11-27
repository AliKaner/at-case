export const formatPrice = (
  price: unknown,
  currency?: string | null
): string => {
  if (typeof price === "number") {
    return `${price.toFixed(2)} ${currency || "TRY"}`;
  }

  return "N/A";
};




