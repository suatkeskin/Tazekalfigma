import { Team } from "../types/team";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Users, Check, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface TeamSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teams: Team[];
  selectedTeam: Team;
  onSelectTeam: (team: Team) => void;
  onNavigateToNewTeam?: () => void;
}

export function TeamSelector({
  open,
  onOpenChange,
  teams,
  selectedTeam,
  onSelectTeam,
  onNavigateToNewTeam,
}: TeamSelectorProps) {
  const handleSelectTeam = (team: Team) => {
    onSelectTeam(team);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-w-md mx-auto" showClose={false}>
        <SheetHeader className="flex-row items-center justify-between space-y-0">
          <SheetTitle>Select Team</SheetTitle>
          <SheetDescription className="sr-only">
            Choose a team to switch to or create a new team
          </SheetDescription>
          <Button
            onClick={() => {
              onOpenChange(false);
              if (onNavigateToNewTeam) {
                onNavigateToNewTeam();
              }
            }}
            variant="ghost"
            size="sm"
            className="text-teal-600 hover:text-teal-700 hover:bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Team
          </Button>
        </SheetHeader>

        <div className="mt-6">
          {teams.map((team, index) => {
            const isSelected = selectedTeam.id === team.id;
            
            return (
              <div key={team.id}>
                <button
                  onClick={() => handleSelectTeam(team)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-teal-600" : "bg-gray-100"
                      }`}
                    >
                      <Users
                        className={`h-5 w-5 ${
                          isSelected ? "text-white" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm">{team.name}</h3>
                      <p className="text-xs text-gray-500">
                        {team.members.length} {team.members.length === 1 ? "member" : "members"}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="h-5 w-5 text-teal-600" />
                  )}
                </button>
                {index < teams.length - 1 && (
                  <div className="border-b border-gray-200" />
                )}
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}