import { ChevronRight, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Team } from "../types/team";
import { useState } from "react";
import { EditFieldDialog } from "./EditFieldDialog";
import { useLanguage } from "../contexts/LanguageContext";

interface SettingsScreenProps {
  selectedTeam: Team;
  onNavigateToNotifications: () => void;
  onNavigateToTimeZone: () => void;
  onNavigateToBilling: () => void;
  onNavigateToCategories: () => void;
  onNavigateToMembers: () => void;
  onNavigateToYourTeams: () => void;
  onNavigateToCreateNewTeam: () => void;
  onNavigateToUserGuide?: () => void;
}

export function SettingsScreen({ selectedTeam, onNavigateToNotifications, onNavigateToTimeZone, onNavigateToBilling, onNavigateToCategories, onNavigateToMembers, onNavigateToYourTeams, onNavigateToCreateNewTeam, onNavigateToUserGuide }: SettingsScreenProps) {
  const { t } = useLanguage();
  const [teamName, setTeamName] = useState(selectedTeam.name);
  const [isEditTeamNameOpen, setIsEditTeamNameOpen] = useState(false);

  return (
    <div className="space-y-0">
      {/* Team Info Section */}
      <div className="bg-white p-6 space-y-6">
        {/* Team Header */}
        <div className="flex items-start gap-4">
          {/* Team Icon */}
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          
          {/* Team Name and Badge */}
          <div className="flex-1 pt-2">
            <div className="flex items-center gap-2 mb-2">
              <h2>{teamName}</h2>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                Free
              </Badge>
            </div>
            <p className="text-gray-400 text-sm">
              8/100 items • 1/1 members
            </p>
          </div>
        </div>

        {/* Upgrade Plan Button */}
        <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={onNavigateToBilling}>
          Upgrade Plan
        </Button>
      </div>

      {/* Rest of settings sections */}
      <div className="p-4 space-y-6">
        {/* Account Settings */}
        <div className="space-y-3">
          <h2 className="text-sm text-gray-400 px-2">Account Settings</h2>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            <button 
              onClick={onNavigateToNotifications}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Notifications</span>
              <span className="text-gray-500">12 PM, 6 PM</span>
            </button>
          </div>
        </div>

        {/* Team Settings */}
        <div className="space-y-3">
          <h2 className="text-sm text-gray-400 px-2">Team Settings</h2>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            <button 
              onClick={() => setIsEditTeamNameOpen(true)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Team Name</span>
              <span className="text-gray-500">{teamName}</span>
            </button>
            <button 
              onClick={onNavigateToTimeZone}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Time Zone</span>
              <span className="text-gray-500">GMT+03:00</span>
            </button>
            <button 
              onClick={onNavigateToCategories}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Categories</span>
              <span className="text-gray-500">3</span>
            </button>
            <button 
              onClick={onNavigateToMembers}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Members</span>
              <span className="text-gray-500">{selectedTeam.members.length}</span>
            </button>
          </div>
        </div>

        {/* Switch Teams */}
        <div className="space-y-3">
          <h2 className="text-sm text-gray-400 px-2">Switch Teams</h2>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            <button 
              onClick={onNavigateToYourTeams}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Your Teams</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button 
              onClick={onNavigateToCreateNewTeam}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Create New Team</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div className="space-y-3">
          <h2 className="text-sm text-gray-400 px-2">Help & Support</h2>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            <button 
              onClick={() => console.log("Export to Excel")}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Export to Excel</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button 
              onClick={onNavigateToUserGuide}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">User Guide</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            <button 
              onClick={() => window.location.href = "mailto:support@tazekal.com?subject=Tazekal Support Request"}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Contact</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="py-4 px-2">
          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </div>
      </div>

      {/* Edit Team Name Dialog */}
      <EditFieldDialog
        open={isEditTeamNameOpen}
        onOpenChange={setIsEditTeamNameOpen}
        title={t("changeTeamName")}
        subtitle={t("enterNewTeamName")}
        value={teamName}
        onSave={setTeamName}
        type="text"
      />
    </div>
  );
}