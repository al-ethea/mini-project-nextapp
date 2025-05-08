import Image from 'next/image';

export const events = [
  { name: 'Lady Gaga', filename: 'gaga.jpg' },
  { name: 'Elijah Woods', filename: 'elijah.jpg' },
  { name: 'Valley', filename: 'valley.jpg' },
  { name: 'Alexander Stewart', filename: 'alexander.jpg' },
];

export default function LastCallForTickets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg">
      {events.map((event, idx) => (
        <div
          key={idx}
          className="bg-[#2f2d2d] hover:bg-[#3a3838] cursor-pointer rounded-lg overflow-hidden group relative"
        >
          <Image
            src={`/eventcard/${event.filename}`}
            alt={event.name}
            width={400}
            height={400}
            className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover group-hover:scale-110 transition duration-300"
          />
          <div className="p-4">
            <p className="text-md font-semibold truncate text-white">
              {event.name}
            </p>
          </div>
          <div className="absolute right-2 bottom-2 text-red-500 text-base font-bold group-hover:scale-110 transition">
            &gt;
          </div>
        </div>
      ))}
    </div>
  );
}
