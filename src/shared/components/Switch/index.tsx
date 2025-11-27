"use client";

import { useId } from "react";
import cn from "classnames";
import styles from "./Switch.module.scss";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const Switch = ({ label, error, className, id, ...rest }: SwitchProps) => {
  const generatedId = useId();
  const switchId = id || generatedId;

  return (
    <div className={styles.wrapper}>
      <div className={styles.switchContainer}>
        <input
          type="checkbox"
          id={switchId}
          className={cn(styles.switch, error && styles.error, className)}
          {...rest}
        />
        {label && (
          <label htmlFor={switchId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Switch;


