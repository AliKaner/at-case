export const ERROR_MESSAGES = {
  GENERIC: "An unexpected error occurred. Please try again.",
  NETWORK: "Network error. Please check your connection.",
  TIMEOUT: "Request timeout. Please check your connection and try again.",
  RATE_LIMIT: "Too many requests. Please wait a moment and try again.",
  SERVICE_UNAVAILABLE: "Service unavailable. Please try again later.",
  SERVER_ERROR:
    "Server error. We are working on a fix. Please try again later.",
  UNAUTHORIZED: "Authentication failed. Please log in again.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
} as const;
