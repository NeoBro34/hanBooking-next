import { Container, Stack } from "@mui/material";

export default function About() {
    return (
        <div className="mt-20px">
            <section className="flex flex-col md:flex-row items-center justify-center gap-10 mt-70 mb-50">
                <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
                    <img className="max-w-md w-full object-cover rounded-2xl"
                        src="img/banner/seoul.jpg"
                        alt="" />
                    <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl">
                        <div className="flex -space-x-4 shrink-0">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                                alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]" />
                            <div
                                className="flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-[4]">
                                50+
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-800">Stay with us</p>
                    </div>
                </div>
                <div className="text-sm text-slate-600 max-w-lg">
                    <h1 className="text-xl uppercase font-semibold text-slate-700">What we do?</h1>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
                    <p className="mt-8">Discover the best hotels, apartments, and resorts at the best prices.Compare options and book your perfect stay and quickly.</p>
                    <p className="mt-4">Whether you're traveling for vacation, business, or family trip — we help you find comfort, convenience, and great value.</p>
                    <p className="mt-4">Thousands of happy guests book with us every day.Your perfect stay is just one click away.</p>
                    <button
                        type="button"
                        className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium   text-gray-500  transition active:scale-95 bg-gradient-to-r from-yellow-600 to-[#4e4b4b] py-3 px-8 rounded-full text-white hover:translate-x-0.5 transition mt-10"
                    >
                        <a href="#" className="group-hover:translate-x-1 transition-all">
                            All Stays
                        </a>
                        <svg
                            className="group-hover:translate-x-3 transition-all"
                            width="15"
                            height="11"
                            viewBox="0 0 15 11"
                            fill="none"
                        >
                            <path
                                d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    );
};