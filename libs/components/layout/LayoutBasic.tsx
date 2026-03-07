import { Stack } from "@mui/material"
import Head from "next/head"
import Footer from "@/libs/components/Footer";
import Top from "@/libs/components/Top";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { useEffect, useMemo, useState } from "react";
import { useReactiveVar } from '@apollo/client';
import { userVar } from "@/apollo/store";
import { getJwtToken, updateUserInfo } from "@/libs/auth";
import Chat from "../Chat";


const withLayoutBasic = (Component: any) => {
    return (props: any) => {
        const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

        const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/stays':
					title = 'Stays Search';
					desc = 'We are glad to see you again!';
					bgImage = '/img/banner/stayheader.jpg';
					break;
				case '/agent':
					title = 'Agents';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/agentheader.jpg';
					break;
				case '/agent/detail':
					title = 'Agent Page';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/mypage':
					title = 'my page';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/mypageheader.jpg';
					break;
				case '/blog':
					title = 'Blog';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/blogheader.jpg';
					break;
				case '/blog/detail':
					title = 'Community Detail';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/header2.svg';
					break;
                case '/about':
					title = 'Community Detail';
					desc = 'About /';
					bgImage = '/img/banner/aboutheader.jpg';
					break;
				case '/cs':
					title = 'CS';
					desc = 'We are glad to see you again!';
					bgImage = '/img/banner/csheader.jpg';
					break;
				case '/member':
					title = 'Member Page';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/header1.svg';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/


        if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>HanBooking</title>
						<meta name={'title'} content={`Hanbooking`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
            return(
                <>
                    <Head>
                        <title>HanBooking</title>
                        <meta name={'title'} content={`HanBooking`} />
                    </Head>
                    <Stack id="pc-wrap">

                        <Stack id={"top"}>
                            <Top />
                        </Stack>
                        
                        <Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								backgroundImage: `url(${memoizedValues.bgImage})`,
								boxShadow: 'inset 40px 50px 100px 120px rgb(24 22 36)',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
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
        }
    };
};

export default withLayoutBasic;