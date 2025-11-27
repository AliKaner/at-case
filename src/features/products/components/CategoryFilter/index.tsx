"use client";

import Select from "@/shared/components/Select";
import type { CategoryDto } from "@/gql/graphql";
import styles from "./CategoryFilter.module.scss";

export interface CategoryFilterProps {
  categories: Array<CategoryDto>;
  value?: number[];
  onChange: (categoryIds: number[] | undefined) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

const CategoryFilter = ({
  categories,
  value,
  onChange,
  label = "Category",
  placeholder = undefined,
  error,
  className,
}: CategoryFilterProps) => {
  const options = [
    { value: "", label: "All Categories" },
    ...categories
      .filter((cat) => cat.id && cat.categoryName)
      .map((cat) => ({
        value: String(cat.id),
        label: cat.categoryName || `Category ${cat.id}`,
      })),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      onChange(undefined);
    } else {
      const categoryId = parseInt(selectedValue, 10);
      if (!isNaN(categoryId)) {
        onChange([categoryId]);
      }
    }
  };

  const selectValue = value && value.length > 0 ? String(value[0]) : "";

  return (
    <Select
      label={label}
      options={options}
      placeholder={placeholder}
      value={selectValue}
      onChange={handleChange}
      error={error}
      className={className}
    />
  );
};

export default CategoryFilter;

