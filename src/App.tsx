import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { ProductsScreen } from "./components/ProductsScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { FilterScreen } from "./components/FilterScreen";
import { NotificationsScreen } from "./components/NotificationsScreen";
import { TimeZoneScreen } from "./components/TimeZoneScreen";
import { AccountSettingsScreen } from "./components/AccountSettingsScreen";
import { DeleteDataScreen } from "./components/DeleteDataScreen";
import { BillingScreen } from "./components/BillingScreen";
import { CategoriesScreen } from "./components/CategoriesScreen";
import { MembersScreen } from "./components/MembersScreen";
import { InviteMembersScreen } from "./components/InviteMembersScreen";
import { TeamListScreen } from "./components/TeamListScreen";
import { NewTeamScreen } from "./components/NewTeamScreen";
import { UserGuideScreen } from "./components/UserGuideScreen";
import { AddProductScreen } from "./components/AddProductScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { LoginScreen } from "./components/LoginScreen";
import { CreateTeamDialog } from "./components/CreateTeamDialog";
import { JoinTeamDialog } from "./components/JoinTeamDialog";
import { CategoryMenuSheet } from "./components/CategoryMenuSheet";
import { DeleteCategoryDialog } from "./components/DeleteCategoryDialog";
import { teams } from "./data/teams";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { DashboardScreen } from "./components/DashboardScreen";
import { EditFieldDialog } from "./components/EditFieldDialog";
import { Team } from "./types/team";
import { Product } from "./types/product";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [groupBy, setGroupBy] = useState("none");
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState("");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isRenameCategoryOpen, setIsRenameCategoryOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [isEditNotificationOpen, setIsEditNotificationOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [notificationDays, setNotificationDays] = useState("3");
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isJoinTeamOpen, setIsJoinTeamOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Milk",
      category: "dairy",
      expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      addedDate: new Date(),
    },
    {
      id: "2",
      name: "Fresh Chicken Breast",
      category: "meat",
      expirationDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
      addedDate: new Date(),
    },
    {
      id: "3",
      name: "Face Cream",
      category: "cosmetics",
      expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      addedDate: new Date(),
    },
    {
      id: "4",
      name: "Greek Yogurt",
      category: "dairy",
      expirationDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days
      addedDate: new Date(),
    },
    {
      id: "5",
      name: "Vitamin C Tablets",
      category: "medicine",
      expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      addedDate: new Date(),
    },
    {
      id: "6",
      name: "Whole Wheat Bread",
      category: "bakery",
      expirationDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days
      addedDate: new Date(),
    },
    {
      id: "7",
      name: "Orange Juice",
      category: "beverages",
      expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      addedDate: new Date(),
    },
    {
      id: "8",
      name: "Shampoo",
      category: "cosmetics",
      expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
      addedDate: new Date(),
    },
  ]);

  const addProduct = (product: Omit<Product, "id" | "addedDate">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      addedDate: new Date(),
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleBackFromScreen = () => {
    if (currentScreen === "filter") {
      setCurrentScreen("products");
    } else if (currentScreen === "addProduct") {
      setCurrentScreen("products");
    } else if (currentScreen === "notifications") {
      setCurrentScreen("settings");
    } else if (currentScreen === "timezone") {
      setCurrentScreen("settings");
    } else if (currentScreen === "account") {
      setCurrentScreen("settings");
    } else if (currentScreen === "deleteData") {
      setCurrentScreen("account");
    } else if (currentScreen === "billing") {
      setCurrentScreen("settings");
    } else if (currentScreen === "categories") {
      setCurrentScreen("settings");
    } else if (currentScreen === "members") {
      setCurrentScreen("settings");
    } else if (currentScreen === "inviteMembers") {
      setCurrentScreen("members");
    } else if (currentScreen === "teamList") {
      setCurrentScreen("settings");
    } else if (currentScreen === "newTeam") {
      setCurrentScreen("teamList");
    } else if (currentScreen === "userGuide") {
      setCurrentScreen("settings");
    }
  };

  const handleCategoryMenuOpen = (categoryId: string, categoryName: string, categoryIcon: string, notificationDays: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setSelectedCategoryIcon(categoryIcon);
    setCategoryName(categoryName);
    setNotificationDays(notificationDays.toString());
    setIsCategoryMenuOpen(true);
  };

  const handleRenameCategoryAction = () => {
    setIsRenameCategoryOpen(true);
  };

  const handleEditNotificationAction = () => {
    setIsEditNotificationOpen(true);
  };

  const handleDeleteCategoryAction = () => {
    setIsDeleteCategoryOpen(true);
  };

  const handleConfirmDeleteCategory = () => {
    // Delete all products in this category
    const categoryLower = selectedCategoryName.toLowerCase();
    setProducts(products.filter((p) => p.category !== categoryLower));
    console.log("Category deleted:", selectedCategoryName);
    setIsDeleteCategoryOpen(false);
    // TODO: Remove category from categories list
  };

  const getCategoryProductCount = () => {
    const categoryLower = selectedCategoryName.toLowerCase();
    return products.filter((p) => p.category === categoryLower).length;
  };

  const handleSaveCategoryName = (newName: string) => {
    setSelectedCategoryName(newName);
    setCategoryName(newName);
    console.log("Category renamed to:", newName);
  };

  const handleAddCategory = () => {
    setCategoryName("");
    setIsAddCategoryOpen(true);
  };

  const handleSaveNewCategory = (newName: string) => {
    console.log("New category added:", newName);
    // TODO: Add new category to list
  };

  const handleSaveNotificationDays = (days: string) => {
    setNotificationDays(days);
    console.log("Notification days updated to:", days, "for category:", selectedCategoryName);
    // TODO: Update category notification days in list
  };

  const handleClearFilters = () => {
    // Clear all filters logic
    console.log("Clear filters");
  };

  const handleDeleteAccount = () => {
    // Delete account logic
    console.log("Delete account");
    // Could navigate to login screen or show confirmation
  };

  const handleNavigateToNotifications = () => {
    setCurrentScreen("notifications");
  };

  const handleNavigateToTimeZone = () => {
    setCurrentScreen("timezone");
  };

  const handleNavigateToBilling = () => {
    setCurrentScreen("billing");
  };

  const handleNavigateToCategories = () => {
    setCurrentScreen("categories");
  };

  const handleNavigateToMembers = () => {
    setCurrentScreen("members");
  };

  const handleNavigateToYourTeams = () => {
    setCurrentScreen("teamList");
  };

  const handleNavigateToCreateNewTeam = () => {
    setCurrentScreen("newTeam");
  };

  const handleCreateTeam = () => {
    setIsCreateTeamOpen(true);
  };

  const handleJoinTeam = () => {
    setIsJoinTeamOpen(true);
  };

  const handleCreateTeamSubmit = (teamName: string) => {
    console.log("Creating team:", teamName);
    // TODO: Implement team creation
  };

  const handleJoinTeamSubmit = (inviteCode: string) => {
    console.log("Joining team with code:", inviteCode);
    // TODO: Implement team joining
  };

  const handleSelectTeamFromList = (team: Team) => {
    setSelectedTeam(team);
    setCurrentScreen("settings");
  };

  const handleMemberClick = (member: Member) => {
    // Handle member click logic
    console.log("Member clicked:", member);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentScreen("dashboard"); // Reset to dashboard for next login
  };

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return (
      <LanguageProvider>
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </LanguageProvider>
    );
  }

  // Show login if onboarding completed but not logged in
  if (!isLoggedIn) {
    return (
      <LanguageProvider>
        <LoginScreen onLogin={handleLogin} />
      </LanguageProvider>
    );
  }

  // Show main app if logged in
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative">
          <Header 
            currentScreen={currentScreen}
            selectedTeam={selectedTeam}
            teams={teams}
            onTeamChange={setSelectedTeam}
            onBack={handleBackFromScreen}
            groupBy={groupBy}
            onGroupByChange={setGroupBy}
            onClearFilters={handleClearFilters}
            onNavigateToFilter={() => setCurrentScreen("filter")}
            onNavigateToAccount={() => setCurrentScreen("account")}
            onMenuOpen={() => setIsCategoryMenuOpen(true)}
            categoryName={selectedCategoryName}
            onNavigateToInviteMembers={() => setCurrentScreen("inviteMembers")}
            onAddCategory={handleAddCategory}
            onNavigateToNewTeam={handleNavigateToCreateNewTeam}
          />
          
          <main className={`flex-1 overflow-y-auto ${currentScreen !== "filter" && currentScreen !== "notifications" && currentScreen !== "timezone" && currentScreen !== "account" && currentScreen !== "deleteData" && currentScreen !== "billing" && currentScreen !== "categories" && currentScreen !== "members" && currentScreen !== "inviteMembers" && currentScreen !== "teamList" && currentScreen !== "newTeam" && currentScreen !== "userGuide" && currentScreen !== "addProduct" ? "pb-16" : ""}`}>
            {currentScreen === "dashboard" && (
              <DashboardScreen
                products={products}
                onAddProduct={() => setCurrentScreen("addProduct")}
                onAddTeamMember={() => setCurrentScreen("inviteMembers")}
                onViewProducts={() => setCurrentScreen("products")}
              />
            )}
            {currentScreen === "products" && (
              <HomeScreen 
                products={products} 
                onDeleteProduct={deleteProduct}
                groupBy={groupBy}
                onAddProduct={() => setCurrentScreen("addProduct")}
              />
            )}
            {currentScreen === "settings" && <SettingsScreen 
              selectedTeam={selectedTeam}
              onNavigateToNotifications={handleNavigateToNotifications}
              onNavigateToTimeZone={handleNavigateToTimeZone}
              onNavigateToBilling={handleNavigateToBilling}
              onNavigateToCategories={handleNavigateToCategories}
              onNavigateToMembers={handleNavigateToMembers}
              onNavigateToYourTeams={handleNavigateToYourTeams}
              onNavigateToCreateNewTeam={handleNavigateToCreateNewTeam}
              onNavigateToUserGuide={() => setCurrentScreen("userGuide")}
            />}
            {currentScreen === "filter" && (
              <FilterScreen onApply={() => setCurrentScreen("products")} />
            )}
            {currentScreen === "notifications" && (
              <NotificationsScreen />
            )}
            {currentScreen === "timezone" && (
              <TimeZoneScreen />
            )}
            {currentScreen === "account" && (
              <AccountSettingsScreen onNavigateToDeleteData={() => setCurrentScreen("deleteData")} onSignOut={handleSignOut} />
            )}
            {currentScreen === "deleteData" && (
              <DeleteDataScreen onDelete={handleDeleteAccount} />
            )}
            {currentScreen === "billing" && (
              <BillingScreen />
            )}
            {currentScreen === "categories" && (
              <CategoriesScreen onCategoryMenuOpen={handleCategoryMenuOpen} />
            )}
            {currentScreen === "members" && (
              <MembersScreen />
            )}
            {currentScreen === "inviteMembers" && (
              <InviteMembersScreen />
            )}
            {currentScreen === "teamList" && (
              <TeamListScreen 
                teams={teams}
                selectedTeam={selectedTeam}
                onSelectTeam={handleSelectTeamFromList}
              />
            )}
            {currentScreen === "newTeam" && (
              <NewTeamScreen 
                onCreateTeam={handleCreateTeam}
                onJoinTeam={handleJoinTeam}
              />
            )}
            {currentScreen === "userGuide" && (
              <UserGuideScreen />
            )}
            {currentScreen === "addProduct" && (
              <AddProductScreen
                onAddProduct={addProduct}
                onBack={() => setCurrentScreen("products")}
              />
            )}
          </main>

          {currentScreen !== "filter" && currentScreen !== "notifications" && currentScreen !== "timezone" && currentScreen !== "account" && currentScreen !== "deleteData" && currentScreen !== "billing" && currentScreen !== "categories" && currentScreen !== "members" && currentScreen !== "inviteMembers" && currentScreen !== "teamList" && currentScreen !== "newTeam" && currentScreen !== "userGuide" && currentScreen !== "addProduct" && (
            <BottomNav 
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
            />
          )}
          
          <CategoryMenuSheet
            open={isCategoryMenuOpen}
            onOpenChange={setIsCategoryMenuOpen}
            onRename={handleRenameCategoryAction}
            onEditNotification={handleEditNotificationAction}
            onDelete={handleDeleteCategoryAction}
          />
          <EditFieldDialog
            open={isRenameCategoryOpen}
            onOpenChange={setIsRenameCategoryOpen}
            title="Rename Category"
            subtitle="Enter a new category name."
            value={categoryName}
            onSave={handleSaveCategoryName}
            type="text"
          />
          <EditFieldDialog
            open={isAddCategoryOpen}
            onOpenChange={setIsAddCategoryOpen}
            title="Add Category"
            subtitle="Enter a category name."
            value={categoryName}
            onSave={handleSaveNewCategory}
            type="text"
          />
          <EditFieldDialog
            open={isEditNotificationOpen}
            onOpenChange={setIsEditNotificationOpen}
            title="Edit Notification Date"
            subtitle="Enter days before expiration."
            value={notificationDays}
            onSave={handleSaveNotificationDays}
            type="number"
          />
          <DeleteCategoryDialog
            open={isDeleteCategoryOpen}
            onOpenChange={setIsDeleteCategoryOpen}
            categoryName={selectedCategoryName}
            productCount={getCategoryProductCount()}
            onConfirm={handleConfirmDeleteCategory}
          />
          <CreateTeamDialog
            open={isCreateTeamOpen}
            onOpenChange={setIsCreateTeamOpen}
            onSubmit={handleCreateTeamSubmit}
          />
          <JoinTeamDialog
            open={isJoinTeamOpen}
            onOpenChange={setIsJoinTeamOpen}
            onSubmit={handleJoinTeamSubmit}
          />
        </div>
      </div>
    </LanguageProvider>
  );
}