import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface CategoryMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRename: () => void;
  onEditNotification: () => void;
  onDelete: () => void;
}

export function CategoryMenuSheet({
  open,
  onOpenChange,
  onRename,
  onEditNotification,
  onDelete,
}: CategoryMenuSheetProps) {
  const { t } = useLanguage();

  const handleAction = (action: () => void) => {
    action();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl" showClose={false}>
        <SheetTitle className="text-left pt-6 pb-0 pl-4 text-2xl">{t("manageCategory")}</SheetTitle>
        <SheetDescription className="sr-only">
          Choose an action for this category
        </SheetDescription>
        <div className="py-4">
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            <button
              onClick={() => handleAction(onRename)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900">Rename Category</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            <button
              onClick={() => handleAction(onEditNotification)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900">Edit Notification Date</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            <button
              onClick={() => handleAction(onDelete)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-red-600">Delete Category</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}