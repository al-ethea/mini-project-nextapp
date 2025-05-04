"use client";

import instance from "@/utils/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IOrderedEvent {
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
  data: IOrderedEvent[];
}

export default function MyOrderedEventsPage() {
  const [orderedEvents, setOrderedEvents] = useState<IOrderedEvent[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const fetchOrderedEvents = async () => {
    try {
      const response = await instance.get<ApiResponse>("/events/my-orders");
      if (response.data?.data?.length) {
        setOrderedEvents(response.data.data);
      } else {
        setMessage("You haven't ordered any events yet.");
      }
    } catch (error) {
      setMessage("Failed to fetch your ordered events.");
    }
  };

  useEffect(() => {
    fetchOrderedEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black px-45 pt-4 pb-8">
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">My Ordered Events</h1>
      </div>

      <div>
        {message && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-6">
            {message}
          </div>
        )}

        <div className="flex flex-col gap-4 mt-6">
          {orderedEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md flex overflow-hidden">
              {/* Date */}
              <div className="bg-white p-4 flex flex-col items-center justify-center w-24">
                <p className="text-lg font-bold">
                  {new Date(event.date).getDate()}
                </p>
                <p className="text-xs uppercase">
                  {new Date(event.date).toLocaleString("default", { month: "short" })}
                </p>
                <p className="text-xs">{new Date(event.date).getFullYear()}</p>
              </div>

              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={event.bannerUrl.toString()}
                  alt={event.description}
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

              {/* Status */}
              <div className="p-4 flex items-center">
                <span className="bg-green-600 text-white font-semibold px-4 py-2 rounded">
                  Ordered
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
