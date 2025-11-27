"use client";

import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";
import ProductDetailError from "@/features/product-detail/components/ProductDetailError";
import { ROUTES } from "@/shared/constants/routes";
import styles from "./page.module.scss";

export default function ProductDetailErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <ProductDetailError error={error} onRetry={reset} />
      <div className={styles.notFoundContainer}>
        <p className={styles.notFoundText}>Product not found</p>
        <Button
          text="Back to Products"
          variant="primary"
          onClick={() => router.push(ROUTES.PRODUCTS)}
          block={false}
        />
      </div>
    </div>
  );
}
