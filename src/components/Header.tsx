import { ChevronDown, ChevronLeft, Filter, X, User, Menu, Plus } from "lucide-react";
import { Team } from "../types/team";
import { TeamSelector } from "./TeamSelector";
import { GroupBySelector } from "./GroupBySelector";
import { useState } from "react";

interface HeaderProps {
  currentScreen: string;
  selectedTeam: Team;
  teams: Team[];
  onTeamChange: (team: Team) => void;
  onBack?: () => void;
  groupBy?: string;
  onGroupByChange?: (groupBy: string) => void;
  onClearFilters?: () => void;
  onNavigateToFilter?: () => void;
  onNavigateToAccount?: () => void;
  onMenuOpen?: () => void;
  categoryName?: string;
  onNavigateToInviteMembers?: () => void;
  onAddCategory?: () => void;
  onNavigateToNewTeam?: () => void;
}

export function Header({ 
  currentScreen, 
  selectedTeam, 
  teams, 
  onTeamChange, 
  onBack,
  groupBy = "none",
  onGroupByChange,
  onClearFilters,
  onNavigateToFilter,
  onNavigateToAccount,
  onMenuOpen,
  categoryName,
  onNavigateToInviteMembers,
  onAddCategory,
  onNavigateToNewTeam
}: HeaderProps) {
  const [isTeamSelectorOpen, setIsTeamSelectorOpen] = useState(false);
  const [isGroupBySelectorOpen, setIsGroupBySelectorOpen] = useState(false);

  const getTitle = () => {
    switch (currentScreen) {
      case "dashboard":
        return "Dashboard";
      case "products":
        return "Products";
      case "categories":
        return "Category Settings";
      case "categoryDetail":
        return categoryName || "Category";
      case "search":
        return "Search";
      case "settings":
        return "Settings";
      case "notifications":
        return "Notifications";
      case "timezone":
        return "Time Zone";
      case "account":
        return "Account Settings";
      case "deleteData":
        return "Delete Data";
      case "billing":
        return "Plan";
      case "members":
        return "Members";
      case "inviteMembers":
        return "Invite Members";
      case "teamList":
        return "Your Teams";
      case "newTeam":
        return "New Team";
      case "userGuide":
        return "User Guide";
      case "addProduct":
        return "New Product";
      default:
        return "Tazekal";
    }
  };

  const getGroupByLabel = () => {
    switch (groupBy) {
      case "category":
        return "Category";
      case "expiration":
        return "Expiration Date";
      default:
        return "Group By";
    }
  };

  // Products page has special layout
  if (currentScreen === "products") {
    return (
      <>
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Empty space for balance */}
            <div className="w-10"></div>

            {/* Center: Group By Dropdown */}
            <button 
              onClick={() => setIsGroupBySelectorOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span className="text-sm">{getGroupByLabel()}</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>

            {/* Right: Filter Button */}
            <button 
              onClick={onNavigateToFilter}
              className="flex items-center justify-center w-10 h-10"
            >
              <Filter className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </header>

        <GroupBySelector
          open={isGroupBySelectorOpen}
          onOpenChange={setIsGroupBySelectorOpen}
          selectedOption={groupBy}
          onSelectOption={(option) => onGroupByChange?.(option)}
        />
      </>
    );
  }

  // Filter page layout
  if (currentScreen === "filter") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
          <h1>Filter</h1>
          <button
            onClick={onClearFilters}
            className="text-teal-600"
          >
            Clear
          </button>
        </div>
      </header>
    );
  }

  // Notifications and Timezone pages layout
  if (currentScreen === "notifications" || currentScreen === "timezone") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">{getTitle()}</h1>
          <div className="w-10"></div>
        </div>
      </header>
    );
  }

  // Settings page layout
  if (currentScreen === "settings") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="mx-auto">Settings</h1>
          <button
            onClick={onNavigateToAccount}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <User className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </header>
    );
  }

  // Account Settings page layout
  if (currentScreen === "account") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">Account Settings</h1>
          <div className="w-10"></div>
        </div>
      </header>
    );
  }

  // Delete Data page layout
  if (currentScreen === "deleteData") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">Delete Data</h1>
          <div className="w-10"></div>
        </div>
      </header>
    );
  }

  // Billing page layout
  if (currentScreen === "billing") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">Plan</h1>
          <div className="w-10"></div>
        </div>
      </header>
    );
  }

  // Members page layout
  if (currentScreen === "members") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">Members</h1>
          <button 
            onClick={onNavigateToInviteMembers}
            className="flex items-center justify-center w-10 h-10"
          >
            <Plus className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </header>
    );
  }

  // Team List page layout
  if (currentScreen === "teamList") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">Your Teams</h1>
          <button 
            onClick={onNavigateToNewTeam}
            className="flex items-center justify-center w-10 h-10"
          >
            <Plus className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </header>
    );
  }

  // Categories page layout
  if (currentScreen === "categories") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">Category Settings</h1>
          <button 
            onClick={onAddCategory}
            className="flex items-center justify-center w-10 h-10"
          >
            <Plus className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </header>
    );
  }

  // User Guide page layout
  if (currentScreen === "userGuide") {
    return (
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between relative">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2">User Guide</h1>
          <div className="w-10"></div>
        </div>
      </header>
    );
  }

  // Dashboard page - show team selector
  if (currentScreen === "dashboard") {
    return (
      <>
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsTeamSelectorOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span className="text-sm">{selectedTeam.name}</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </header>

        <TeamSelector
          open={isTeamSelectorOpen}
          onOpenChange={setIsTeamSelectorOpen}
          teams={teams}
          selectedTeam={selectedTeam}
          onSelectTeam={onTeamChange}
          onNavigateToNewTeam={onNavigateToNewTeam}
        />
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center justify-center w-10 h-10"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
            )}
            {!onBack && (
              <button
                onClick={() => setIsTeamSelectorOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span className="text-sm">{selectedTeam.name}</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
          {onBack && (
            <h1 className="absolute left-1/2 transform -translate-x-1/2">{getTitle()}</h1>
          )}
        </div>
      </header>

      <TeamSelector
        open={isTeamSelectorOpen}
        onOpenChange={setIsTeamSelectorOpen}
        teams={teams}
        selectedTeam={selectedTeam}
        onSelectTeam={onTeamChange}
        onNavigateToNewTeam={onNavigateToNewTeam}
      />
    </>
  );
}