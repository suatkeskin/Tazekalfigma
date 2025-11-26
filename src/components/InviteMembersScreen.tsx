export function InviteMembersScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Members Count */}
        <div className="text-center py-2">
          <p className="text-sm text-gray-500">
            1 / 1 Members
          </p>
        </div>

        {/* Send Invite Link Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">🏠</div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Send Invite Link</h3>
              <p className="text-sm text-gray-500">
                Share via message, email, or text.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}