"use client";

import cn from "classnames";
import styles from "./SegmentedControl.module.scss";

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SegmentedControl = ({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) => {
  return (
    <div className={cn(styles.segmentedControl, className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(styles.option, {
            [styles.selected]: value === option.value,
          })}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;



