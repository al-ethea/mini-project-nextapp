// src/app/events/[id]/page.tsx
import Image from "next/image";
import instance from "@/utils/axiosInstance";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface EventDetail {
  data: EventDetail;
  id: number;
  name: string;
  bannerUrl: string;
  city: string;
  venue: string;
  date: string;
  category: string;
  description: string;
  availableSeats: number;
  price: number;
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  try {
    const response = await instance.get<EventDetail>(`/events/${id}`);
    const event: EventDetail = response.data.data;

    if (!event) return notFound();

    return (
      <div className="w-full bg-gray-100 shadow-md ">
        <div className="mx-50 px-10 py-8 bg-white">
          <Link
            href="/allConcertsAndEvents"
            className="flex items-center text-black hover:underline mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </Link>
          <Image
            src={event.bannerUrl}
            alt={event.description}
            width={1000}
            height={1000}
            className="w-full h-100 object-cover mb-6 rounded"
            priority
          />

          <h1 className="text-5xl font-extrabold mb-2 text-black">
            {event.name}
          </h1>
          <p className="text-gray-600 mb-4 font-bold text-2xl">
            {event.description}
          </p>

          <div className="space-y-2 text-sm text-gray-600 pt-10">
            <p>
              <span className="font-semibold">Date:</span>{" "}
              <span>{new Date(event.date).toLocaleString()}</span>
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              <span>
                {event.venue}, {event.city}
              </span>
            </p>
            <p>
              <span className="font-semibold">Genre:</span>{" "}
              <span>{event.category}</span>
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              <span>Rp {event.price.toLocaleString()}</span>
            </p>
            <p>
              <span className="font-semibold">Available Seats:</span>{" "}
              <span>{event.availableSeats}</span>
            </p>
          </div>

          <Link
            href={`/events/${event.id}/register`}
            className="mt-6 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Fetch event error:", error);
    return notFound();
  }
}
