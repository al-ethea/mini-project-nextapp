"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import authStore from "@/zustand/store";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  const token = authStore((state: any) => state.token);
  const email = authStore((state: any) => state.email);
  const role = authStore((state: any) => state.role);
  const setAuth = authStore((state: any) => state.setAuth);

  if (pathName === "/login" || pathName === "/register") return null;

  const handleLogout = () => {
    setAuth({ _token: null, email: null, role: null });
    router.push("/");
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap px-4 sm:px-6 py-4 bg-black text-white relative z-30">
        {/* Logo */}
        <Link
          href="/"
          className="text-red-700 font-extrabold text-2xl sm:text-3xl z-10"
        >
          LIVE NATION
        </Link>

        {/* Search Bar (Expanded) */}
        {showSearch ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black px-4 sm:px-6 z-20">
            <div className="w-full max-w-3xl flex items-center border border-white rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search by Artist and Event name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black text-white outline-none flex-grow px-2 text-sm sm:text-base"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  if (searchTerm.trim()) {
                    router.push(
                      `/allConcertsAndEvents?search=${encodeURIComponent(
                        searchTerm.trim()
                      )}`
                    );
                  }
                }}
                className="text-white"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 sm:space-x-4 z-10 mt-3 sm:mt-0">
            <div className="w-px h-5 sm:h-6 bg-white/60" />
            <button
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-white/60" />

            {/* User Auth Dropdown */}
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-white hover:text-gray-300 text-md font-semibold flex items-center gap-1 max-w-[160px] truncate"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden sm:inline">{email ?? "Account"}</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md py-2 z-50">
                    <Link href="/profile">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profile
                      </div>
                    </Link>

                    {role !== "ORGANIZER" ? (
                      <Link href="/registerOrganizer">
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Become Organizer
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Link href="/createEvents">
                          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Create Event
                          </div>
                        </Link>
                        <Link href="/myCreatedEvents">
                          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            My Created Events
                          </div>
                        </Link>
                        <Link href="/approveReceipts">
                          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Approve Receipts
                          </div>
                        </Link>
                        <Link href="/eventStats">
                          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Event Stats
                          </div>
                        </Link>
                      </>
                    )}

                    <div
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white hover:text-gray-300 text-md font-semibold flex items-center gap-1"
              >
                <User className="w-6 h-6" />
                <span className="hidden sm:inline">Login/Register</span>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Sticky Navigation Bar - Attendee Features */}
      {/* <div className="sticky top-0 z-20 bg-red-700 px-6 py-4">  */}

      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-20 bg-red-700 px-4 sm:px-6 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav className="flex space-x-6 text-sm sm:text-base font-semibold text-white">
          <Link
            href="/allConcertsAndEvents"
            className="flex items-center gap-1 hover:underline"
          >
            All Concerts & Events
            <ExternalLink className="w-3 h-3 inline" />
          </Link>
          <Link href="/myOrderedEvents" className="hover:underline">
            My Ordered Events
          </Link>
          <Link href="#" className="hover:underline">
            VIP Experiences
          </Link>
          <Link href="#" className="flex items-center gap-1 hover:underline">
            First To Know
            <ExternalLink className="w-3 h-3 inline" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
