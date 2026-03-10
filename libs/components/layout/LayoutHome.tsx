import Footer from "@/libs/components/Footer";
import Top from "@/libs/components/Top";
import { Stack } from "@mui/material"
import Head from "next/head"
import HeaderFilter from "../homepage/HeaderFilter";
import { useEffect, useRef } from "react";
import Chat from "../Chat";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";


const withLayoutMain = (Component: any) => {
    return (props: any) => {
        const device = useDeviceDetect();

        const videoRef = useRef<HTMLVideoElement | null>(null);
        useEffect(() => {
            if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
            }
        }, []);

        if (device === 'mobile') {
            return (
                <>
                    <Head>
                        <title>HanBooking</title>
                        <meta name={'title'} content={`HanBooking`} />
                    </Head>
                    <Stack id="mobile-wrap">
                        <Stack id={"top"}>
                            <Top />
                        </Stack>

                        <Stack className="relative w-full overflow-hidden bg-black">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-70"
                                style={{ backgroundImage: `url(/img/banner/seoul.jpg)` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                            <Stack className="relative z-10 px-4 pt-28 pb-10">
                                <HeaderFilter />
                            </Stack>
                        </Stack>

                        <Stack id={"main"}>
                            <Component {...props} />
                        </Stack>

                        {/* <Chat /> */}

                        <Stack id={"footer"}>
                            <Footer />
                        </Stack>
                    </Stack>
                </>
            );
        }

        return(
            <>
                <Head>
                    <title>HanBooking</title>
                    <meta name={'title'} content={`HanBooking`} />
                </Head>
                <Stack id="pc-wrap">
                    <Stack id= {"top"}>
                        <Top />
                    </Stack>
                    <Stack className="relative w-full h-screen overflow-hidden">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            ref={videoRef}
                            className="absolute inset-[100px] w-[calc(100%-200px)] h-[calc(100%-200px)] object-cover rounded-3xl"
                        >
                            <source src="/video/home-bg.mp4" type="video/mp4" />
                        </video>
                        <Stack className="absolute inset-0 z-10 flex items-center justify-center text-white px-6">
                            <Stack className="container max-w-5xl">
                                <HeaderFilter />
                            </Stack>
                        </Stack>
                    </Stack>


                    <Stack id={"main"}>
                        <Component {...props}/>
                    </Stack>

                    <Chat/>

                    <Stack id={"footer"}>
                        <Footer />
                    </Stack>
                </Stack>
            </>
        );
    };
};

export default withLayoutMain;
