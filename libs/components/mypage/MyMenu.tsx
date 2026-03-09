import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, ListItem, Stack } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Link from "next/link";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { REACT_APP_API_URL } from "@/libs/config";
import { useTranslation } from "next-i18next";

const MyMenu = () => {
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
	const router = useRouter();
	const pathname = router.query.category ?? 'myProfile';
	const category: any = router.query?.category ?? 'myProfile';
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	// const logoutHandler = async () => {
	// 	try {
	// 		if (await sweetConfirmAlert('Do you want to logout?')) logOut();
	// 	} catch (err: any) {
	// 		console.log('ERROR, logoutHandler:', err.message);
	// 	}
	// };




    if (device === 'mobile') {
		return <div>{t('MY MENU')}</div>;
	} else {
		return (
            <Stack className="my-menu">
                <Stack className="profile-info-box">
						<Stack className="profile-img-box">
                            <img
                                src={
                                    user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : 
                                    '/img/profile/defaultUser.svg'}
                                alt={'member-photo'}
                            />
                        </Stack>
                        <Stack>
                            <div className="user-name">{user?.memberNick}</div>
                            <div className="user-phone"><CallIcon sx={{mr:"4px"}}/>{user?.memberPhone}</div>
                            {user?.memberType === 'ADMIN' ? (
                                <a 
                                    href="/_admin/users" target={'_blank'}
                                    className="user-type">{user?.memberType}</a>
                            ) : (
                                <div className="user-type">{user?.memberType}</div>
                            )}
                        </Stack>
                </Stack>
                <Stack className="sections">
                    <Link 
                        href={{
                            pathname: '/mypage',
                            query: { category: 'myProfile' },
                        }}
                        scroll={false}
                        className={pathname === 'myProfile' ? 'focus' : 'section'}
                    >
                            <ManageAccountsIcon className="icon"/>
                            <span>{t('Profile')}</span>
                    </Link>
                    <Link 
                        href={{
                            pathname: '/mypage',
                            query: { category: 'followers' },
                        }}
                        scroll={false}
                        className={pathname === 'followers' ? 'focus' : 'section'}
                    >
                            <GroupsIcon className="icon"/>
                            <span>{t('Followers')}</span>
                    </Link>
                    <Link
                        href={{
                            pathname: '/mypage',
                            query: { category: 'followings' },
                        }}
                        scroll={false} 
                        className={pathname === 'followings' ? 'focus' : 'section'}
                    >
                            <GroupAddIcon className="icon"/>
                            <span>{t('Followings')}</span>
                    </Link>
                    <Link 
                        href={{
                            pathname: '/mypage',
                            query: { category: 'myFavorites' },
                        }}
                        scroll={false}
                        className={pathname === 'myFavorites' ? 'focus' : 'section'}
                    >
                            <FavoriteBorderIcon className="icon"/>
                            <span>{t('Favorites')}</span>
                    </Link>
                    <Link 
                        href={{
                            pathname: '/mypage',
                            query: { category: 'recentlyVisited' },
                        }}
                        scroll={false}
                        className={pathname === 'recentlyVisited' ? 'focus' : 'section'}
                    >
                            <ManageSearchIcon className="icon"/>
                            <span>{t('Recently Visited')}</span>
                    </Link>
                    <Link 
                        href={{
                            pathname: '/mypage',
                            query: { category: 'myBookings' },
                        }}
                        scroll={false}
                        className={pathname === 'myBookings' ? 'focus' : 'section'}
                    >
                            <EventNoteIcon className="icon"/>
                            <span>{t('My Bookings')}</span>
                    </Link>
                    {user?.memberType === 'AGENT' && (
                        <>
                            <Link 
                                href={{
                                    pathname: '/mypage',
                                    query: { category: 'myProperties' },
                                }}
                                scroll={false}
                                className={pathname === 'myProperties' ? 'focus' : 'section'}
                            >
                                    <LibraryAddCheckIcon className="icon"/>
                                    <span>{t('My Properties')}</span>
                            </Link>
                            <Link 
                                href={{
                                    pathname: '/mypage',
                                    query: { category: 'addProperty' },
                                }}
                                scroll={false}
                                className={pathname === 'addProperty' ? 'focus' : 'section'}
                            >
                                    <AddHomeWorkIcon className="icon"/>
                                    <span>{t('Add Property')}</span>
                            </Link>
                        </>
                    )}
                    <Link 
                        href={{
                            pathname: '/mypage',
                            query: { category: 'myArticles' },
                        }}
                        scroll={false}
                        className={pathname === 'myArticles' ? 'focus' : 'section'}
                    >
                            <ArtTrackIcon className="icon"/>
                            <span>{t('Articles')}</span>
                    </Link>
                    <Link 
                        href={{
                            pathname: '/mypage',
                            query: { category: 'writeArticle' },
                        }}
                        scroll={false}
                        className={pathname === 'writeArticle' ? 'focus' : 'section'}
                    >
                            <DriveFileRenameOutlineIcon className="icon"/>
                            <span>{t('Write Article')}</span>
                    </Link>
                    {/* <Box sx={{ml:"15px", mt: "30px"}}>
                        <LogoutIcon/>
                        <span>Logout</span>
                    </Box> */}
                </Stack>
            </Stack>
        )
    }
}

export default MyMenu;
