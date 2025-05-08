"use client";

import instance from "@/utils/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IRegisteredEvent {
  id: number;
  name: string;
  bannerUrl: string;
  city: string;
  venue: string;
  date: Date;
  description: string;
  quantity: number;
}

interface IRegisteredEventResponse {
  data: IRegisteredEvent[];
}


export default function MyRegisteredEvents() {
  const [events, setEvents] = useState<IRegisteredEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRegisteredEvents = async () => {
    setIsLoading(true);
    try {
      const response = await instance.post<IRegisteredEventResponse>("/registration/my-registered-events");
      setEvents(response.data.data);
      
    } catch (error) {
      console.error("Failed to fetch registered events:", error);
    } finally {
      setIsLoading(false);  
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black px-6 pt-6 pb-12">
      <h1 className="text-2xl font-bold mb-6">My Registered Events</h1>

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {!isLoading && events.length === 0 && (
        <p className="text-gray-500">You haven’t registered for any events yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md flex overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="bg-white p-4 flex flex-col items-center justify-center w-24 border-r">
              <p className="text-lg font-bold">{new Date(event.date).getDate()}</p>
              <p className="text-xs uppercase">
                {new Date(event.date).toLocaleString("default", { month: "short" })}
              </p>
              <p className="text-xs">{new Date(event.date).getFullYear()}</p>
            </div>

            <div className="w-32 h-32 flex-shrink-0">
              <Image
                src={event.bannerUrl}
                alt={event.name}
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-lg">{event.name}</h2>
                <p className="text-gray-600 mt-1">{event.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">{event.venue}</span>, {event.city}
                </p>
              </div>
              <div className="mt-2">
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                  {event.quantity} ticket(s) purchased
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
