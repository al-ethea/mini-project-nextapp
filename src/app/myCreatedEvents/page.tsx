"use client";
import authStore from "@/zustand/store";
import instance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function MyCreatedEventsPage() {
  const token = authStore((state: any) => state.token);
  const [createdEvents, setCreatedEvents] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCreatedEvents = async () => {
    try {
      const response = await instance.get("/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreatedEvents(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) getCreatedEvents();
  }, [token]);
  return (
    <main>
      <div className="max-w-4xl mx-auto p-6 text-black bg-white">
        <h1 className="text-2xl font-bold mb-4">My Created Events</h1>

        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : createdEvents.length === 0 ? (
          <p>You haven’t created any events yet.</p>
        ) : (
          <div className="space-y-6">
            {createdEvents.map((createdEvents: any) => (
              <div
                key={createdEvents.id}
                className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
              >
                <h2 className="text-xl font-semibold">{createdEvents.title}</h2>
                <p className="text-gray-700 mb-2">
                  {createdEvents.description}
                </p>
                <p className="text-sm text-gray-600">
                  Event Date:{" "}
                  {new Date(createdEvents.date).toLocaleDateString()}
                </p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>
                    Registrations: {createdEvents._count.registrations}
                  </span>
                  <span>Reviews: {createdEvents._count.reviews}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
