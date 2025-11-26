import { createContext, useContext, useState, ReactNode } from "react";

type Language = "English" | "Türkçe";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  English: {
    // Account Settings
    accountSettings: "Account Settings",
    name: "Name",
    signedInWith: "Signed in with",
    phone: "Phone",
    language: "Language",
    newsUpdates: "News & Updates",
    deleteData: "Delete Data",
    signOut: "Sign Out",
    
    // Dialogs
    changeName: "Change Name",
    enterNewName: "Enter a new name.",
    changePhone: "Change Phone",
    enterNewPhone: "Enter a new phone number.",
    changeTeamName: "Change Team Name",
    enterNewTeamName: "Enter a new team name.",
    cancel: "Cancel",
    ok: "OK",
    
    // Language Drawer
    selectLanguage: "Select Language",
    chooseLanguage: "Choose your preferred language",
    
    // Delete Data
    deleteAccount: "Delete Account",
    deleteAccountDescription: "Your Tazekal account and all related data will be permanently deleted. This action can't be undone.",
    delete: "Delete",
    
    // Plan (formerly Billing)
    plan: "Plan",
    free: "Free",
    currentLimit: "Current Limit: 4/50 Products",
    chooseAPlan: "Choose a plan",
    choosePlanDescription: "When one member upgrades, the entire team has access to Premium.",
    premiumBenefits: "Premium Benefits",
    unlimitedProductTracking: "Unlimited product tracking",
    unlimitedTeamMembers: "Unlimited team members",
    adFreeExperience: "Ad-free experience",
    priorityCustomerSupport: "Priority customer support",
    
    // Category Menu
    manageCategory: "Manage Category",
    categorySettings: "Category Settings",
    daysBeforeExpiration: "days before expiration",
    
    // Onboarding
    skip: "Skip",
    next: "Next",
    getStarted: "Get Started",
    onboardingTitle1: "Track Expiration Dates",
    onboardingDesc1: "Never let food go to waste. Keep track of all your products' expiration dates in one place.",
    onboardingTitle2: "Smart Color Coding",
    onboardingDesc2: "Instantly see what needs attention with our intuitive color system: Red (≤3 days), Orange (4-7 days), Yellow (this month), Green (later).",
    onboardingTitle3: "Collaborate with Teams",
    onboardingDesc3: "Share your inventory with family, roommates, or colleagues. Work together to reduce waste.",
    onboardingTitle4: "Stay Organized",
    onboardingDesc4: "Categorize products, get notifications, and manage everything from a beautiful, easy-to-use dashboard.",
    
    // Login
    welcomeBack: "Welcome Back",
    loginSubtitle: "Sign in to continue to Tazekal",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up",
  },
  Türkçe: {
    // Account Settings
    accountSettings: "Hesap Ayarları",
    name: "İsim",
    signedInWith: "Giriş Yapılan",
    phone: "Telefon",
    language: "Dil",
    newsUpdates: "Haberler & Güncellemeler",
    deleteData: "Verileri Sil",
    signOut: "Çıkış Yap",
    
    // Dialogs
    changeName: "İsim Değiştir",
    enterNewName: "Yeni bir isim girin.",
    changePhone: "Telefon Değiştir",
    enterNewPhone: "Yeni bir telefon numarası girin.",
    changeTeamName: "Takım Adını Değiştir",
    enterNewTeamName: "Yeni bir takım adı girin.",
    cancel: "İptal",
    ok: "Tamam",
    
    // Language Drawer
    selectLanguage: "Dil Seçin",
    chooseLanguage: "Tercih ettiğiniz dili seçin",
    
    // Delete Data
    deleteAccount: "Hesabı Sil",
    deleteAccountDescription: "Tazekal hesabınız ve tüm ilgili veriler kalıcı olarak silinecektir. Bu işlem geri alınamaz.",
    delete: "Sil",
    
    // Plan (formerly Billing)
    plan: "Plan",
    free: "Ücretsiz",
    currentLimit: "Mevcut Limit: 4/50 Ürün",
    chooseAPlan: "Bir plan seçin",
    choosePlanDescription: "Bir üye yükseltme yaptığında, tüm takımın Premium erişimi olur.",
    premiumBenefits: "Premium Avantajlar",
    unlimitedProductTracking: "Sınırsız ürün takibi",
    unlimitedTeamMembers: "Sınırsız takım üyeleri",
    adFreeExperience: "Reklamsız deneyim",
    priorityCustomerSupport: "Öncelikli müşteri desteği",
    
    // Category Menu
    manageCategory: "Kategoriyi Yönet",
    categorySettings: "Kategori Ayarları",
    daysBeforeExpiration: "gün önce bildirim",
    
    // Onboarding
    skip: "Atla",
    next: "İleri",
    getStarted: "Başlayalım",
    onboardingTitle1: "Son Kullanma Tarihlerini Takip Edin",
    onboardingDesc1: "Hiçbir şeyi ziyan etmeyin. Tüm ürünlerinizin son kullanma tarihlerini tek bir yerde takip edin.",
    onboardingTitle2: "Akıllı Renk Kodlama",
    onboardingDesc2: "Sezgisel renk sistemimizle dikkat gerektirenleri anında görün: Kırmızı (≤3 gün), Turuncu (4-7 gün), Sarı (bu ay), Yeşil (sonra).",
    onboardingTitle3: "Takımlarla İşbirliği Yapın",
    onboardingDesc3: "Envanterinizi aileniz, ev arkadaşlarınız veya iş arkadaşlarınızla paylaşın. İsrafı azaltmak için birlikte çalışın.",
    onboardingTitle4: "Organize Kalın",
    onboardingDesc4: "Ürünleri kategorize edin, bildirimler alın ve her şeyi güzel ve kullanımı kolay bir kontrol panelinden yönetin.",
    
    // Login
    welcomeBack: "Tekrar Hoş Geldiniz",
    loginSubtitle: "Tazekal'a devam etmek için giriş yapın",
    email: "E-posta",
    password: "Şifre",
    signIn: "Giriş Yap",
    dontHaveAccount: "Hesabınız yok mu?",
    signUp: "Kayıt Ol",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("English");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.English] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}