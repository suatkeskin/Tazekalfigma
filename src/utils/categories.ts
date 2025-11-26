import { Category, CategoryInfo } from "../types";

export const getCategoryInfo = (category: Category): CategoryInfo => {
  const categoryMap: Record<Category, Omit<CategoryInfo, "id">> = {
    dairy: { label: "Dairy", icon: "🥛" },
    meat: { label: "Meat", icon: "🥩" },
    bakery: { label: "Bakery", icon: "🍞" },
    beverages: { label: "Beverages", icon: "🧃" },
    vegetables: { label: "Vegetables", icon: "🥬" },
    fruits: { label: "Fruits", icon: "🍎" },
    cosmetics: { label: "Cosmetics", icon: "💄" },
    medicine: { label: "Medicine", icon: "💊" },
    other: { label: "Other", icon: "📦" },
  };

  return {
    id: category,
    ...categoryMap[category],
  };
};
