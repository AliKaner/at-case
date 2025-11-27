import cn from "classnames";

import styles from "./Spinner.module.scss";

export type SpinnerSizeType = "small" | "medium" | "large";
export type SpinnerColorType = "primary" | "secondary";

export interface SpinnerProps {
  size?: SpinnerSizeType;
  color?: SpinnerColorType;
  className?: string;
}

const Spinner = ({
  size = "medium",
  color = "primary",
  className,
}: SpinnerProps) => {
  return (
    <div className={cn(styles.spinner, styles[size], styles[color], className)}>
      <div className={styles.circle}></div>
    </div>
  );
};

export default Spinner;
