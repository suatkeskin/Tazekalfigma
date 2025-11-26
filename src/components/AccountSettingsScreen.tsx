import { ChevronRight, Mail, Phone } from "lucide-react";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { EditFieldDialog } from "./EditFieldDialog";
import { LanguageDrawer } from "./LanguageDrawer";
import { useLanguage } from "../contexts/LanguageContext";

interface AccountSettingsScreenProps {
  onNavigateToDeleteData: () => void;
  onSignOut: () => void;
}

export function AccountSettingsScreen({ onNavigateToDeleteData, onSignOut }: AccountSettingsScreenProps) {
  const { language, t } = useLanguage();
  const [newsUpdates, setNewsUpdates] = useState(false);
  const [name, setName] = useState("Suat Keskin");
  const [phone, setPhone] = useState("+90 532 123 45 67");
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isLanguageDrawerOpen, setIsLanguageDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Name */}
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setIsNameDialogOpen(true)}
          >
            <span className="text-gray-500">{t("name")}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{name}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* Signed in with */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="w-full p-4 flex items-center justify-between">
            <span className="text-gray-500">{t("signedInWith")}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">suatkeskinn@hot...</span>
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Mail className="h-3.5 w-3.5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setIsPhoneDialogOpen(true)}
          >
            <span className="text-gray-500">{t("phone")}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{phone}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* Language */}
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setIsLanguageDrawerOpen(true)}
          >
            <span className="text-gray-500">{t("language")}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{language}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* News & Updates */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="w-full p-4 flex items-center justify-between">
            <span className="text-gray-500">{t("newsUpdates")}</span>
            <Switch
              checked={newsUpdates}
              onCheckedChange={setNewsUpdates}
            />
          </div>
        </div>

        {/* Delete Data */}
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={onNavigateToDeleteData}
          >
            <span className="text-gray-500">{t("deleteData")}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Sign Out */}
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={onSignOut}
          >
            <span className="text-gray-500">{t("signOut")}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Edit Name Dialog */}
      <EditFieldDialog
        open={isNameDialogOpen}
        onOpenChange={setIsNameDialogOpen}
        title={t("changeName")}
        subtitle={t("enterNewName")}
        value={name}
        onSave={setName}
      />

      {/* Edit Phone Dialog */}
      <EditFieldDialog
        open={isPhoneDialogOpen}
        onOpenChange={setIsPhoneDialogOpen}
        title={t("changePhone")}
        subtitle={t("enterNewPhone")}
        value={phone}
        onSave={setPhone}
        type="tel"
      />

      {/* Language Drawer */}
      <LanguageDrawer
        open={isLanguageDrawerOpen}
        onOpenChange={setIsLanguageDrawerOpen}
      />
    </div>
  );
}