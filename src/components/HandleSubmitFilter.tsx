"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchByLocation from "./SearchByLocation";
import DatePicker from "./DatePicker";

export default function EventSearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleFindEvents = () => {
    const params = new URLSearchParams();
    
    if (location) params.append("city", location);
    if (dateRange?.from) params.append("from", dateRange.from.toISOString());
    if (dateRange?.to) params.append("to", dateRange.to.toISOString());
    
    router.push(`/allConcertsAndEvents?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center rounded-lg shadow-md">
        {/* SearchByLocation Component */}
        <div className="flex-1 min-w-[200px]">
          <SearchByLocation 
            value={location} 
            onChange={setLocation} 
          />
        </div>
        
        {/* DatePicker Component */}
        <div className="flex-1 min-w-[250px] pl-14 pt-3">
          <DatePicker 
            date={dateRange}
            onSelect={setDateRange}
          />
        </div>
        
        {/* Find Events Button */}
        <div className="ml-auto pl-3 pt-2">
          <button 
            onClick={handleFindEvents}
            className="px-6 py-3 pl-3 text-white bg-red-600 hover:bg-red-700 border-none rounded-lg transition-colors whitespace-nowrap"
            disabled={!location && !dateRange?.from}
          >
            Find Events
          </button>
        </div>
      </div>
    </div>
  );
}

interface DateRange {
  from?: Date;
  to?: Date;
}