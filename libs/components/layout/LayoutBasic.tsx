import { Stack } from "@mui/material"
import Head from "next/head"
import Footer from "@/libs/Footer";
import Top from "@/libs/Top";


const withLayoutBasic = (Component: any) => {
    return (props: any) => {
        return(
            <>
                <Head>
                    <title>Nestar</title>
                </Head>
                <Stack id="pc-wrap">

                    <Stack id={"top"}>
                        <Top />
                    </Stack>
                    
                    <Stack 
                        className={"header-basic"}
                        style={{
                            backgroundImage: `url(/img/banner/seoul.jpg)`,
                            backgroundSize: "cover",
                            boxShadow: "inset 10px 40px 150px 40px rgb(24 22 36)",
                        }}
                    >
                        <Stack className={"container"}>
                            <strong>Property Search</strong>
                            <span>We are glad to see you again!</span>
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

export default withLayoutBasic;