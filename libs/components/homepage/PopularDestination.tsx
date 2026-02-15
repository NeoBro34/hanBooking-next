import React, { useState }  from 'react';
import { NextPage } from "next";
import { Box, Container, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const PopularDestination: NextPage = ({ initialInput, ...props }: any) => {
    const [popularDestination, setPopularDestination] = useState<number[]>(initialInput);

    const [stopScroll, setStopScroll] = React.useState(false);
    const cardData = [
        {
            title: "Seoul",
            image: "img/destinations/seoul.png",
        },
        {
            title: "Busan",
            image: "img/destinations/busan.png",
        },
        {
            title: "Incheon",
            image: "img/destinations/incheon.png",
        },
        {
            title: "Daegu",
            image: "img/destinations/daegu.png",
        },
        {
            title: "Daejeon",
            image: "img/destinations/daejeon.png",
        },
        {
            title: "Gwangju",
            image: "img/destinations/gwangju.png",
        },
        {
            title: "Ulsan",
            image: "img/destinations/ulsan.png",
        },
        {
            title: "Sejong",
            image: "img/destinations/sejong.png",
        },
        {
            title: "Gyeonggi-do",
            image: "img/destinations/gyeonggi-do.png",
        },
        {
            title: "Gangwon-do",
            image: "img/destinations/Gangwon-do.png",
        },
        {
            title: "Chungcheongbuk-do",
            image: "img/destinations/Chungcheongbuk-do.png",
        },
        {
            title: "Chungcheongnam-do",
            image: "img/destinations/Chungcheongnam-do.png",
        },
        {
            title: "Jeollabuk-do",
            image: "img/destinations/Jeollabuk-do.png",
        },
        {
            title: "Jeollanam-do",
            image: "img/destinations/Jeollanam-do.png",
        },
        {
            title: "Gyeongsangbuk-do",
            image: "img/destinations/Gyeongsangbuk-do.png",
        },
        {
            title: "Gyeongsangnam-do",
            image: "img/destinations/Gyeongsangnam-do.png",
        },
        {
            title: "Jeju",
            image: "img/destinations/jeju.png",
        },
    ];

   return (
    <>
        <Container>
            <Stack 
                style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginTop: "100px"
                }}
            >
                <Box>
                    <p
                    className="title text-3xl font-semibold"
                    >
                        Popular Destination
                    </p>
                    <p
                        className="title-desc text-sm text-slate-500  mt-2"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </Box>
                <Box>
                    <div className="flex items-center justify-end mt-6 text-sm">
                        <button
                            type="button"
                            className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium   text-gray-500  transition active:scale-95"
                        >
                            <a href="#" className="group-hover:translate-x-1 transition-all">
                                See All Destination
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
            <Stack className="popular-destanation">
                <div className="overflow-hidden w-full relative max-w-6xl mx-auto rounded-full" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                    <div className="absolute left-0 top-0 h-full w-35 z-50 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                    <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 3000 + "ms" }}>
                        <div className="flex">
                            {[...cardData, ...cardData].map((card, index) => (
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
                                    <div key={index} className="w-56 mx-4 h-[18rem] relative group hover:scale-90 transition-all duration-300">
                                        <img src={card.image} alt="card" className="w-full h-full object-cover rounded-full" />
                                        <div className="flex items-end justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20 rounded-full">
                                            <a href='#' className="flex justify-center  text-white text-lg mb-10 cursor-pointer gap-2">
                                                View All
                                                <NorthEastIcon/>
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-lg font-semibold text-center"><LocationOnIcon />{card.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                <div className="absolute right-0 top-0 h-full w-10 md:w-40 z-50 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
            </Stack>
        </Container>
    </>
   )
}

PopularDestination.defaultProps = {
    initialInput: [1, 2, 3, 4, 5, 6, 7]
};

export default PopularDestination;