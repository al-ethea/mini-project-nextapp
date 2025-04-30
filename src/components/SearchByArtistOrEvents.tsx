'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { id as localeID } from 'date-fns/locale'

type EventType = {
  id: number
  title: string
  artist: string
  location: string
  image: string
  date: string
  soldOut?: boolean
}

const dummyEvents: EventType[] = [
  {
    id: 1,
    title: 'Coldplay: Music Of The Spheres World Tour – delivered by DHL',
    artist: 'Coldplay',
    location: 'Seoul | 고양종합운동장',
    image: '/events/coldplay.jpg',
    date: '2025-04-25',
  },
  {
    id: 2,
    title: 'The Click 2025 Tour in Singapore',
    artist: 'The Click Five',
    location: 'Singapore | Capitol Theatre - Singapore',
    image: '/events/clickfive.jpg',
    date: '2025-05-06',
  },
  {
    id: 3,
    title: "j-hope Tour 'HOPE ON THE STAGE' in BANGKOK",
    artist: 'j-hope',
    location: 'Bangkok | Impact Arena, Muang Thong Thani',
    image: '/events/jhope1.jpg',
    date: '2025-05-10',
    soldOut: true,
  },
  {
    id: 4,
    title: 'SB19: Simula at Wakas World Tour Kickoff',
    artist: 'SB19',
    location: 'Bulacan | Philippine Arena',
    image: '/events/sb19.jpg',
    date: '2025-06-01',
  },
  // Add more if needed...
]

const EVENTS_PER_PAGE = 3

export default function SearchByArtistOrEvent() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filteredEvents = useMemo(() => {
    return dummyEvents.filter(e =>
      `${e.title} ${e.artist}`.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const groupedByMonth = useMemo(() => {
    const group: Record<string, EventType[]> = {}

    filteredEvents.forEach(event => {
      const date = new Date(event.date)
      const monthYear = format(date, 'MMMM yyyy', { locale: localeID })

      if (!group[monthYear]) group[monthYear] = []
      group[monthYear].push(event)
    })

    return group
  }, [filteredEvents])

  const pagedEvents = useMemo(() => {
    const allEvents = Object.entries(groupedByMonth)
      .sort(([a], [b]) => new Date(groupedByMonth[a][0].date).getTime() - new Date(groupedByMonth[b][0].date).getTime())

    const flatEvents = allEvents.flatMap(([month, events]) =>
      events.map(event => ({ ...event, group: month }))
    )

    const start = (page - 1) * EVENTS_PER_PAGE
    return flatEvents.slice(start, start + EVENTS_PER_PAGE)
  }, [groupedByMonth, page])

  const totalPages = Math.ceil(
    Object.values(groupedByMonth).flat().length / EVENTS_PER_PAGE
  )

  return (
    <div className="bg-black text-white w-full">
      <div>
        <input
          type="text"
          placeholder="Search by Artist or Event"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-full mb-6 rounded-full px-6 py-3 text-white bg-[#2f2d2d] placeholder:text-neutral-400"
        />

        {pagedEvents.length === 0 && (
          <p className="text-center text-neutral-400">No events found.</p>
        )}

        {pagedEvents.map((event, idx) => {
          const showMonth =
            idx === 0 || event.group !== pagedEvents[idx - 1]?.group
          return (
            <div key={event.id}>
              {showMonth && (
                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {event.group}
                </h2>
              )}
              <div className="flex items-center gap-4 bg-neutral-800 rounded-lg p-4 mb-4">
                <div className="flex flex-col items-center justify-center w-16">
                  <span className="text-sm font-bold text-neutral-400">
                    {format(new Date(event.date), 'EEE').toUpperCase()}
                  </span>
                  <span className="text-3xl font-bold">
                    {format(new Date(event.date), 'dd')}
                  </span>
                  <span className="text-sm text-neutral-400">
                    {format(new Date(event.date), 'MMM').toUpperCase()}
                  </span>
                </div>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={100}
                  height={60}
                  className="object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-neutral-400 text-sm">{event.artist}</p>
                  <p className="text-neutral-400 text-sm">{event.location}</p>
                </div>
                <div>
                  {event.soldOut ? (
                    <div className="text-sm text-red-400">
                      <button className="border px-3 py-1 rounded text-white text-xs border-red-400">
                        More Info
                      </button>
                      <p className="text-xs mt-1">TICKETS SOLD OUT</p>
                    </div>
                  ) : (
                    <button className="bg-red-600 hover:bg-red-700 transition text-white text-sm font-semibold px-4 py-2 rounded">
                      Find Tickets
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? 'bg-red-600 text-white'
                    : 'bg-[#2f2d2d] text-white/50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}