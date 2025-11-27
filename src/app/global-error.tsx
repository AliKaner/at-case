"use client";

import { ERROR_MESSAGES } from "@/shared/constants/error.messages";
import { IGlobalError } from "@/shared/types/error";
import Error from "@/shared/components/Error";
import "@/styles/globals.scss";

const GlobalError = (props: IGlobalError) => {
  const { error, reset } = props;
  return (
    <html lang="en">
      <body>
        <Error
          message={error.message || ERROR_MESSAGES.GENERIC}
          onRetry={reset}
        />
      </body>
    </html>
  );
};

export default GlobalError;
