import { useLanguage } from "../contexts/LanguageContext";

interface DeleteDataScreenProps {
  onDelete: () => void;
}

export function DeleteDataScreen({ onDelete }: DeleteDataScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">{t("deleteAccount")}</h2>
              <p className="text-sm text-gray-500">
                {t("deleteAccountDescription")}
              </p>
            </div>
            <button
              onClick={onDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex-shrink-0"
            >
              {t("delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
