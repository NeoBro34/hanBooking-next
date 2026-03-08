import { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, IconButton, Stack } from "@mui/material"
import Link from "next/link";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Logout } from "@mui/icons-material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useTranslation } from 'next-i18next';
import { CaretDown } from 'phosphor-react';
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from "next/router";
import Badge from "@mui/material/Badge";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import React from "react";
import { getJwtToken, logOut, updateUserInfo } from "../auth";
import { REACT_APP_API_URL } from "../config";
import { useTheme } from 'next-themes';


const Top = () => {
	const device = useDeviceDetect();
	const [colorChange, setColorChange] = useState(false);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const { t } = useTranslation("common");
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const router = useRouter();
	const drop = Boolean(anchorEl2);
	const user = useReactiveVar(userVar);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);


    /** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/stays/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

    useEffect(() => {
        setMounted(true);
    }, []);

        const isMode = theme === "dark";

        const handleMode = () => {
        setTheme(isMode ? "light" : "dark");
        };


    /** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
        async (locale: string) => {
            setLang(locale);
            localStorage.setItem('locale', locale);
            setAnchorEl2(null);

            await router.push(router.asPath, router.asPath, {
                locale: locale,
            });
        },
        [router]
    );

    const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

    if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

    const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 90,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

    if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/stays'}>
					<div>{t('Stays')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Agents')} </div>
				</Link>
				<Link href={'/blog'}>
					<div> {t('Blog')} </div>
				</Link>
                <Link href={'/about'}>
					<div> {t('About')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('CS')} </div>
				</Link>
			</Stack>
		);
	} else {
        return (
            <Stack className={"navbar"}>
                <Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
                    <Stack className={"container"}>
                        <Stack className="left-box">
                            <Box component={"div"} className={"logo-box"}>
                                <Link href={"/"}>
                                    <img style={{marginLeft: "-70px", marginRight: "40px"}} src="/img/logo/logoWhite.png" alt="" />
                                </Link>
                            </Box>
                            <Box component={"div"} className={"router-box"}>
                                <nav className="flex items-center  max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm">
                                    <div className="hidden md:flex items-center gap-6 ml-7">
                                        <a href="/" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Home')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Home')}</span>
                                        </a>
                                        <a href="/stays" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Stays')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Stays')}</span>
                                        </a>
                                        <a href="/agent" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Agents')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Agents')}</span>
                                        </a>
                                        <a href="/blog" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">Blog</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">Blog</span>
                                        </a>
                                        <a href="/about" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">About</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">About</span>
                                        </a>
                                        {user?._id && (
                                            <a href="/mypage" className="relative overflow-hidden h-6 group">
                                                <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('MyPage')}</span>
                                                <span
                                                    className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('MyPage')}</span>
                                            </a>
                                        )}
                                        <a href="/cs" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">Support</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">Support</span>
                                        </a>
                                    </div>
                                </nav>
                            </Box>
                        </Stack>
                        <Stack className="right-box">
                            <div className={'lan-box'}>
                                {user?._id && <Badge 
                                        badgeContent={3}
                                        color="error"
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                            <NotificationsOutlinedIcon className={'notification-icon'}/>
                                    </Badge>
                                }
                                <IconButton
                                    style={{ width: "30px", height: "30px", marginLeft: "20px" }}
                                    onClick={handleMode}
                                    >
                                    {mounted && (
                                        isMode ? (
                                        <LightModeIcon sx={{ fontSize: 20, color: "gray" }} />
                                        ) : (
                                        <DarkModeIcon sx={{ fontSize: 20, color: "gray" }} />
                                        )
                                    )}
                                </IconButton>
                                <Button
                                    disableRipple
                                    className="btn-lang"
                                    variant="text"
                                    onClick={langClick}
                                    endIcon={<CaretDown size={14} color="gray" />}
                                >
                                    <Box>
                                        <img
                                            src={`/img/flag/lang${lang || "en"}.png`}
                                            alt="langFlag"
                                        />
                                    </Box>
                                </Button>
                                <StyledMenu
                                    anchorEl={anchorEl2}
                                    open={drop}
                                    onClose={langClose}
                                    sx={{ position: 'absolute' }}
                                >
                                    <MenuItem disableRipple onClick={() => langChoice("en")}>
                                        <img
                                            style={{ width: "24px", height: "17px", borderRadius: "2px", marginRight: "8px" }}
                                            src={"/img/flag/langen.png"}
                                            alt="englishFlag"
                                        />
                                        EN
                                    </MenuItem>

                                    <MenuItem disableRipple onClick={() => langChoice("kr")}>
                                        <img
                                            style={{ width: "24px", height: "17px", borderRadius: "2px", marginRight: "8px" }}
                                            src={"/img/flag/langkr.png"}
                                            alt="koreanFlag"
                                        />
                                        KR
                                    </MenuItem>

                                    <MenuItem disableRipple onClick={() => langChoice("ru")}>
                                        <img
                                            style={{ width: "24px", height: "17px", borderRadius: "2px", marginRight: "8px" }}
                                            src={"/img/flag/langru.png"}
                                            alt="russianFlag"
                                        />
                                        RU
                                    </MenuItem>
                                </StyledMenu>
                            </div>
                            <Box component={"div"} className={"user-box"}>
                                {!user?._id ? (
                                    <Link href={'/account/join'}>
                                        <button
                                            className="border border-slate-100 hover:bg-slate-600 hover:text-slate-100 px-3 py-2 rounded-full text-sm text-slate-400 font-medium transition duration-200 cursor-pointer ">
                                            <AccountCircleOutlinedIcon sx={{marginRight: "10px"}}/>
                                        <span>
                                            {t('Login')} / {t('Apply')}
                                        </span>
                                        </button>
                                    </Link>
                                ) : (
                                   <>
                                        <div className={"login-user"} onClick={(event: any) => setLogoutAnchor(event.currentTarget)} >
                                            <img src={ user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : "/img/profile/defaultUser.svg"} alt="" />
                                        </div>

                                        <Menu
                                            id="basic-menu"
                                            anchorEl={logoutAnchor}
                                            open={logoutOpen}
                                            onClose={() => {
                                                setLogoutAnchor(null);
                                            }}
                                            sx={{ mt: '5px' }}
                                        >
                                            <MenuItem onClick={() => logOut()}>
                                                <Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                   </>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
};

export default Top;