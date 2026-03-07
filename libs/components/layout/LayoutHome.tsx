import Footer from "@/libs/components/Footer";
import Top from "@/libs/components/Top";
import { Stack } from "@mui/material"
import Head from "next/head"
import HeaderFilter from "../homepage/HeaderFilter";
import { useEffect, useRef } from "react";
import Chat from "../Chat";


const withLayoutMain = (Component: any) => {
    return (props: any) => {

        const videoRef = useRef<HTMLVideoElement | null>(null);
        useEffect(() => {
            if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
            }
        }, []);

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