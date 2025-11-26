import { Zap, Link2 } from "lucide-react";

interface NewTeamScreenProps {
  onCreateTeam: () => void;
  onJoinTeam: () => void;
}

export function NewTeamScreen({ onCreateTeam, onJoinTeam }: NewTeamScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Description */}
        <div className="text-center mb-8 mt-8">
          <p className="text-gray-600">
            Create your own team<br />
            or join one with an invite link.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Create a Team */}
          <button
            onClick={onCreateTeam}
            className="w-full bg-white rounded-2xl p-6 text-left hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-blue-600 fill-blue-600" />
              </div>
              <div>
                <h3 className="mb-1">Create a Team</h3>
                <p className="text-sm text-gray-500">
                  Create a team and manage expiration dates.
                </p>
              </div>
            </div>
          </button>

          {/* Join a Team */}
          <button
            onClick={onJoinTeam}
            className="w-full bg-white rounded-2xl p-6 text-left hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Link2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-1">Join a Team</h3>
                <p className="text-sm text-gray-500">
                  Join an existing team using an invite code.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}