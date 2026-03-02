import { Box, Container, Stack } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from "@mui/material/Badge";
import { NextPage } from "next";

const topAgent = [1,2,3,4,5,6,7,8,9];


const TopAgents = () => {
    return (
        <div className="top-agents">
            <Stack 
                style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginTop: "20px"
                }}
            >
                <Box>
                    <p
                    className="title text-3xl font-semibold"
                    >
                        Top Agents
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
                            className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium   text-gray-500  transition active:scale-95"
                        >
                            <a href="#" className="group-hover:translate-x-1 transition-all">
                                All Agents
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
            <Stack className="scroll-box flex flex-col bg-white m-auto p-auto mt-20">
                    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                        {topAgent.map((agent, index) => (
                            <div key={index} className="flex flex-nowrap lg:ml-5 md:ml-5 ml-5 mt-5 cursor-pointer">
                                <Stack className="overflow-hidden hover:-translate-y-1 transition duration-300">
                                    <Box className="w-65 flex justify-center ">
                                        <div className="bg-black text-white rounded-2xl">
                                            <div className="relative -mt-px overflow-hidden rounded-2xl">
                                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600" alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>
                                                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                                            </div>
                                            <div className="px-4 pb-6 text-center">
                                                <p className="mt-4 text-lg">John Doe</p>
                                                <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">AGENT</p>
                                            </div>
                                        </div>
                                    </Box>
                                </Stack>
                            </div>
                        ))}
                    </div>
                </Stack>
        </div>
    );
}

export default TopAgents;