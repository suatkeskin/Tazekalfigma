import { Switch } from "./ui/switch";
import { useState } from "react";

interface NotificationsScreenProps {
  // onBack is no longer needed since header handles it
}

export function NotificationsScreen() {
  const [expirationAlerts, setExpirationAlerts] = useState(true);
  const [morningHour, setMorningHour] = useState(12);
  const [eveningHour, setEveningHour] = useState(18);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Expiration Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900">Expiration Alerts</h3>
              <p className="text-sm text-gray-500 mt-1">
                Get notified about expiring items
              </p>
            </div>
            <Switch
              checked={expirationAlerts}
              onCheckedChange={setExpirationAlerts}
            />
          </div>
        </div>

        {/* Notification Times */}
        {expirationAlerts && (
          <div className="space-y-3">
            <h2 className="text-sm text-gray-400 px-2">Notification Times</h2>
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {/* Morning */}
              <div className="p-4 flex items-center justify-between">
                <span className="text-gray-700">Morning</span>
                <select
                  value={morningHour}
                  onChange={(e) => setMorningHour(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Evening */}
              <div className="p-4 flex items-center justify-between">
                <span className="text-gray-700">Evening</span>
                <select
                  value={eveningHour}
                  onChange={(e) => setEveningHour(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}