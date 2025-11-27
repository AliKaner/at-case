import ErrorDisplay from "@/shared/components/Error";

export interface ProductDetailErrorProps {
  error: unknown;
  onRetry?: () => void;
}

const ProductDetailError = ({ error, onRetry }: ProductDetailErrorProps) => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return <ErrorDisplay message={message} onRetry={onRetry} />;
};

export default ProductDetailError;
