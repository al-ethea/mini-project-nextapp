import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Event {
  id: string;
  name: string;
  bannerUrl: string;
}

export default function Carousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!carouselRef.current || events.length === 0) return;

    const carousel = carouselRef.current;

    // Atur scroll awal ke item ke-3 (index 2) setelah mount
    const scrollToInitial = () => {
      const firstItem = carousel.querySelector(".carousel-item");
      if (firstItem) {
        const itemWidth = firstItem.clientWidth;
        carousel.scrollLeft = 2 * itemWidth;
      }
    };

    scrollToInitial();

    const interval = setInterval(() => {
      const firstItem = carousel.querySelector(".carousel-item");
      if (!firstItem) return;

      const itemWidth = firstItem.clientWidth;
      carousel.scrollBy({ left: itemWidth, behavior: "smooth" });

      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [events]);

  if (loading)
    return <div className="carousel carousel-center bg-neutral rounded-none w-full h-48 animate-pulse"></div>;

  const infiniteEvents = [...events, ...events];

  return (
    <div
      ref={carouselRef}
      className="carousel carousel-center bg-neutral rounded-none w-full overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar"
    >
      {infiniteEvents.map((event, index) => (
        <div
          className="carousel-item w-[300px] sm:w-[1200px] md:w-[1350px] relative inline-block"
          key={`${event.id}-${index}`}
        >
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
