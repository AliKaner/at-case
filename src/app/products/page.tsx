import { Suspense } from "react";
import ProductsPageContent from "@/features/products/layout/ProductsPageContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
