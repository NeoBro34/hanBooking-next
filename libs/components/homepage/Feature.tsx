import { Container } from "@mui/material";

const Features = () => {
    return(
        <Container>
            <h1 className="text-3xl font-semibold text-center mx-auto mt-40">
                Everything You Need for Hotel Booking
            </h1>

            <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
                Discover, compare, and book the perfect hotel anywhere — fast, secure, and hassle-free.
            </p>

            <div className="flex items-center justify-end mt-6 text-sm">
                <button
                type="button"
                className="group flex items-center gap-2 px-8 py-3 cursor-pointer font-medium border border-gray-300 rounded-full text-gray-600 hover:bg-gray-300 transition active:scale-95"
                >
                <a href="#">Book a Hotel</a>
                <svg
                    className="group-hover:translate-x-1 transition-all"
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

            <div className="flex items-center justify-center gap-6 mt-10 cursor-pointer">
                {/* Real-Time Availability */}
                <div className="flex flex-col text-center items-center justify-center rounded-xl p-6 border border-violet-200 gap-6 max-w-sm">
                <div className="p-6 aspect-square bg-violet-100 rounded-full">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14M3 12h18M7 21v-4m10 4v-4"
                        stroke="#7F22FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-700">
                    Real-Time Availability
                    </h3>
                    <p className="text-sm text-slate-600">
                    See available rooms and prices instantly with live updates.
                    </p>
                </div>
                </div>

                {/* Secure Payments */}
                <div className="flex flex-col text-center items-center justify-center rounded-xl p-6 border border-green-200 gap-6 max-w-sm cursor-pointer">
                <div className="p-6 aspect-square bg-green-100 rounded-full">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4Z"
                        stroke="#00A63E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 12h6m-4 3h2"
                        stroke="#00A63E"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-700">
                    Secure Payments
                    </h3>
                    <p className="text-sm text-slate-600">
                    Pay safely with encrypted transactions and trusted payment methods.
                    </p>
                </div>
                </div>

                {/* Flexible Booking */}
                <div className="flex flex-col text-center items-center justify-center rounded-xl p-6 border border-orange-200 gap-6 max-w-sm cursor-pointer">
                <div className="p-6 aspect-square bg-orange-100 rounded-full">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M3 8h18M7 3v4m10-4v4M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                        stroke="#F54900"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 14l2 2m0-2-2 2"
                        stroke="#F54900"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-700">
                    Flexible Booking
                    </h3>
                    <p className="text-sm text-slate-600">
                    Free cancellation options and easy booking management anytime.
                    </p>
                </div>
                </div>
            </div>
        </Container>
    );
};

export default Features;