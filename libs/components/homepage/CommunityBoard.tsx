import { Box, Stack } from "@mui/material";

export default function CommunityBoard() {
    return (
       <>
         <Stack 
            style={{
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "space-between", 
                alignItems: "center",
                marginTop: "150px"
            }}
        >
            <Box>
                <p
                className="title text-3xl font-semibold"
                >
                    Our CommunityBoard
                </p>
                <p
                    className="title-desc text-sm text-slate-500  mt-2"
                >
                    Handpicked luxury accommodations for unforgettable experiences
                </p>
            </Box>
            <Box>
                <div className="flex items-center justify-end mt-6 text-sm">
                    <button
                        type="button"
                        className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium text-gray-500  transition active:scale-95"
                    >
                        <a href="#" className="group-hover:translate-x-1 transition-all">
                            CommunityBoard
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
            </Box>
        </Stack>
        <Stack>
            <div className="flex items-center gap-6 h-[400px] w-full max-w-5xl mt-10 mx-auto mt-20 mb-15">
                <div className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full">
                    <img className="h-full w-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop"
                        alt="image" />
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h1 className="text-3xl">Prompt engineers</h1>
                        <p className="text-sm">Bridging the gap between human intent and machine understanding through expert prompt design.</p>
            
                    </div>
                </div>
                <div className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full">
                    <img className="h-full w-full object-cover object-right"
                        src="https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop"
                        alt="image" />
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h1 className="text-3xl">Data scientists</h1>
                        <p className="text-sm">Bridging the gap between human intent and machine understanding through expert prompt design.</p>
            
                    </div>
                </div>
                <div className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full">
                    <img className="h-full w-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1736220690062-79e12ca75262?q=80&w=800&h=400&auto=format&fit=crop"
                        alt="image" />
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h1 className="text-3xl">Software engineers</h1>
                        <p className="text-sm">Bridging the gap between human intent and machine understanding through expert prompt design.</p>
            
                    </div>
                </div>
            </div>
        </Stack>
       </>
    );
};