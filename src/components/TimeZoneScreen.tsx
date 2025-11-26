import { Check } from "lucide-react";
import { useState } from "react";

interface TimeZoneScreenProps {
  // onBack is no longer needed since header handles it
}

const timezones = [
  { value: "-12", label: "GMT-12:00" },
  { value: "-11", label: "GMT-11:00" },
  { value: "-10", label: "GMT-10:00" },
  { value: "-9", label: "GMT-09:00" },
  { value: "-8", label: "GMT-08:00" },
  { value: "-7", label: "GMT-07:00" },
  { value: "-6", label: "GMT-06:00" },
  { value: "-5", label: "GMT-05:00" },
  { value: "-4", label: "GMT-04:00" },
  { value: "-3", label: "GMT-03:00" },
  { value: "-2", label: "GMT-02:00" },
  { value: "-1", label: "GMT-01:00" },
  { value: "0", label: "GMT+00:00" },
  { value: "1", label: "GMT+01:00" },
  { value: "2", label: "GMT+02:00" },
  { value: "3", label: "GMT+03:00" },
  { value: "4", label: "GMT+04:00" },
  { value: "5", label: "GMT+05:00" },
  { value: "6", label: "GMT+06:00" },
  { value: "7", label: "GMT+07:00" },
  { value: "8", label: "GMT+08:00" },
  { value: "9", label: "GMT+09:00" },
  { value: "10", label: "GMT+10:00" },
  { value: "11", label: "GMT+11:00" },
  { value: "12", label: "GMT+12:00" },
];

export function TimeZoneScreen() {
  const [selectedTimezone, setSelectedTimezone] = useState("3");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Timezone List */}
      <div className="bg-white border-b border-gray-200">
        {timezones.map((timezone) => (
          <button
            key={timezone.value}
            onClick={() => setSelectedTimezone(timezone.value)}
            className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <span className="text-gray-900">{timezone.label}</span>
            {selectedTimezone === timezone.value && (
              <Check className="h-5 w-5 text-teal-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}