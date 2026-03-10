import React, { useState }  from 'react';
import { NextPage } from "next";
import { Box, Container, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { PropertyLocation } from '@/libs/enums/property.enum';
import useDeviceDetect from '@/libs/hooks/useDeviceDetect';

const PopularDestination: NextPage = ({ initialInput, ...props }: any) => {
    const [popularDestination, setPopularDestination] = useState<number[]>(initialInput);
    const router = useRouter();
    const device = useDeviceDetect();
    const { t } = useTranslation('common');

    const handleDestinationClick = (location: PropertyLocation) => {
        const input = {
            page: 1,
            limit: 6,
            search: {
                locationList: [location]
            }
        };

        router.push({
            pathname: "/stays",
            query: {
                input: JSON.stringify(input)
            }
        });
    };

    const [stopScroll, setStopScroll] = React.useState(false);
    const cardData = [
        {
            title: "Seoul",
            location: PropertyLocation.SEOUL,
            image: "/img/destinations/seoul.png",
        },
        {
            title: "Busan",
            location: PropertyLocation.BUSAN,
            image: "/img/destinations/busan.png",
        },
        {
            title: "Incheon",
            location: PropertyLocation.INCHEON,
            image: "/img/destinations/incheon.png",
        },
        {
            title: "Daegu",
            location: PropertyLocation.DAEGU,
            image: "/img/destinations/daegu.png",
        },
        {
            title: "Daejeon",
            location: PropertyLocation.DAEJON,
            image: "/img/destinations/daejeon.png",
        },
        {
            title: "Gwangju",
            location: PropertyLocation.GWANGJU,
            image: "/img/destinations/gwangju.png",
        },
        {
            title: "Ulsan",
            location: PropertyLocation.ULSAN,
            image: "/img/destinations/ulsan.png",
        },
        {
            title: "Sejong",
            location: PropertyLocation.SEJONG,
            image: "/img/destinations/sejong.png",
        },
        {
            title: "Gyeonggi",
            location: PropertyLocation.GYEONGGI,
            image: "/img/destinations/gyeonggi-do.png",
        },
        {
            title: "Gangwon",
            location: PropertyLocation.GANGWON,
            image: "/img/destinations/Gangwon-do.png",
        },
        {
            title: "Chungcheongbuk",
            location: PropertyLocation.CHUNGCHEONGBUK,
            image: "/img/destinations/Chungcheongbuk-do.png",
        },
        {
            title: "Chungcheongnam",
            location: PropertyLocation.CHUNGCHEONGNAM,
            image: "/img/destinations/Chungcheongnam-do.png",
        },
        {
            title: "Jeollabuk",
            location: PropertyLocation.JEOLLABUK,
            image: "/img/destinations/Jeollabuk-do.png",
        },
        {
            title: "Jeollanam",
            location: PropertyLocation.JEOLLANAM,
            image: "/img/destinations/Jeollanam-do.png",
        },
        {
            title: "Gyeongsangbuk",
            location: PropertyLocation.GYEONGSANGBUK,
            image: "/img/destinations/Gyeongsangbuk-do.png",
        },
        {
            title: "Gyeongsangnam",
            location: PropertyLocation.GYEONGSANGNAM,
            image: "/img/destinations/Gyeongsangnam-do.png",
        },
        {
            title: "Jeju",
            location: PropertyLocation.JEJU,
            image: "/img/destinations/jeju.png",
        },
    ];

    if (device === 'mobile') {
		return <>
            <Stack 
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 2, sm: 0 },
                    mt: { xs: 6, md: 12 },
                }}
            >
                <Box>
                    <p
                    className="title text-3xl font-semibold"
                    >
                        {t('Popular Destination')}
                    </p>
                    <p
                        className="title-desc text-sm text-slate-500  mt-2"
                    >
                        {t('Discover top destinations and explore the best stays for your next trip.')}
                    </p>
                </Box>
                <Box>
                    <div className="flex items-center justify-start sm:justify-end mt-2 sm:mt-6 text-sm">
                        <button
                            type="button"
                            className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium   text-gray-500  transition active:scale-95"
                        >
                            <Link href="/stays" className="group-hover:translate-x-1 transition-all">
                                {t('See All Destination')}
                            </Link>
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
                {/* Mobile: swipeable list */}
                <div className="block sm:hidden w-full mt-6">
                    <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory hide-scroll-bar">
                        {cardData.map((card) => (
                            <div key={card.location} className="snap-start shrink-0 w-40">
                                <div
                                    onClick={() => handleDestinationClick(card.location)}
                                    className="w-40 h-40 relative rounded-full overflow-hidden"
                                >
                                    <img src={card.image} alt="card" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/15" />
                                </div>
                                <p className="text-gray-700 text-sm font-semibold text-center mt-2">
                                    <LocationOnIcon sx={{ fontSize: 18 }} />
                                    {t(card.title)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: auto marquee */}
                <div className="hidden sm:block overflow-hidden w-full relative max-w-6xl mx-auto rounded-full" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                    <div className="absolute left-0 top-0 h-full w-35 z-50 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                    <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 3000 + "ms" }}>
                        <div className="flex">
                            {[...cardData, ...cardData].map((card, index) => (
                                <div key={index} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
                                    <div
                                        onClick={() => handleDestinationClick(card.location)} 
                                        className="w-56 mx-4 h-[18rem] relative group hover:scale-90 transition-all duration-300">
                                        <img src={card.image} alt="card" className="w-full h-full object-cover rounded-full" />
                                        <div className="flex items-end justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20 rounded-full">
                                            <span className="flex justify-center text-white text-lg mb-10 cursor-pointer gap-2">
                                                {t('View All')}
                                                <NorthEastIcon/>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-lg font-semibold text-center"><LocationOnIcon />{t(card.title)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                <div className="absolute right-0 top-0 h-full w-10 md:w-40 z-50 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
            </Stack>
        </>
	} else { 
    return (
        <>
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
                        {t('Popular Destination')}
                    </p>
                    <p
                        className="title-desc text-sm text-slate-500  mt-2"
                    >
                        {t('Discover top destinations and explore the best stays for your next trip.')}
                    </p>
                </Box>
                <Box>
                    <div className="flex items-center justify-end mt-6 text-sm">
                        <button
                            type="button"
                            className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium   text-gray-500  transition active:scale-95"
                        >
                            <Link href="/stays" className="group-hover:translate-x-1 transition-all">
                                {t('See All Destination')}
                            </Link>
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
                                <div key={index} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
                                    <div
                                        onClick={() => handleDestinationClick(card.location)} 
                                        className="w-56 mx-4 h-[18rem] relative group hover:scale-90 transition-all duration-300">
                                        <img src={card.image} alt="card" className="w-full h-full object-cover rounded-full" />
                                        <div className="flex items-end justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20 rounded-full">
                                            <span className="flex justify-center text-white text-lg mb-10 cursor-pointer gap-2">
                                                {t('View All')}
                                                <NorthEastIcon/>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-lg font-semibold text-center"><LocationOnIcon />{t(card.title)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                <div className="absolute right-0 top-0 h-full w-10 md:w-40 z-50 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
            </Stack>
        </>
    )}
}

PopularDestination.defaultProps = {
    initialInput: [1, 2, 3, 4, 5, 6, 7]
};

export default PopularDestination;
