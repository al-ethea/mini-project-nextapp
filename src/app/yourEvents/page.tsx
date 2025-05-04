'use client';

import Image from 'next/image';
import { useState } from 'react';

const dummyEvents = [
  {
    id: 1,
    dateStart: '2025-05-06',
    dateEnd: '2025-05-07',
    artist: 'The Click Five',
    title: 'The Click 2025 Tour in Singapore',
    location: 'Capitol Theatre - Singapore',
    city: 'Singapore',
    image: '/images/the-click-five.jpg', // ganti sesuai asset kamu
    status: 'Find Tickets',
  },
  {
    id: 2,
    dateStart: '2025-05-10',
    artist: 'j-hope',
    title: "j-hope Tour 'HOPE ON THE STAGE' in BANGKOK",
    location: 'Impact Arena, Muang Thong Thani',
    city: 'Bangkok',
    image: '/images/jhope-tour.jpg',
    status: 'Find Tickets',
  },
  // Tambahkan data dummy lainnya sesuai kebutuhan
];

export default function EventPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 text-black px-45 pt-4 pb-8">
      {/* Filters */}
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
        <div className="flex gap-4">
          <button className="border px-4 py-2 rounded">Date</button>
          <button className="border px-4 py-2 rounded">All Locations</button>
          <button className="border px-4 py-2 rounded">Genres</button>
        </div>
      </div>

      {/* Event List */}
      <div>
        <p className="text-gray-600 font-semibold my-6">94 RESULTS</p>

        <div className="flex flex-col gap-4">
          {dummyEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md flex overflow-hidden"
            >
              {/* Date */}
              <div className="bg-white p-4 flex flex-col items-center justify-center w-24">
                <p className="text-lg font-bold">
                  {new Date(event.dateStart).getDate()}
                </p>
                <p className="text-xs uppercase">
                  {new Date(event.dateStart).toLocaleString('default', {
                    month: 'short',
                  })}
                </p>
                <p className="text-xs">
                  {new Date(event.dateStart).getFullYear()}
                </p>
              </div>

              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold">{event.title}</h2>
                  <p className="text-sm text-gray-600">{event.artist}</p>
                  <p className="text-sm text-gray-500">
                    {event.city} | {event.location}
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="p-4 flex items-center">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded">
                  {event.status}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          <button className="text-gray-400" disabled>
            First
          </button>
          <button className="w-8 h-8 rounded-full bg-red-600 text-white">
            1
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200">2</button>
          <button className="w-8 h-8 rounded-full bg-gray-200">3</button>
          <button className="w-8 h-8 rounded-full bg-gray-200">4</button>
          <button className="text-gray-400" disabled>
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
