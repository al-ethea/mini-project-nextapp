import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  name: string;
  bannerUrl: string;
}

export default function Carousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/events/all-events?limit=6');
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="carousel carousel-center bg-neutral rounded-none w-full h-48 animate-pulse"></div>;

  return (
    <div className="carousel carousel-center bg-neutral rounded-none w-full">
      {events.map((event, index) => (
        <div className="carousel-item w-300 relative" key={event.id}>
          <Image
            src={event.bannerUrl}
            className="w-full h-120 object-cover"
            alt={`carousel-image-${index}`}
            width={1000}
            height={1000}
            priority={index === 0}
          />
          <div className="absolute bottom-25 left-10 text-gray-200 text-3xl font-bold">
            {event.name}
          </div>
          <div className="absolute bottom-10 left-10">
            <Link href={`/allConcertsAndEvents?artist=${encodeURIComponent(event.name)}`}>
              <button className="btn bg-red-700 border-none shadow-none btn-primary">
                More Info
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}