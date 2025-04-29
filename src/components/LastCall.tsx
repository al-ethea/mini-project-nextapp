import Image from 'next/image';

export const events = [
  { name: 'Lady Gaga', filename: 'gaga.jpg' },
  { name: 'Elijah Woods', filename: 'elijah.jpg' },
  { name: 'Valley', filename: 'valley.jpg' },
  { name: 'Alexander Stewart', filename: 'alexander.jpg' },
];
export default function LastCallForTickets() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-3 rounded-lg">
      {events.map((event, idx) => (
        <div
          key={idx}
          className="bg-[#2f2d2d] hover:bg-[#3a3838] cursor-pointer rounded-lg overflow-hidden group relative pb-5"
        >
          <Image
            src={`/eventcard/${event.filename}`}
            alt={event.name}
            width={400}
            height={400}
            className="w-full h-[350px] object-cover group-hover:scale-110"
          />
          <div className="p-5">
            <p className="text-md font-semibold truncate">{event.name}</p>
          </div>
          <div className="absolute right-2 bottom-2 text-red-500 text-base font-bold group-hover:scale-110 transition">
            &gt;
          </div>
        </div>
      ))}
    </div>
  );
}
