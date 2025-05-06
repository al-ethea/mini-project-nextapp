// components/DatePicker.tsx
"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface DatePickerProps {
  date?: DateRange;
  onSelect: (date: DateRange | undefined) => void;
}

export default function DatePicker({ date, onSelect }: DatePickerProps) {
  const [tempRange, setTempRange] = useState<DateRange | undefined>(date);

  return (
    <div>
      <button
        popoverTarget="rdp-popover"
        className="input bg-white text-gray-400 w-full h-13 rounded-lg px-4 py-2 text-left"
      >
        {date?.from && date?.to
          ? `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`
          : "Select date range"}
      </button>
      <div
        popover="auto"
        id="rdp-popover"
        className="dropdown bg-gray-800  shadow-lg p-4 rounded space-y-4"
      >
        <DayPicker
          mode="range"
          selected={
            tempRange as import("react-day-picker").DateRange | undefined
          }
          onSelect={setTempRange}
          numberOfMonths={2}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-1 border rounded text-sm text-white"
            onClick={() => {
              setTempRange(undefined);
              onSelect(undefined);
            }}
          >
            Clear
          </button>
          <button
            className="px-4 py-1 bg-red-600 text-white rounded text-sm"
            onClick={() => onSelect(tempRange)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
