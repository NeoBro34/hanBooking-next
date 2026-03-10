import { useState } from "react";
type Event = {
  id: number
  title: string
  location: string
  time: string
  date: string
  month: string
  rating: number
  reviews: number
  images: string[]
}

type EventCardProps = {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const [liked, setLiked] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? event.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="group relative  rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">

      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={event.images[imageIndex]}
          alt={event.title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>

        {/* bookmark */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4  backdrop-blur p-2 rounded-full hover:scale-110 transition"
        >
          {liked ? "❤️" : "🤍"}
        </button>

        {/* image navigation */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          ◀
        </button>

        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          ▶
        </button>

        {/* date */}
        <div className="absolute top-4 left-4 bg-white dark:bg-zinc-800 px-3 py-2 rounded-xl text-center shadow">
          <p className="text-sm text-gray-400 font-bold">{event.date}</p>
          <p className="text-xs text-gray-500">{event.month}</p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-600 group-hover:text-indigo-600 transition">
          {event.title}
        </h3>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          📍 {event.location}
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          🕒 {event.time}
        </div>

      </div>

    </div>
  );
}