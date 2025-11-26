import { Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";

interface GroupBySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const groupByOptions = [
  { id: "none", label: "None (See All)" },
  { id: "category", label: "Category" },
  { id: "expiration", label: "Expiration Date" },
];

export function GroupBySelector({
  open,
  onOpenChange,
  selectedOption,
  onSelectOption,
}: GroupBySelectorProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Group By</DrawerTitle>
          <DrawerDescription>Choose how to group your products</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6">
          <div className="space-y-1">
            {groupByOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelectOption(option.id);
                  onOpenChange(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-gray-50"
              >
                <span className="text-sm">{option.label}</span>
                {selectedOption === option.id && (
                  <Check className="h-5 w-5 text-teal-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}