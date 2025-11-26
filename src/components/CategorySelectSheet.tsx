import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Category } from "../types";
import { getCategoryInfo } from "../utils/categories";
import { Search, Check } from "lucide-react";
import { Input } from "./ui/input";

interface CategorySelectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategorySelectSheet({
  open,
  onOpenChange,
  selectedCategory,
  onSelectCategory,
}: CategorySelectSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Category[] = [
    "dairy",
    "meat",
    "bakery",
    "beverages",
    "vegetables",
    "fruits",
    "cosmetics",
    "medicine",
    "other",
  ];

  const filteredCategories = categories.filter((cat) => {
    const info = getCategoryInfo(cat);
    return info.label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0" showClose={false}>
        <SheetHeader className="sr-only">
          <SheetTitle>Select Category</SheetTitle>
          <SheetDescription>Choose a category for your product</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {/* Header with Search */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="mb-3">Select Category</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Category List */}
          <div className="flex-1 overflow-y-auto">
            {filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <p className="text-gray-400">No categories found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredCategories.map((cat) => {
                  const info = getCategoryInfo(cat);
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => onSelectCategory(cat)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{info.icon}</span>
                        <span className="text-gray-900">{info.label}</span>
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-teal-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}