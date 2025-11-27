import cn from "classnames";
import styles from "./Card.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "outlined";
  hover?: boolean;
}

const Card = ({
  children,
  variant = "default",
  hover = false,
  className,
  ...rest
}: CardProps) => {
  return (
    <div
      className={cn(
        styles.card,
        styles[variant],
        hover && styles.hover,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;


