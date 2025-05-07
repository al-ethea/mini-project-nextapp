// components/SearchByLocation.tsx
"use client";

interface SearchByLocationProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchByLocation({
  value,
  onChange,
}: SearchByLocationProps) {
  return (
    <div>
      <form className="max-w-md mx-auto w-100 h-10">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          {/* ... (kode SVG tetap sama) */}
          <input
            type="search"
            id="default-search"
            className="w-[150px] h-[50px] sm:w-[400px] sm:h[100px] p-4 ps-10 text-sm text-black rounded-lg bg-white"
            placeholder="Search Locations"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
}
