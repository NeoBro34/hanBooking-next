import React, { useEffect } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box } from '@mui/material';
import MyMenu from '@/libs/components/mypage/MyMenu';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '@/apollo/store';
import { sweetErrorHandling } from '@/libs/sweetAlert';
import AddProperty from '@/libs/components/mypage/AddNewProperty';
import MyProfile from '@/libs/components/mypage/MyProfile';
import MyProperties from '@/libs/components/mypage/MyProperties';
import MyFavorites from '@/libs/components/mypage/MyFavorites';
import RecentlyVisited from '@/libs/components/mypage/RecentlyVisited';
import MyArticles from '@/libs/components/mypage/MyArticles';
import WriteArticle from '@/libs/components/mypage/WriteArticle';
import MemberFollowers from '@/libs/components/member/MemberFollowers';
import MemberFollowings from '@/libs/components/member/MemberFollowings';
import MyBookings from '@/libs/components/mypage/MyBookings';

const MyPage: NextPage = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const category: any = router.query?.category ?? 'myProfile';
	/** APOLLO REQUESTS **/

	/** LIFECYCLES **/
	// useEffect(() => {
	// 	if (!user._id) router.push('/').then();
	// }, [user]);

	/** HANDLERS **/
	const subscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const unsubscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`);
			else await router.push(`/member?memberId=${memberId}`);
		} catch (error) {
			await sweetErrorHandling(error);
		}
	};

	if (device === 'mobile') {
		return <div>MyPage MOBILE</div>;
	} else {
		return (
			<Stack id='mypage-list'>
				<Stack className='container'>
					<Stack className='my-page-top'>
						<MyMenu/>
					</Stack>
					<Stack className='my-page-main'>
						{category === 'addProperty' && <AddProperty />}
							{category === 'myProfile' && <MyProfile />}
							{category === 'myProperties' && <MyProperties />}
							{category === 'myFavorites' && <MyFavorites />}
							{category === 'recentlyVisited' && <RecentlyVisited />}
							{category === 'myArticles' && <MyArticles />}
							{category === 'myBookings' && <MyBookings />}
							{category === 'writeArticle' && <WriteArticle />}
							{category === 'followers' && (
								<MemberFollowers
									subscribeHandler={subscribeHandler}
									unsubscribeHandler={unsubscribeHandler}
									redirectToMemberPageHandler={redirectToMemberPageHandler}
								/>
							)}
							{category === 'followings' && (
								<MemberFollowings
									subscribeHandler={subscribeHandler}
									unsubscribeHandler={unsubscribeHandler}
									redirectToMemberPageHandler={redirectToMemberPageHandler}
								/>
							)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(MyPage);
