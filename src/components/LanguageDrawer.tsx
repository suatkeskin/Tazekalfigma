import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";
import { Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface LanguageDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "tr", name: "Türkçe" },
];

export function LanguageDrawer({
  open,
  onOpenChange,
}: LanguageDrawerProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleSelect = (lang: "English" | "Türkçe") => {
    setLanguage(lang);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[80vh]">
        <div className="px-4 py-6">
          <DrawerTitle className="text-center text-xl mb-1">
            {t("selectLanguage")}
          </DrawerTitle>
          <DrawerDescription className="text-center text-sm text-gray-500 mb-6">
            {t("chooseLanguage")}
          </DrawerDescription>

          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.name as "English" | "Türkçe")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">{lang.name}</span>
                {language === lang.name && (
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