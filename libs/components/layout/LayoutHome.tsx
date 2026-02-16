import Footer from "@/libs/components/Footer";
import Top from "@/libs/components/Top";
import { Stack } from "@mui/material"
import Head from "next/head"
import HeaderFilter from "../homepage/HeaderFilter";
import { useEffect, useRef } from "react";


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
                            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                        >
                            <source src="/video/home-bg.mp4" type="video/mp4" />
                        </video>

                        <Stack className="relative z-10  top-1/8  flex items-center justify-center h-full text-white">
                           <Stack className={"container"}>
                                <HeaderFilter />
                            </Stack>
                        </Stack>
                    </Stack>


                    <Stack id={"main"}>
                        <Component {...props}/>
                    </Stack>


                    <Stack id={"footer"}>
                        <Footer />
                    </Stack>
                </Stack>
            </>
        );
    };
};

export default withLayoutMain;