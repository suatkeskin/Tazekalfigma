import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";

interface DatePickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  children: React.ReactNode;
}

export function DatePickerSheet({
  open,
  onOpenChange,
  selectedDate,
  onSelectDate,
  children,
}: DatePickerSheetProps) {
  const handleSelect = (date: Date | undefined) => {
    onSelectDate(date);
    if (date) {
      onOpenChange(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
        />
        <div className="p-2 border-t border-gray-200 flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onSelectDate(undefined);
              onOpenChange(false);
            }}
            className="flex-1"
            size="sm"
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}