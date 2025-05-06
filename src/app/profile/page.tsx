"use client";
import authStore from "@/zustand/store";
import instance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const token = authStore((state: any) => state.token);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserProfile = async () => {
    try {
      const response = await instance.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setUserProfile(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getUserProfile();
  }, [token]);

  return (
    <main>
      <div className="max-w-2xl mx-auto p-6 text-black bg-white">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        {loading ? (
          <p>Loading</p>
        ) : !userProfile ? (
          <p>No profile to display</p>
        ) : (
          <div className="space-y-4 bg-white p-6">
            <div>
              <span className="font-semibold">First Name:</span>{" "}
              {userProfile.firstName}
            </div>
            <div>
              <span className="font-semibold">Last Name:</span>{" "}
              {userProfile.lastName}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {userProfile.email}
            </div>
            <div>
              <span className="font-semibold">Referral Code:</span>{" "}
              {userProfile.referralCode}
            </div>
            <div>
              <span className="font-semibold">Total Points:</span>{" "}
              {userProfile.totalPoints}
            </div>
            {userProfile.referredTo?.length > 0 && (
              <div>
                <span className="font-semibold">Your Discount Code:</span>{" "}
                {userProfile.referredTo[0].discountCode}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
