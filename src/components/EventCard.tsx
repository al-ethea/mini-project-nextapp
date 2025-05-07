import Image from "next/image";

export const events = [
  { name: "Lady Gaga", filename: "gaga.jpg" },
  { name: "Elijah Woods", filename: "elijah.jpg" },
  { name: "Valley", filename: "valley.jpg" },
  { name: "Alexander Stewart", filename: "alexander.jpg" },
  { name: "Oasis", filename: "oasis.jpg" },
  { name: "BE:FIRST", filename: "befirst.webp" },
  { name: "Sting", filename: "sting.jpg" },
  { name: "The Chainsmokers", filename: "chainsmoker.jpeg" },
];

export default function EventCardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg px-4">
      {events.map((event, idx) => (
        <div
          key={idx}
          className="bg-[#2f2d2d] hover:bg-[#3a3838] cursor-pointer rounded overflow-hidden group relative"
        >
          <Image
            src={`/eventcard/${event.filename}`}
            alt={event.name}
            width={400}
            height={400}
            className="w-full h-[190px] object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="p-2">
            <p className="text-sm font-semibold truncate text-white">{event.name}</p>
          </div>
          <div className="absolute right-2 bottom-2 text-red-500 text-base font-bold group-hover:scale-110 transition-transform">
            &gt;
          </div>
        </div>
      ))}
    </div>
  );
}
