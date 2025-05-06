"use client";
import authStore from "@/zustand/store";
import instance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function PointsHistoryPage() {
  const token = authStore((state: any) => state.token);
  const [pointsHistory, setPointsHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Points History
  const getPointsHistory = async () => {
    try {
      const response = await instance.get("/points", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPointsHistory(response?.data?.pointsHistory || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getPointsHistory();
    }
  }, [token]);

  return (
    <main>
      <div className="max-w-2xl mx-auto p-6 text-black bg-white">
        <h1 className="text-2xl font-bold mb-4">My Points History</h1>

        {loading ? (
          <p>Loading...</p>
        ) : pointsHistory.length === 0 ? (
          <p>No points history available.</p>
        ) : (
          <div className="space-y-4 bg-white p-6">
            {pointsHistory.map((entry, index) => (
              <div
                key={index}
                className={`border p-4 rounded-xl shadow-sm ${
                  entry.type === "EARNED" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold">{entry.type}</div>
                  <div className="text-sm text-gray-600">
                    {entry.type === "EARNED"
                      ? `Earned At: ${new Date(
                          entry.earnedAt!
                        ).toLocaleDateString()}`
                      : `Used At: ${new Date(
                          entry.usedAt!
                        ).toLocaleDateString()}`}
                  </div>
                </div>

                <div className="text-sm">
                  <strong>Points:</strong> {entry.amount}
                </div>

                {entry.type === "EARNED" && entry.referredUser && (
                  <>
                    <div className="text-sm">
                      <strong>Used by:</strong> {entry.referredUser.firstName}{" "}
                      {entry.referredUser.lastName}
                    </div>
                    <div className="text-sm">
                      <strong>Email:</strong> {entry.referredUser.email}
                    </div>
                  </>
                )}

                {entry.type === "USED" && (
                  <>
                    <div className="text-sm">
                      <strong>Event:</strong> {entry.eventName}
                    </div>
                    <div className="text-sm">
                      <strong>Registration ID:</strong> {entry.registrationId}
                    </div>
                  </>
                )}

                <div className="text-sm">
                  <strong>Expires On:</strong>{" "}
                  {new Date(entry.expirationDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
