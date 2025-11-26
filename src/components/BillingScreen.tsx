import { useLanguage } from "../contexts/LanguageContext";
import { Check } from "lucide-react";

export function BillingScreen() {
  const { t } = useLanguage();

  const plans = [
    {
      id: "12months",
      title: "Premium (12 Months)",
      price: "₺2499.99",
      description: "Unlimited scans & product tracking",
    },
    {
      id: "6months",
      title: "Premium (6 Months)",
      price: "₺1499.99",
      description: "Unlimited scans & product tracking",
    },
    {
      id: "3months",
      title: "Premium (3 Months)",
      price: "₺999.99",
      description: "Unlimited scans & product tracking",
    },
    {
      id: "1month",
      title: "Premium (1 Month)",
      price: "₺349.99",
      description: "Unlimited scans & product tracking",
    },
  ];

  const benefits = [
    { id: 1, text: t("unlimitedProductTracking") },
    { id: 2, text: t("unlimitedTeamMembers") },
    { id: 3, text: t("adFreeExperience") },
    { id: 4, text: t("priorityCustomerSupport") },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Free Section */}
      <div className="bg-white px-4 py-6 text-center border-b border-gray-200">
        <h2 className="text-gray-900 mb-2">{t("free")}</h2>
        <p className="text-sm text-gray-500">{t("currentLimit")}</p>
      </div>

      {/* Choose a Plan Section */}
      <div className="px-4 py-6 text-center">
        <h2 className="text-gray-900 mb-3">{t("chooseAPlan")}</h2>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          {t("choosePlanDescription")}
        </p>
      </div>

      {/* Plan Cards */}
      <div className="px-4 pb-6 space-y-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            className="w-full bg-white rounded-2xl border-2 border-gray-200 p-4 hover:border-teal-600 transition-colors text-left"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-gray-900 mb-2">{plan.title}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>
              <div className="text-teal-600 flex-shrink-0">
                {plan.price}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Premium Benefits Section */}
      <div className="px-4 pb-8">
        <h2 className="text-gray-900 mb-6">{t("premiumBenefits")}</h2>
        <div className="space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-3">
              <Check className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-500">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}