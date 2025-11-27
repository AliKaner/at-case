export interface IGlobalError {
  error: Error & { digest?: string };
  reset: () => void;
}
