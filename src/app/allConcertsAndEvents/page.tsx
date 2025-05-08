"use client";

import instance from "@/utils/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface IHandleEventPage {
  id: number | string;
  name: string;
  bannerUrl: string;
  city: string;
  venue: string;
  date: Date;
  category: string;
  description: string;
  availableSeats: number;
}

interface ApiResponse {
  data: IHandleEventPage[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export default function EventPage() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<IHandleEventPage[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>();
  const [message, setMessage] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const cityParam = searchParams.get("city");
  const genreParam = searchParams.get("genre");

  useEffect(() => {
    if (fromParam && toParam) {
      setDateRange({
        from: new Date(fromParam),
        to: new Date(toParam),
      });
    }
    if (cityParam) {
      setSelectedCity(cityParam);
    }
    if (genreParam) {
      setSelectedGenre(genreParam);
    }
  }, [fromParam, toParam, cityParam, genreParam]);

  const handleEventLists = async () => {
    setIsLoading(true);
    try {
      let url = `/events/all-events?page=${currentPage}&limit=8`;

      if (fromParam && toParam) {
        url += `&from=${fromParam}&to=${toParam}`;
      }

      if (cityParam) {
        url += `&city=${encodeURIComponent(cityParam)}`;
      }

      if (genreParam) {
        url += `&category=${encodeURIComponent(genreParam)}`;
      }

      const response = await instance.get<ApiResponse>(url);
      if (response.data && response.data.data) {
        setEvents(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setMessage(null);
      } else {
        throw new Error("No events found");
      }
    } catch (error: any) {
      console.error("Failed to fetch events:", error);
      setMessage("Failed to load events. Please try again.");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleEventLists();
  }, [currentPage, fromParam, toParam, cityParam, genreParam]);

  const applyDateFilter = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("from", tempDateRange.from.toISOString());
      params.set("to", tempDateRange.to.toISOString());
      window.location.href = `/allConcertsAndEvents?${params.toString()}`;
    }
  };

  const clearDateFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("from");
    params.delete("to");
    window.location.href = `/allConcertsAndEvents?${params.toString()}`;
  };

  const queryParams = useSearchParams();
  const keyword = queryParams.get("search")?.toLowerCase() || "";

  const searchedEvents = events.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.venue.toLowerCase().includes(keyword)
  );

  const filteredEvents = events
    .filter((event) => {
      if (dateRange?.from && dateRange?.to) {
        const eventDate = new Date(event.date);
        return eventDate >= dateRange.from && eventDate <= dateRange.to;
      }
      return true;
    })
    .filter((event) => {
      if (selectedGenre) return event.category === selectedGenre;
      return true;
    })
    .filter((event) => {
      if (selectedCity) return event.city === selectedCity;
      return true;
    });

  const allGenres = Array.from(new Set(events.map((event) => event.category)));
  const allCities = Array.from(new Set(events.map((event) => event.city)));

  return (
    <div className="min-h-screen bg-gray-100 text-black px-4 sm:px-12 pt-4 pb-8">
      {/* Filters Section */}
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Date Range Picker */}
          <div>
            <button
              className="border px-4 py-2 rounded"
              popoverTarget="rdp-popover"
              style={{ anchorName: "--rdp" } as React.CSSProperties}
            >
              {dateRange?.from && dateRange?.to
                ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                : "Select Date Range"}
            </button>
            <div
              popover="auto"
              id="rdp-popover"
              className="dropdown z-50 bg-white shadow-lg p-4 rounded space-y-4"
              style={{ positionAnchor: "--rdp" } as React.CSSProperties}
            >
              <DayPicker
                className="react-day-picker bg-gray-300"
                mode="range"
                selected={tempDateRange}
                onSelect={setTempDateRange}
                numberOfMonths={2}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-1 border rounded text-sm text-gray-500 hover:bg-gray-100"
                  onClick={clearDateFilter}
                >
                  Clear
                </button>
                <button
                  className="px-4 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  onClick={applyDateFilter}
                  disabled={!tempDateRange?.from || !tempDateRange?.to}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* City Filter */}
          <div className="relative">
            <select
              className="border px-4 py-2 rounded bg-white w-full sm:w-auto"
              value={selectedCity || ""}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString());
                if (e.target.value) {
                  params.set("city", e.target.value);
                } else {
                  params.delete("city");
                }
                window.location.href = `/allConcertsAndEvents?${params.toString()}`;
              }}
            >
              <option value="">All Locations</option>
              {allCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Genre Filter */}
          <div className="relative">
            <select
              className="border px-4 py-2 rounded bg-white w-full sm:w-auto"
              value={selectedGenre || ""}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString());
                if (e.target.value) {
                  params.set("genre", e.target.value);
                } else {
                  params.delete("genre");
                }
                window.location.href = `/allConcertsAndEvents?${params.toString()}`;
              }}
            >
              <option value="">All Genres</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Event List Section */}
      <div>
        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="text-gray-600 font-semibold my-6">
              {message && (
                <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                  {message}
                </p>
              )}
              {keyword
                ? `${searchedEvents.length} result${
                    searchedEvents.length === 1 ? "" : "s"
                  } found for "${keyword}"`
                : `${filteredEvents.length} Event${
                    filteredEvents.length === 1 ? "" : "s"
                  } Found`}
            </div>

            <div className="flex flex-col gap-4">
              {(keyword ? searchedEvents : filteredEvents).map((event) => (
                <div
                  key={event.id}
                  className="bg-white shadow-md flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Date Column */}
                  <div className="bg-white p-4 flex flex-col items-center justify-center w-full sm:w-24 border-b sm:border-b-0 sm:border-r">
                    <p className="text-lg font-bold">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-xs uppercase">
                      {new Date(event.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </p>
                    <p className="text-xs">
                      {new Date(event.date).getFullYear()}
                    </p>
                  </div>

                  {/* Image Column */}
                  <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                    <Image
                      src={event.bannerUrl}
                      alt={event.name}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                      priority
                    />
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 p-4 flex flex-col justify-between text-left">
                    <div>
                      <h2 className="font-bold text-lg">{event.name}</h2>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        <span className="font-medium">{event.venue}</span>,{" "}
                        {event.city}
                      </p>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          event.availableSeats > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {event.availableSeats > 0
                          ? `${event.availableSeats} seats available`
                          : "Sold out"}
                      </span>
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="p-4 flex justify-center sm:items-center border-t sm:border-t-0 sm:border-l">
                    {event.availableSeats > 0 ? (
                      <Link href={`/events/${event.id}`}>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition-colors">
                          Find Tickets
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="bg-gray-400 text-white font-semibold px-6 py-2 rounded cursor-not-allowed"
                        disabled
                      >
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex flex-wrap justify-center mt-10 gap-2">
                <button
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  First
                </button>

                <button
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                >
                  Prev
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`w-10 h-10 rounded-full ${
                        currentPage === pageNum
                          ? "bg-red-600 text-white"
                          : "bg-white text-red-600 hover:bg-red-50"
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                >
                  Next
                </button>

                <button
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
