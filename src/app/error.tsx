"use client";

import Error from "@/shared/components/Error";
import { IGlobalError } from "@/shared/types/error";
import { ERROR_MESSAGES } from "@/shared/constants/error.messages";

const ErrorPage = (props: IGlobalError) => {
  const { error, reset } = props;
  return (
    <Error message={error.message || ERROR_MESSAGES.GENERIC} onRetry={reset} />
  );
};

export default ErrorPage;
