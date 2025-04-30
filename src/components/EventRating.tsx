'use client'

import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { format } from 'date-fns'

type AttendedEvent = {
  id: number
  title: string
  date: string
  hasRated: boolean
}

const attendedEvents: AttendedEvent[] = [
  {
    id: 1,
    title: 'Coldplay: Music Of The Spheres World Tour',
    date: '2025-04-25',
    hasRated: false,
  },
  {
    id: 2,
    title: 'The Click 2025 Tour in Singapore',
    date: '2025-04-10',
    hasRated: true,
  },
]

export default function MyEventRatings() {
  const [openRatingId, setOpenRatingId] = useState<number | null>(null)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [ratedEvents, setRatedEvents] = useState<number[]>([])

  const handleSubmit = (eventId: number) => {
    console.log(`Submit rating ${rating} for event ${eventId}`)
    setRatedEvents([...ratedEvents, eventId])
    setOpenRatingId(null)
    setRating(0)
  }

  const today = new Date()

  const completedEvents = attendedEvents.filter(
    e => new Date(e.date) < today
  )

  return (
    <div className=" bg-black px-4 py-6 text-white w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Share your experience with us</h1>

      {completedEvents.length === 0 && (
        <p className="text-center text-neutral-400">You have no past events yet.</p>
      )}

      <div className="w-full max-w-4xl mx-auto">
        {completedEvents.map(event => {
          const isRated = event.hasRated || ratedEvents.includes(event.id)
          
          return (
            <div key={event.id} className="bg-neutral-800 p-6 rounded-xl mb-6 shadow-lg w-full">
              <div className="flex justify-between items-center w-full">
                <div className="w-2/3">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-neutral-400 text-sm">
                    {format(new Date(event.date), 'PPP')}
                  </p>
                </div>
                <div>
                  {isRated ? (
                    <button
                      disabled
                      className="bg-neutral-700 text-neutral-400 px-5 py-2 rounded-md font-semibold cursor-not-allowed"
                    >
                      Rated
                    </button>
                  ) : (
                    <button
                      onClick={() => setOpenRatingId(event.id)}
                      className="bg-red-700 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold"
                    >
                      Rate Event
                    </button>
                  )}
                </div>
              </div>

              {/* Modal for rating */}
              {openRatingId === event.id && (
                <div className="mt-6 w-full">
                  <h3 className="text-lg font-semibold text-center mb-4">Rate "{event.title}"</h3>
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FaStar
                        key={star}
                        size={36}
                        className={`cursor-pointer transition ${
                          (hover || rating) >= star ? 'text-yellow-400' : 'text-neutral-600'
                        }`}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleSubmit(event.id)}
                      disabled={rating === 0}
                      className="bg-red-800 hover:bg-red-700 transition px-6 py-2 rounded-md font-semibold disabled:opacity-50"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setOpenRatingId(null)}
                      className="bg-neutral-700 hover:bg-neutral-600 px-6 py-2 rounded-md font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}