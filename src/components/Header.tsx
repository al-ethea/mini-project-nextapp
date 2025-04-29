'use client';

import { useState } from 'react';
import { Search, X, User, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="w-full">
      {/* Top Header - Logo & Search */}
      <div className="flex items-center justify-between px-6 py-4 bg-black text-white relative z-30 whitespace-nowrap">
        {/* Logo */}
        <Link href="/" className="text-red-700 font-extrabold text-3xl z-10">
          LIVE NATION
        </Link>

        {/* Search Mode */}
        {showSearch ? (
          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black px-6 z-0">
            <div className="w-full max-w-3xl flex items-center border border-white rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search by Artist, Venue or Event"
                className="bg-black text-white outline-none flex-grow px-2"
              />
              
              <button
                onClick={() => setShowSearch(false)}
                className="text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4 z-10">
            <div className="w-px h-6 bg-white/60" />
            <button
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-white/60" />
            <Link
              href="#"
              className="text-white hover:text-gray-300 text-md font-semibold flex items-center gap-1"
            >
              <User className="w-6 h-6" />
              Login/Register
            </Link>
          </div>
        )}
      </div>

      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-20 bg-red-700 px-6 py-4">
        <nav className="flex space-x-6 text-md font-semibold text-white">
          <Link href="#" className="flex items-center gap-1 hover:underline">
            All Concerts & Events
            <ExternalLink className="w-3 h-3 inline" />
          </Link>
          <Link href="#" className="hover:underline">
            Festivals
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
