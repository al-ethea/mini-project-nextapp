'use client';
import useDisplayDashboard from '../features/dashboard/hooks/useDisplayDashboard';
import Image from "next/image";

import SearchByLocation from "@/components/SearchByLocation";
import DatePicker from "@/components/DatePicker";
import EventCardList from "@/components/EventCard";
import NowWatching from "@/components/NowWatching";
import LastCallForTickets from "@/components/LastCall";
import CallToSignUp from "@/components/CallToSignUp";
import EventRating from "@/components/EventRating";
import SearchByArtistOrEvent from "@/components/SearchByArtistOrEvents";

export default function DashboardPage() {
  const { email, role, token } = useDisplayDashboard();

  return (
    <main>
 {/* Hero Section */}
      <section className="w-full min-h-screen">
        {/* carousel */}
        <div className="w-screen overflow-x-visible">
          <div className="carousel carousel-center bg-neutral rounded-none w-full">
            {[
              { src: "/travis.webp", text: "Travis Scott" },
              { src: "/gaga.jpg", text: "Lady Gaga" },
              { src: "/alexander.jpg", text: "Alexander Stewart" },
              { src: "/camila.jpg", text: "Camila Cabello" },
              { src: "/chainsmoker.jpeg", text: "The Chainsmokers" },
              { src: "/sting.jpg", text: "Sting" },
            ].map((item, index) => (
              <div className="carousel-item w-300 relative" key={index}>
                <Image
                  src={item.src}
                  className="w-full h-120 object-cover"
                  alt={`carousel-image-${index}`}
                  width={1000}
                  height={1000}
                />
                <div className="absolute bottom-25 left-10 text-gray-200 text-3xl font-bold">
                  {item.text}
                </div>
                <div className="absolute bottom-10 left-10">
                  <button className="btn bg-red-700 border-none shadow-none btn-primary">
                    More Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full h-auto -mt-2">
          <div>
            <Image
              src="/what.jpg"
              alt="Whats happening"
              className="object-cover"
              width={1450}
              height={800}
            />
          </div>
          <div className="absolute inset-0 flex justify-center mt-5">
            <h1 className="text-white text-4xl font-medium">
              WHAT'S HAPPENING IN ASIA?
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <SearchByLocation />
              <div className="pl-2 w-100 h-10">
                <DatePicker />
              </div>
              <div className="pt-2.5">
                <button className="btn ml-4 text-white bg-red-700 border-none w-30 h-13 rounded-lg">
                  Find Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-20 py-10">
        <div>
          <h1 className="text-3xl font-bold mb-6">UPCOMING SHOWS</h1>
          <EventCardList />
        </div>
        <div className="mt-14">
          <h1 className="text-3xl font-bold pb-6">WHAT WE'RE WATCHING?</h1>
          <NowWatching />
        </div>
        <div className="mt-14">
          <h1 className="text-3xl font-bold pb-6">Last Call For Tickets</h1>
          <LastCallForTickets />
        </div>
        <div className="mt-14 flex flex-col items-center justify-center">
          <SearchByArtistOrEvent />
        </div>
        <div className="mt-14 flex flex-col items-center justify-center">
          <EventRating/>
        </div>
        <div className="mt-14 flex flex-col items-center justify-center lg: -mx-20 -my-15">
          <CallToSignUp />
        </div>
      </section>
    </main>
  );
}
