import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '@/apollo/user/query';
import { NoticesInquiry } from '@/libs/types/notice/notice.input';
import { Notice as NoticeType } from '@/libs/types/notice/notice';
import { NoticeCategory, NoticeStatus } from '@/libs/enums/notice.enum';
import Moment from 'react-moment';
import { Direction } from '@/libs/enums/common.enum';

const Notice = () => {
	const device = useDeviceDetect();

	/** APOLLO REQUESTS **/
	const input: NoticesInquiry = {
		page: 1,
		limit: 20,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: {
			noticeCategory: NoticeCategory.NOTICE,
			noticeStatus: NoticeStatus.ACTIVE,
		},
	};
	const { data } = useQuery(GET_NOTICES, {
		fetchPolicy: 'network-only',
		variables: { input },
	});
	/** LIFECYCLES **/
	/** HANDLERS **/

	const notices: NoticeType[] = data?.getNotices?.list ?? [];

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<span className={'title'}>Notice</span>
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>number</span>
						<span>title</span>
						<span>date</span>
					</Box>
					<Stack className={'bottom'}>
						{notices.length ? (
							notices.map((ele: NoticeType, index: number) => (
								<div className={'notice-card'} key={ele._id}>
									<span className={'notice-number'}>{index + 1}</span>
									<span className={'notice-title'}>{ele.noticeTitle}</span>
									<span className={'notice-date'}>
										<Moment format={'DD.MM.YYYY'}>{ele.createdAt}</Moment>
									</span>
								</div>
							))
						) : (
							<div className={'notice-card'}>
								<span className={'notice-number'}>-</span>
								<span className={'notice-title'}>No notices found</span>
								<span className={'notice-date'}>-</span>
							</div>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Notice;
