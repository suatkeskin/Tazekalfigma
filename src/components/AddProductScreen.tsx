import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Category, Product } from "../types";
import { getCategoryInfo } from "../utils/categories";
import { ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { CategorySelectSheet } from "./CategorySelectSheet";
import { DatePickerSheet } from "./DatePickerSheet";

interface AddProductScreenProps {
  onAddProduct: (product: Omit<Product, "id" | "addedDate">) => void;
  onBack: () => void;
}

export function AddProductScreen({ onAddProduct, onBack }: AddProductScreenProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("other");
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !expirationDate) return;

    onAddProduct({
      name,
      category,
      expirationDate: expirationDate,
      notes: notes || undefined,
    });

    // Navigate back
    onBack();
  };

  const selectedCategoryInfo = getCategoryInfo(category);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Milk, Face Cream"
                required
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <button
                type="button"
                onClick={() => setIsCategorySheetOpen(true)}
                className="w-full p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedCategoryInfo.icon}</span>
                  <span className="text-gray-900">{selectedCategoryInfo.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiration">Expiration Date</Label>
              <DatePickerSheet
                open={isDatePickerOpen}
                onOpenChange={setIsDatePickerOpen}
                selectedDate={expirationDate}
                onSelectDate={setExpirationDate}
              >
                <button
                  type="button"
                  className="w-full p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <span className={expirationDate ? "text-gray-900" : "text-gray-400"}>
                      {expirationDate ? formatDate(expirationDate) : "Select date"}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </DatePickerSheet>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional information"
                className="bg-white"
              />
            </div>
          </form>
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <Button type="submit" onClick={handleSubmit} className="w-full" disabled={!name || !expirationDate}>
            Add Product
          </Button>
        </div>
      </div>

      <CategorySelectSheet
        open={isCategorySheetOpen}
        onOpenChange={setIsCategorySheetOpen}
        selectedCategory={category}
        onSelectCategory={(cat) => {
          setCategory(cat);
          setIsCategorySheetOpen(false);
        }}
      />
    </>
  );
}