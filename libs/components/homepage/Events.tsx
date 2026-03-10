import { Stack } from "@mui/material";
import EventCard from "./EventCard";
import { useTranslation } from 'next-i18next';

const events = [
  {
    id: 1,
    title: "Seoul Summer Music Festival",
    location: "Olympic Park, Seoul",
    time: "7:00 PM - 11:00 PM",
    date: "21",
    month: "AUG",
    rating: 4.8,
    reviews: 120,
    images: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      "https://images.unsplash.com/photo-1518972559570-0b1f47e0a61b",
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
    ]
  },
  {
    id: 2,
    title: "Korean Street Food Festival",
    location: "Hongdae Street, Seoul",
    time: "5:00 PM - 10:00 PM",
    date: "14",
    month: "SEP",
    rating: 4.7,
    reviews: 95,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
    ]
  },
  {
    id: 3,
    title: "Night City Marathon",
    location: "Han River Park",
    time: "9:00 PM - 1:00 AM",
    date: "02",
    month: "OCT",
    rating: 4.9,
    reviews: 210,
    images: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
      "https://images.unsplash.com/photo-1486218119243-13883505764c"
    ]
  },
  {
    id: 4,
    title: "Startup Tech Conference",
    location: "COEX Convention Center",
    time: "10:00 AM - 6:00 PM",
    date: "12",
    month: "NOV",
    rating: 4.6,
    reviews: 80,
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a"
    ]
  },
  {
    id: 5,
    title: "International Art Expo",
    location: "Dongdaemun Design Plaza",
    time: "11:00 AM - 8:00 PM",
    date: "28",
    month: "JUL",
    rating: 4.7,
    reviews: 150,
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
    ]
  },
  {
    id: 6,
    title: "K-Pop Live Concert",
    location: "Jamsil Stadium",
    time: "8:00 PM - 11:30 PM",
    date: "09",
    month: "DEC",
    rating: 4.9,
    reviews: 320,
    images: [
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063"
    ]
  },
  {
    id: 7,
    title: "Winter Lantern Festival",
    location: "Cheonggyecheon Stream",
    time: "6:00 PM - 10:00 PM",
    date: "18",
    month: "JAN",
    rating: 4.8,
    reviews: 140,
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
    ]
  }
];

export default function EventList() {
    const { t } = useTranslation('common');
    
  return (
    <>
      <style>
        {`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        `}
      </style>
        <Stack>
            <h1 className="text-2xl sm:text-3xl font-semibold text-center mx-auto mt-16 sm:mt-40 px-4">
                {t('Discover Exciting Events Around You')}
            </h1>

            <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto px-4">
                {t('Explore concerts, festivals, conferences, and cultural gatherings happening near you and be part of unforgettable experiences.')}
            </p>
        </Stack>
      <div className="overflow-hidden w-full py-10 ">
        <div className="flex gap-6 w-max animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
          
          {events.concat(events).map((event, index) => (
            <div key={index} className="min-w-[320px]">
              <EventCard event={event} />
            </div>
          ))}

        </div>
      </div>
    </>
  );
}