import cn from "classnames";

import Spinner from "../Spinner";
import styles from "./Button.module.scss";

export type ButtonVariantType = "primary" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  variant?: ButtonVariantType;
  block?: boolean;
  isLoading?: boolean;
}

const Button = ({
  text,
  icon,
  variant,
  block = true,
  isLoading = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        styles.button,
        variant && styles[variant],
        block && styles.block,
        rest.className
      )}
      disabled={rest.disabled || isLoading}
    >
      {(icon || isLoading) && (
        <span className={styles.icon}>
          {isLoading ? <Spinner size="small" color={variant} /> : icon}
        </span>
      )}
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
