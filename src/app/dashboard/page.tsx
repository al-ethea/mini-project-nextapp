"use client";
import useDisplayDashboard from "../features/dashboard/hooks/useDisplayDashboard";
import Image from "next/image";
import EventCardList from "@/components/EventCard";
import NowWatching from "@/components/NowWatching";
import LastCallForTickets from "@/components/LastCall";
import CallToSignUp from "@/components/CallToSignUp";
import EventRating from "@/components/EventRating";
import SearchByArtistOrEvent from "@/components/SearchByArtistOrEvents";
import Carousel from "@/components/Carousel";
import EventSearchForm from "@/components/HandleSubmitFilter";

export default function DashboardPage() {
  const { email, role, token } = useDisplayDashboard();

  return (
    <main>
      {/* Hero Section */}
      <section className="w-full min-h-screen">
        {/* carousel */}
        <div className="w-screen overflow-x-visible px-0">
          <Carousel />
        </div>

        <div className="relative w-full h-auto -mt-2">
          <div>
            <Image
              src="/what.jpg"
              alt="Whats happening"
              className="object-cover w-full"
              width={1450}
              height={800}
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center">
              WHAT'S HAPPENING IN ASIA?
            </h1>
            <EventSearchForm />
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-black text-white sm:px-10 py-10 space-y-14">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-6">
            UPCOMING SHOWS
          </h1>
          <EventCardList />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left sm:px-10 pb-6">
            WHAT WE'RE WATCHING?
          </h1>
          <NowWatching />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left sm:px-10 pb-6">
            Last Call For Tickets
          </h1>
          <LastCallForTickets />
        </div>

        <div className="flex flex-col items-center justify-center">
          <SearchByArtistOrEvent />
        </div>
        {/* 
        <div className="flex flex-col items-center justify-center">
          <EventRating />
        </div> */}

        <div className="flex flex-col items-center justify-center px-0">
          <CallToSignUp />
        </div>
      </section>
    </main>
  );
}
