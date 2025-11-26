import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";

interface FilterScreenProps {
  onApply: () => void;
}

export function FilterScreen({ onApply }: FilterScreenProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMember, setSelectedMember] = useState<string>("All");
  const [selectedTags, setSelectedTags] = useState<string>("");

  const handleApply = () => {
    // Apply filter logic here
    onApply();
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full bg-white"
    >
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Date Range Section */}
        <div className="mb-6">
          <h3 className="mb-4">Date</h3>

          <div className="flex items-center gap-3">
            {/* Start Date */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <span
                    className={startDate ? "text-gray-900" : "text-gray-400"}
                  >
                    {formatDate(startDate)}
                  </span>
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Separator */}
            <span className="text-gray-400">-</span>

            {/* End Date */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <span className={endDate ? "text-gray-900" : "text-gray-400"}>
                    {formatDate(endDate)}
                  </span>
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => (startDate ? date < startDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Category Section */}
        <div className="mb-6">
          <h3 className="mb-4">Category</h3>
          <button
            onClick={() => {
              // Open category selection drawer/dialog
            }}
            className="w-full flex items-center justify-between py-2"
          >
            <span
              className={
                selectedCategory === "All" ? "text-gray-400" : "text-gray-900"
              }
            >
              {selectedCategory}
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <Separator className="mb-6" />

        {/* Member Section */}
        <div className="mb-6">
          <h3 className="mb-4">Member</h3>
          <button
            onClick={() => {
              // Open member selection drawer/dialog
            }}
            className="w-full flex items-center justify-between py-2"
          >
            <span
              className={
                selectedMember === "All" ? "text-gray-400" : "text-gray-900"
              }
            >
              {selectedMember}
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <Separator className="mb-6" />

        {/* Tag Section */}
        <div className="mb-6">
          <h3 className="mb-4">Tag</h3>
          <input
            type="text"
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)}
            placeholder="e.g. #promo, #clearance"
            className="w-full py-2 border-b border-gray-200 focus:outline-none focus:border-teal-500 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Bottom Apply Button */}
      <div className="border-t border-gray-200 p-4">
        <Button
          className="w-full bg-teal-600 hover:bg-teal-700"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </motion.div>
  );
}