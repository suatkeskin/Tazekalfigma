import { Team } from "../types/team";
import { Users, Check } from "lucide-react";

interface TeamListScreenProps {
  teams: Team[];
  selectedTeam: Team;
  onSelectTeam: (team: Team) => void;
}

export function TeamListScreen({
  teams,
  selectedTeam,
  onSelectTeam,
}: TeamListScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div>
          {teams.map((team, index) => {
            const isSelected = selectedTeam.id === team.id;
            
            return (
              <div key={team.id}>
                <button
                  onClick={() => onSelectTeam(team)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
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
      </div>
    </div>
  );
}