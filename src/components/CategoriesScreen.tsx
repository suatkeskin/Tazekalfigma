import { Plus, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface Category {
  id: string;
  name: string;
  icon: string;
  notificationDays: number;
}

interface CategoriesScreenProps {
  onCategoryMenuOpen: (categoryId: string, categoryName: string, categoryIcon: string, notificationDays: number) => void;
}

export function CategoriesScreen({ onCategoryMenuOpen }: CategoriesScreenProps) {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Dairy", icon: "🥛", notificationDays: 3 },
    { id: "2", name: "Meat", icon: "🥩", notificationDays: 1 },
    { id: "3", name: "Vegetables", icon: "🥬", notificationDays: 5 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        {/* Categories List */}
        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <div
              key={category.id}
              className="py-4 flex items-center gap-3"
            >
              <span className="text-2xl">{category.icon}</span>
              <div className="flex-1">
                <div className="text-gray-900">{category.name}</div>
                <div className="text-sm text-gray-500">
                  {category.notificationDays} {t("daysBeforeExpiration")}
                </div>
              </div>
              <button
                onClick={() => onCategoryMenuOpen(category.id, category.name, category.icon, category.notificationDays)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}