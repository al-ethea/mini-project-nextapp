"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import instance from "@/utils/axiosInstance";
import authStore from "@/zustand/store";

interface EventResponse {
  data: {
    id: number;
    name: string;
    price: number;
  };
}

interface UserResponse {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    totalPoints: number;
  };
}

interface DiscountResponse {
  status: string;
  referralId: number;
}
const RegisterPage = () => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventResponse["data"] | null>(null);
  const [formData, setFormData] = useState({
    quantity: 1,
    tax: 0,
    discountUsed: false,
    // discountCode: "",
    referralId: null as number | null,
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountStatusMessage, setDiscountStatusMessage] = useState("");
  const [discountValid, setDiscountValid] = useState(false);
  const token = authStore((state: any) => state.token);

  useEffect(() => {
    if (!token) return;
    const decoded: any = JSON.parse(atob(token.split(".")[1]));
    const userIdFromToken = decoded.userId;
    setUserId(userIdFromToken);

    const fetchData = async () => {
      try {
        const [eventRes, userRes] = await Promise.all([
          instance.get<EventResponse>(`/events/${params.id}`),
          instance.get<UserResponse>(`/users/${userIdFromToken}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setEvent(eventRes.data.data);
        setUserPoints(userRes.data.data.totalPoints || 0);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [params.id, token]);

  // Menghitung pajak berdasarkan quantity
  useEffect(() => {
    if (event) {
      const subtotal = event.price * formData.quantity;
      const calculatedTax = subtotal * 0.1;

      setFormData((prev) => ({
        ...prev,
        tax: calculatedTax,
      }));
    }
  }, [event, formData.quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !userId) return;

    const totalPrice = calculateTotalPrice();
    const pointsToUse = usePoints ? Math.min(userPoints, totalPrice) : 0;

    const payload = {
      ...formData,
      eventId: Number(params.id),
      userId,
      usedPoints: pointsToUse,
      quantity: Number(formData.quantity),
      tax: Number(formData.tax),
      referralId: formData.referralId, // ini sudah benar karena diisi dari response backend
    };
    console.log("Payload to submit:", payload);

    try {
      await instance.post("/events/register-event", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Successfully registered");
      router.push("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to register");
    }
  };

  const calculateTotalPrice = () => {
    if (!event) return 0;
    const subtotal = event.price * formData.quantity;
    const tax = subtotal * 0.1;
    const discount = discountValid ? subtotal * 0.1 : 0;
    return subtotal + tax - discount;
  };

  const calculateFinalPrice = () => {
    const total = calculateTotalPrice();
    const discount = usePoints ? Math.min(userPoints, total) : 0;
    return total - discount;
  };

  const checkDiscountCode = async (discountCode: string) => {
    const token = localStorage.getItem("token");
    if (!token || !userId || !discountCode) {
      setDiscountStatusMessage("User ID atau kode tidak tersedia.");
      setDiscountValid(false);
      return;
    }

    const tokenJson = JSON.parse(token);
    try {
      const res = await instance.post<DiscountResponse>(
        "/referral/check-discount",
        {
          code: discountCode,
          // userId,
        },
        {
          headers: { Authorization: `Bearer ${tokenJson.state.token}` },
        }
      );

      if (res.data.status === "ACTIVE") {
        setDiscountStatusMessage("Kode diskon valid dan aktif.");
        setDiscountValid(true);
        setFormData((prev) => ({
          ...prev,
          discountUsed: true,
          referralId: res.data.referralId,
        }));
      } else {
        setDiscountStatusMessage(
          `Kode tidak bisa digunakan (${res.data.status}).`
        );
        setDiscountValid(false);
      }
    } catch (err: any) {
      setDiscountStatusMessage(
        err.response?.data?.message || "Terjadi kesalahan."
      );
      setDiscountValid(false);
    }
  };
  

  if (!event) return <p>Loading...</p>;

  return (
    <div className="w-full px-80 bg-gray-100 py-4">
      <h1 className="text-2xl font-bold text-black mb-4">
        Register for {event.name}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-black">Ticket Quantity</label>
          <input
            type="number"
            name="quantity"
            min={1}
            value={formData.quantity}
            onChange={handleChange}
            className="border w-full p-2 rounded bg-gray-500"
            required
          />
        </div>
        <div>
          <label className="text-black">Subtotal</label>
          <input
            type="text"
            value={`Rp ${(event.price * formData.quantity).toLocaleString(
              "id-ID"
            )}`}
            disabled
            className="border w-full p-2 rounded bg-gray-500"
          />
        </div>
        <div>
          <label className="text-black">Tax (10%)</label>
          <input
            type="text"
            value={`Rp ${formData.tax.toLocaleString("id-ID")}`}
            disabled
            className="border w-full p-2 rounded bg-gray-500"
          />
        </div>
        <div>
          <label className="text-black">Total Before Discount</label>
          <input
            type="text"
            value={`Rp ${calculateTotalPrice().toLocaleString("id-ID")}`}
            disabled
            className="border w-full p-2 rounded bg-gray-500"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="discountCode"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter discount code"
              className="border w-full p-2 rounded bg-gray-500 text-white"
            />
            <button
              type="button"
              onClick={() => checkDiscountCode(discountCode)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Check Code
            </button>
          </div>
          {discountStatusMessage && (
            <p className={discountValid ? "text-green-500" : "text-red-500"}>
              {discountStatusMessage}
            </p>
          )}
        </div>
        {discountValid && (
          <div className="relative">
            <label className="text-black">Discount (10%)</label>
            <input
              type="text"
              value={`- Rp ${(
                event.price *
                formData.quantity *
                0.1
              ).toLocaleString("id-ID")}`}
              disabled
              className="border w-full p-2 rounded bg-gray-500 text-white"
            />
            <button
              type="button"
              onClick={() => {
                setDiscountValid(false);
                setDiscountCode("");
                setDiscountStatusMessage("");
                setFormData((prev) => ({
                  ...prev,
                  discountUsed: false,
                  referralId: null,
                }));
              }}
              className="absolute top-0 right-0 mt-1 mr-1 text-red-400 hover:text-red-600 text-sm font-bold"
            >
              Cancel using discount
            </button>
          </div>
        )}
        {userPoints > 0 && (
          <div>
            <label className="flex items-center gap-2 text-black">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={() => setUsePoints(!usePoints)}
              />
              Use your {userPoints} points for discount (Max: Rp{" "}
              {userPoints.toLocaleString("id-ID")})
            </label>
          </div>
        )}
        <div>
          <label className="text-black">Final Price To Pay</label>
          <input
            type="text"
            value={`Rp ${calculateFinalPrice().toLocaleString("id-ID")}`}
            disabled
            className="border w-full p-2 rounded bg-gray-500 font-bold"
          />
        </div>
        <button
          type="submit"
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
