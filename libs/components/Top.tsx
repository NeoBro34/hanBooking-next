import { useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, IconButton, Stack } from "@mui/material"
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
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import React from "react";
import { getJwtToken, logOut, updateUserInfo } from "../auth";
import { REACT_APP_API_URL } from "../config";
import { useTheme } from 'next-themes';
import { GET_MY_NOTIFICATIONS } from "@/apollo/user/query";
import { MARK_ALL_NOTIFICATIONS_READ, MARK_NOTIFICATION_READ } from "@/apollo/user/mutation";
import { NotificationStatus } from "../enums/notification.enum";


const Top = () => {
	const device = useDeviceDetect();
	const [colorChange, setColorChange] = useState(false);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const { t } = useTranslation("common");
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string>('en');
	const router = useRouter();
	const drop = Boolean(anchorEl2);
	const user = useReactiveVar(userVar);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
	const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
	const notificationOpen = Boolean(notificationAnchor);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);


    /** LIFECYCLES **/
	useEffect(() => {
		if (!router.isReady) return;
		const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
		const currentLocale = router.locale || 'en';

		if (savedLocale && savedLocale !== currentLocale) {
			setLang(savedLocale);
			router.replace(router.asPath, router.asPath, { locale: savedLocale }).then();
			return;
		}

		setLang(currentLocale);
		if (typeof window !== 'undefined' && savedLocale !== currentLocale) {
			localStorage.setItem('locale', currentLocale);
		}
	}, [router.isReady, router.locale, router.asPath]);

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
	const {
		data: notificationData,
		refetch: notificationRefetch,
	} = useQuery(GET_MY_NOTIFICATIONS, {
		fetchPolicy: 'network-only',
		skip: !user?._id,
		variables: {
			input: {
				page: 1,
				limit: 8,
				sort: 'createdAt',
				direction: 'DESC',
				search: {},
			},
		},
	});
	const [markNotificationRead] = useMutation(MARK_NOTIFICATION_READ);
	const [markAllNotificationsRead] = useMutation(MARK_ALL_NOTIFICATIONS_READ);
	const myNotifications = notificationData?.getMyNotifications?.list ?? [];
	const unreadCount = myNotifications.filter(
		(item: any) => item?.notificationStatus === NotificationStatus.WAIT,
	).length;

	const notificationOpenHandler = async (event: any) => {
		setNotificationAnchor(event.currentTarget);
		await notificationRefetch();
	};

	const notificationCloseHandler = () => {
		setNotificationAnchor(null);
	};

	const markOneNotificationReadHandler = async (notificationId: string) => {
		try {
			await markNotificationRead({
				variables: { notificationId },
			});
			await notificationRefetch();
		} catch (err) {
			console.log('markOneNotificationReadHandler error:', err);
		}
	};

	const markAllNotificationsReadHandler = async () => {
		try {
			await markAllNotificationsRead();
			await notificationRefetch();
		} catch (err) {
			console.log('markAllNotificationsReadHandler error:', err);
		}
	};

	const moveByNotificationHandler = async (item: any) => {
		await markOneNotificationReadHandler(item?._id);
		notificationCloseHandler();
		if (item?.propertyId) {
			await router.push(`/stays/detail?id=${item.propertyId}`);
			return;
		}
		if (item?.articleId) {
			await router.push(`/blog/detail?id=${item.articleId}`);
			return;
		}
		await router.push('/cs/?tab=inquiry');
	};

	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
        async (locale: string) => {
			if (locale === lang) {
				setAnchorEl2(null);
				return;
			}
            setLang(locale);
            localStorage.setItem('locale', locale);
            setAnchorEl2(null);

            await router.push(router.asPath, router.asPath, { locale });
        },
        [router, lang]
    );

    const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	useEffect(() => {
		if (typeof window === 'undefined') return;
		window.addEventListener('scroll', changeNavbarColor);
		return () => window.removeEventListener('scroll', changeNavbarColor);
	}, []);

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
                                    <img src="/img/logo/logoWhite.png" alt="HanBooking logo" />
                                </Link>
                            </Box>
                            <Box component={"div"} className={"router-box"}>
                                <nav className="flex items-center  max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm">
                                    <div className="hidden md:flex items-center gap-6 ml-7">
                                        <Link href="/" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Home')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Home')}</span>
                                        </Link>
                                        <Link href="/stays" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Stays')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Stays')}</span>
                                        </Link>
                                        <Link href="/agent" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Agents')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Agents')}</span>
                                        </Link>
                                        <Link href="/blog" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Blog')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Blog')}</span>
                                        </Link>
                                        <Link href="/about" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('About')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('About')}</span>
                                        </Link>
                                        {user?._id && (
                                            <Link href="/mypage" className="relative overflow-hidden h-6 group">
                                                <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('MyPage')}</span>
                                                <span
                                                    className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('MyPage')}</span>
                                            </Link>
                                        )}
                                        <Link href="/cs" className="relative overflow-hidden h-6 group">
                                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-gray-400">{t('Support')}</span>
                                            <span
                                                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-400">{t('Support')}</span>
                                        </Link>
                                    </div>
                                </nav>
                            </Box>
                        </Stack>
                        <Stack className="right-box">
                            <div className={'lan-box'}>
                                {user?._id && <Badge 
                                        badgeContent={unreadCount}
                                        color="error"
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
										<IconButton
											style={{ width: "30px", height: "30px" }}
											onClick={notificationOpenHandler}
										>
											<NotificationsOutlinedIcon className={'notification-icon'}/>
										</IconButton>
                                    </Badge>
                                }
								<Menu
									anchorEl={notificationAnchor}
									open={notificationOpen}
									onClose={notificationCloseHandler}
									PaperProps={{ style: { width: 360, maxHeight: 440 } }}
								>
									<MenuItem
										disableRipple
										style={{ justifyContent: 'space-between', fontWeight: 600, cursor: 'default' }}
									>
										<span>{t('Notifications')}</span>
										<Button size={'small'} onClick={markAllNotificationsReadHandler}>
											{t('Mark all read')}
										</Button>
									</MenuItem>
									<Divider />
									{myNotifications.length ? (
										myNotifications.map((item: any) => (
											<MenuItem
												key={item._id}
												onClick={() => moveByNotificationHandler(item)}
												style={{
													display: 'flex',
													alignItems: 'flex-start',
													flexDirection: 'column',
													gap: 4,
													background:
														item?.notificationStatus === NotificationStatus.WAIT
															? 'rgba(233, 44, 40, 0.06)'
															: 'transparent',
												}}
											>
												<div style={{ fontWeight: 600, whiteSpace: 'normal' }}>{item.notificationTitle}</div>
												<div style={{ fontSize: 12, color: '#616161', whiteSpace: 'normal' }}>
													{item.notificationDesc || t('No description')}
												</div>
												<div style={{ fontSize: 11, color: '#9e9e9e' }}>
													{new Date(item.createdAt).toLocaleString()}
												</div>
											</MenuItem>
										))
									) : (
										<MenuItem disableRipple style={{ cursor: 'default' }}>
											{t('No notifications yet')}
										</MenuItem>
									)}
								</Menu>
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
                                    {(lang || 'en').toUpperCase()}
                                </Button>
                                <StyledMenu
                                    anchorEl={anchorEl2}
                                    open={drop}
                                    onClose={langClose}
                                    sx={{ position: 'absolute' }}
                                >
                                    <MenuItem disableRipple onClick={() => langChoice("en")}>
                                        EN
                                    </MenuItem>

                                    <MenuItem disableRipple onClick={() => langChoice("kr")}>
                                        KR
                                    </MenuItem>

                                    <MenuItem disableRipple onClick={() => langChoice("ru")}>
                                        RU
                                    </MenuItem>

                                    <MenuItem disableRipple onClick={() => langChoice("uz")}>
                                        UZ
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
                                                {t('Logout')}
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
