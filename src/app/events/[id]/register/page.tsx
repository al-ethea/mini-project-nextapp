"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import instance from "@/utils/axiosInstance";

interface EventResponse {
  data: {
    data: any; // Replace 'any' with the actual type of the event data
  };
}

interface UserResponse {
  data: {
    points: number;
    data: {
      points: number; // Replace 'number' with the actual type of the user points
    };
  };
}
const RegisterPage = () => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    quantity: 1,
    tax: 0,
    discountUsed: false,
  });
  const [userId, setUserId] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        setUserPoints(userRes.data.data?.points || 0);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    if (event) {
      const quantity = formData.quantity;
      const totalPrice = event.price * quantity;
      const calculatedTax = totalPrice * 0.1;

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

    const payload = {
        ...formData,
        eventId: Number(params.id),
        userId,
        usedPoints: usePoints ? userPoints : 0,
        quantity: Number(formData.quantity),
        tax: Number(formData.tax),
        discountUsed: usePoints, 
      };

      console.log(payload)
      

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

  const calculateTotalPrice = () => {
    if (!event) return 0;
    const subtotal = event.price * formData.quantity;
    const tax = subtotal * 0.1;
    const discount = usePoints ? userPoints : 0;
    return subtotal + tax - discount;
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="w-full px-80 bg-gray-100 py-4">
      <h1 className="text-2xl font-bold text-black mb-4">Register for {event.name}</h1>
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
          <label className="text-black">Tax (10%)</label>
          <input
            type="text"
            value={`Rp ${formData.tax.toLocaleString("id-ID")}`}
            disabled
            className="border w-full p-2 rounded bg-gray-500"
          />
        </div>
        <div>
          <label className="text-black">Total Price To Pay</label>
          <input
            type="text"
            value={`Rp ${calculateTotalPrice().toLocaleString("id-ID")}`}
            disabled
            className="border w-full p-2 rounded bg-gray-500"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-black">
            <input
              type="checkbox"
              checked={usePoints}
              onChange={() => setUsePoints(!usePoints)}
            />
            Use your {userPoints} poins for discount
          </label>
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
