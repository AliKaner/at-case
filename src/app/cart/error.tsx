"use client";

import { IGlobalError } from "@/shared/types/error";
import Error from "@/shared/components/Error/index";
import { ERROR_MESSAGES } from "@/shared/constants/error.messages";

const CartError = (props: IGlobalError) => {
  const { error, reset } = props;
  return (
    <Error message={error.message || ERROR_MESSAGES.GENERIC} onRetry={reset} />
  );
};

export default CartError;
