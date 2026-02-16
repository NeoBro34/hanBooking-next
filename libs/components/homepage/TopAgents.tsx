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
                                <Stack className="bg-white rounded-2xl pb-4 overflow-hidden border border-gray-200 hover:-translate-y-1 transition duration-300">
                                    <Box className="w-64 flex justify-center pt-10">
                                        <div className="w-30 h-30 rounded-full overflow-hidden">
                                            <img className="h-32 object-cover object-top" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="userImage2"/>
                                        </div>
                                    </Box>
                                    <FavoriteIcon style={{position:"relative", marginLeft:"160px", marginTop:"-30px", color:"red"}}/>
                                    <Box className="flex flex-col items-center">
                                        <p className="font-medium mt-3">Kelvin John</p>
                                        <p className="text-gray-500 text-sm">kelvin.john@gmail.com</p>
                                        <button className="flex flex-row border text-sm text-gray-500 bg-yellow-500 hover:bg-yellow-600 border-gray-200 hover:bg-gray-100 transition cursor-pointer px-6 py-1 rounded-full mt-5">
                                            <img src="img/icons/followers.png" className="w-4 h-4 mr-3" alt="" />
                                            <p className="">Follow</p>
                                        </button>
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