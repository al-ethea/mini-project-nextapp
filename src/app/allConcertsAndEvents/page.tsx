"use client";

import instance from "@/utils/axiosInstance";
import next from "next";
import Image from "next/image";
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
}

export default function EventPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<IHandleEventPage[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>();
  const [message, setMessage] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleEventLists = async () => {
    try {
      const response = await instance.get<ApiResponse>("/events/all-events");
      if (response.data && response.data.data) {
        console.log(response)
        setEvents(response.data.data);
      } else {
        throw new Error("Event you are looking for is not found");
      }
    } catch (error: any) {
      next(error);
    }
  };

  useEffect(() => {
    handleEventLists();
  }, []);

  // Filter berdasarkan date range
  const filteredEvents = events
    .filter((event) => {
      if (dateRange?.from && dateRange?.to) {
        const eventDate = new Date(event.date);
        return eventDate >= dateRange.from! && eventDate <= dateRange.to!;
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
    <div className="min-h-screen bg-gray-100 text-black px-45 pt-4 pb-8">
      {/* Filters */}
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
        <div className="flex gap-4">
          <button
            className="border px-4 py-2 rounded"
            popoverTarget="rdp-popover"
            style={{ anchorName: "--rdp" } as React.CSSProperties}
          >
            {dateRange?.from && dateRange?.to
              ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
              : "Pick date"}
          </button>
          <div>
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
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-1 border rounded text-sm text-gray-500 hover:bg-gray-100"
                  onClick={() => {
                    setTempDateRange(undefined);
                    setDateRange(undefined);
                    setMessage(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  onClick={() => {
                    setDateRange(tempDateRange);
                    if (tempDateRange?.from && tempDateRange?.to) {
                      const filtered = events.filter((event) => {
                        const eventDate = new Date(event.date);
                        return (
                          eventDate >= tempDateRange.from! &&
                          eventDate <= tempDateRange.to!
                        );
                      });

                      if (filtered.length === 0) {
                        setMessage("Cannot find event or concert on that day");
                      } else {
                        setMessage(null);
                      }
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <select
              className="border px-4 py-2 rounded bg-white"
              value={selectedCity || ""}
              onChange={(e) => setSelectedCity(e.target.value || null)}
            >
              <option value="">All Locations</option>
              {allCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              className="border px-4 py-2 rounded bg-white"
              value={selectedGenre || ""}
              onChange={(e) => setSelectedGenre(e.target.value || null)}
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

      {/* Event List */}
      <div>
        <p className="text-gray-600 font-semibold my-6">
          {message && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
              {message}
            </div>
          )}
          {filteredEvents.length} Result
        </p>

        <div className="flex flex-col gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md flex overflow-hidden"
            >
              {/* Date */}
              <div className="bg-white p-4 flex flex-col items-center justify-center w-24">
                <p className="text-lg font-bold">
                  {new Date(event.date).getDate()}
                </p>
                <p className="text-xs uppercase">
                  {new Date(event.date).toLocaleString("default", {
                    month: "short",
                  })}
                </p>
                <p className="text-xs">{new Date(event.date).getFullYear()}</p>
              </div>

              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={event.bannerUrl?.toString()}
                  alt={event.description?.toString()}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold">{event.description}</h2>
                  <p className="text-sm text-gray-600">{event.name}</p>
                  <p className="text-sm text-gray-500">
                    {event.city} | {event.venue}
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="p-4 flex items-center">
                {event.availableSeats > 0 ? (
                  <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded">
                    Find Tickets
                  </button>
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
        <div className="flex justify-center mt-10 gap-2">
          <button
            className="text-gray-400"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button
            className={`w-8 h-8 rounded-full ${
              currentPage === 1 ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            className={`w-8 h-8 rounded-full ${
              currentPage === 2 ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(2)}
            disabled={filteredEvents.length < 10}
          >
            2
          </button>
          <button
            className={`w-8 h-8 rounded-full ${
              currentPage === 3 ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(3)}
            disabled={filteredEvents.length < 20}
          >
            3
          </button>
          <button
            className={`w-8 h-8 rounded-full ${
              currentPage === 4 ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(4)}
            disabled={filteredEvents.length < 30}
          >
            4
          </button>
          <button
            className="text-gray-400"
            disabled={filteredEvents.length < 40}
            onClick={() =>
              setCurrentPage(Math.ceil(filteredEvents.length / 10))
            }
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
