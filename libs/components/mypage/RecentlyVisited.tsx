import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import { Property } from '../../types/property/property';
import { T } from '../../types/common';
import { useMutation, useQuery } from '@apollo/client';
import { GET_VISITED } from '../../../apollo/user/query';
import SmallStayBookingCard from '../common/SmallPropertyCard';
import { LIKE_TARGET_PROPERTY } from '@/apollo/user/mutation';
import { Messages } from '@/libs/config';
import { sweetMixinErrorAlert } from '@/libs/sweetAlert';

const RecentlyVisited: NextPage = () => {
	const device = useDeviceDetect();
	const [recentlyVisited, setRecentlyVisited] = useState<Property[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchVisited, setSearchVisited] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
	

	const {
		loading: getVisitedLoading,
		data: getVisitedData,
		error: getVisitedError,
		refetch: getVisitedRefetch,
	} = useQuery(
		GET_VISITED, 
		{
			fetchPolicy: 'network-only',
			variables: { input: searchVisited },
			notifyOnNetworkStatusChange: true,
			onCompleted(data: T) {
				setRecentlyVisited(data.getVisited?.list);
				setTotal(data?.getVisited?.metaCounter?.[0]?.total || 0);
			},
		}
	);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchVisited({ ...searchVisited, page: value });
	};

	const likePropertyHandler = async (user: any, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetProperty({
				variables: {
					input: id,
				},
			});
			await getVisitedRefetch({ input: searchVisited });
		} catch (err: any) {
			console.log('ERROR, likePropertyHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <div>MY FAVORITES MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Recently Visited</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{recentlyVisited?.length ? (
						recentlyVisited?.map((property: Property) => {
							return <SmallStayBookingCard property={property} likePropertyHandler={likePropertyHandler} recentlyVisited={true} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Recently Visited Properties found!</p>
						</div>
					)}
				</Stack>
				{recentlyVisited?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchVisited.limit)}
								page={searchVisited.page}
								shape="circular"
								color="primary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack sx={{width:'100%', alignItems:'center', display:'flex', justifyContent:'center'}}>
							<Typography>
								Total {total} recently visited propert{total > 1 ? 'ies' : 'y'}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default RecentlyVisited;
