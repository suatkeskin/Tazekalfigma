import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface EditFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle: string;
  value: string;
  onSave: (value: string) => void;
  type?: string;
}

export function EditFieldDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  value,
  onSave,
  type = "text"
}: EditFieldDialogProps) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (open) {
      setInputValue(value);
    }
  }, [open, value]);

  const handleSave = () => {
    onSave(inputValue);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-sm mx-auto rounded-2xl p-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <DialogTitle className="text-xl text-left">{title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 text-left">{subtitle}</DialogDescription>
          </div>

          <div className="pt-4">
            <input
              type={type}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-0 py-2 text-left bg-transparent border-0 border-b-2 border-teal-600 focus:outline-none focus:border-teal-600 text-gray-900"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-center"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-center"
            >
              {t("ok")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}