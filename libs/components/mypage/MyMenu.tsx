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
import LogoutIcon from '@mui/icons-material/Logout';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Link from "next/link";
import { useRouter } from "next/router";

const MyMenu = () => {
	const device = useDeviceDetect();
	const router = useRouter();
    const pathname = router.query.category ?? 'myProfile';
	const category: any = router.query?.category ?? 'myProfile';



    if (device === 'mobile') {
		return <div>MY MENU</div>;
	} else {
		return (
            <Stack className="my-menu">
                <Stack className="profile-info-box">
						<img
                            className='profile-img'
							src={
                                // user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : 
                                '/img/profile/defaultUser.svg'}
							alt={'member-photo'}
						/>
                        <div className="user-name">Neo</div>
                        <div className="user-phone"><CallIcon sx={{mr:"4px"}}/>01047564666</div>
                        {false ? (
                            <a 
                                href="/_admin/users" target={'_blank'}
                                className="user-type">Admin</a>
                        ) : (
                            <div className="user-type">Agent</div>
                        )}
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
                            <span>Profile</span>
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
                            <span>Followers</span>
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
                            <span>Followings</span>
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
                            <span>Favorites</span>
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
                            <span>Resently Visited</span>
                    </Link>
                    {true && (
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
                                    <span>My Properties</span>
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
                                    <span>Add Property</span>
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
                            <span>Articles</span>
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
                            <span>Write Article</span>
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