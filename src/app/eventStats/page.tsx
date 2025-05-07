"use client";
import authStore from "@/zustand/store";
import instance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function EventStats() {
  const token = authStore((state: any) => state.token);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getEventStats = async () => {
    try {
      const response = await instance.get("/organizer/display-event-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setStats(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getEventStats();
  }, [token]);

  return (
    <main>
      <div className="max-w-2xl mx-auto p-6 text-black bg-white">
        <h1 className="text-2xl font-bold mb-4">Organizer Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : !stats ? (
          <p>No data available</p>
        ) : (
          <div className="space-y-4 bg-white p-6">
            <div>
              <span className="font-semibold">Total Registrations:</span>{" "}
              {stats.totalRegistrations}
            </div>
            <div>
              <span className="font-semibold">Total Transactions:</span>{" "}
              {stats.totalTransactions}
            </div>
            <div>
              <span className="font-semibold">Total Amount Paid:</span> $
              {stats.totalAmountPaid}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
