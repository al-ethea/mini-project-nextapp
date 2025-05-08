'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';

type AttendedEvent = {
  id: number;
  title: string;
  date: string;
  hasRated: boolean;
  bannerUrl: string;
  city: string;
  venue: string;
};

const attendedEvents: AttendedEvent[] = [
  {
    id: 1,
    title: 'Coldplay: Music Of The Spheres World Tour',
    date: '2025-04-25',
    hasRated: false,
    bannerUrl: '/coldplay.jpg',
    city: 'Jakarta',
    venue: 'Stadion GBK',
  },
  {
    id: 2,
    title: 'The Click 2025 Tour in Singapore',
    date: '2025-04-10',
    hasRated: true,
    bannerUrl: '/click.jpg',
    city: 'Singapore',
    venue: 'Singapore Indoor Stadium',
  },
];

export default function MyEventRatings() {
  const [openRatingId, setOpenRatingId] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratedEvents, setRatedEvents] = useState<number[]>([]);

  const handleSubmit = (eventId: number) => {
    console.log(`Submit rating ${rating} for event ${eventId}`);
    setRatedEvents([...ratedEvents, eventId]);
    setOpenRatingId(null);
    setRating(0);
  };

  const today = new Date();

  const completedEvents = attendedEvents.filter(
    (e) => new Date(e.date) < today
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black px-45 pt-4 pb-8">
      <div className="bg-white p-6 shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Share Your Experience With Us
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {completedEvents.length === 0 ? (
          <p className="text-center text-neutral-600">You have no past events yet.</p>
        ) : (
          completedEvents.map((event) => {
            const isRated = event.hasRated || ratedEvents.includes(event.id);

            return (
              <div
                key={event.id}
                className="bg-white shadow-md flex overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Date Column */}
                <div className="bg-white p-4 flex flex-col items-center justify-center w-24 border-r">
                  <p className="text-lg font-bold">
                    {new Date(event.date).getDate()}
                  </p>
                  <p className="text-xs uppercase">
                    {new Date(event.date).toLocaleString('default', {
                      month: 'short',
                    })}
                  </p>
                  <p className="text-xs">{new Date(event.date).getFullYear()}</p>
                </div>

                {/* Image Column */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={event.bannerUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Column */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-lg">{event.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.venue}, {event.city}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {format(new Date(event.date), 'PPP')}
                    </p>
                  </div>
                  {openRatingId === event.id && !isRated && (
                    <div className="mt-3">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1;
                          return (
                            <FaStar
                              key={index}
                              className={`cursor-pointer w-6 h-6 ${
                                starValue <= (hover || rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHover(starValue)}
                              onMouseLeave={() => setHover(0)}
                            />
                          );
                        })}
                      </div>
                      <button
                        className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                        onClick={() => handleSubmit(event.id)}
                        disabled={rating === 0}
                      >
                        Submit Rating
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Column */}
                <div className="p-4 flex items-center border-l">
                  {isRated ? (
                    <button
                      disabled
                      className="bg-gray-400 text-white font-semibold px-6 py-2 rounded cursor-not-allowed"
                    >
                      Rated
                    </button>
                  ) : (
                    <button
                      onClick={() => setOpenRatingId(event.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
                    >
                      Rate Now
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
