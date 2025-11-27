import styles from "./Error.module.scss";
import Button from "../Button";

export interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className={styles.error}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.message}>{message}</p>
      <div className={styles.button}>
        {onRetry && (
          <Button text="Try again" variant="primary" onClick={onRetry} />
        )}
      </div>
    </div>
  );
};

export default Error;
