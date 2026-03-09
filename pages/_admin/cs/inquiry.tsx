import React, { useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '@/libs/components/layout/LayoutAdmin';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_INQUIRIES_BY_ADMIN } from '@/apollo/admin/query';
import { SEND_INQUIRY_MESSAGE } from '@/apollo/user/mutation';
import { GET_INQUIRY_MESSAGES } from '@/apollo/user/query';
import { NoticesInquiry } from '@/libs/types/notice/notice.input';
import { Notice } from '@/libs/types/notice/notice';
import { InquiryMessage } from '@/libs/types/inquiry-message/inquiry-message';
import { Direction } from '@/libs/enums/common.enum';
import { NoticeCategory } from '@/libs/enums/notice.enum';
import { userVar } from '@/apollo/store';
import { useReactiveVar } from '@apollo/client';
import { sweetMixinErrorAlert } from '@/libs/sweetAlert';

const InquiryArticles: NextPage = () => {
	const user = useReactiveVar(userVar);
	const [selectedInquiryId, setSelectedInquiryId] = useState<string>('');
	const [newMessage, setNewMessage] = useState('');

	const input: NoticesInquiry = useMemo(
		() => ({
			page: 1,
			limit: 50,
			sort: 'createdAt',
			direction: Direction.DESC,
			search: {
				noticeCategory: NoticeCategory.INQUIRY,
			},
		}),
		[],
	);

	const { data, refetch } = useQuery(GET_ALL_INQUIRIES_BY_ADMIN, {
		fetchPolicy: 'network-only',
		variables: { input },
		notifyOnNetworkStatusChange: true,
	});
	const {
		data: messageData,
		refetch: messageRefetch,
	} = useQuery(GET_INQUIRY_MESSAGES, {
		fetchPolicy: 'network-only',
		skip: !selectedInquiryId,
		variables: { inquiryId: selectedInquiryId },
		notifyOnNetworkStatusChange: true,
	});
	const [sendInquiryMessage] = useMutation(SEND_INQUIRY_MESSAGE);

	const inquiryList: Notice[] = data?.getAllInquiriesByAdmin?.list ?? [];
	const messageList: InquiryMessage[] = messageData?.getInquiryMessages ?? [];
	const selectedInquiry = inquiryList.find((item) => item._id === selectedInquiryId);

	useEffect(() => {
		if (!selectedInquiryId && inquiryList.length) {
			setSelectedInquiryId(inquiryList[0]._id);
		}
	}, [inquiryList, selectedInquiryId]);

	const sendMessageHandler = async () => {
		try {
			if (!selectedInquiryId) throw new Error('Please choose inquiry');
			if (!newMessage.trim()) throw new Error('Please type message');

			await sendInquiryMessage({
				variables: {
					input: {
						inquiryId: selectedInquiryId,
						message: newMessage,
					},
				},
			});
			setNewMessage('');
			await messageRefetch({ inquiryId: selectedInquiryId });
			await refetch({ input });
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Error').then();
		}
	};

	return (
		<Box component={'div'} className={'content cs-admin-page'}>
			<Typography variant={'h2'} sx={{ mb: '12px' }}>
				1:1 Inquiry Chat
			</Typography>

			<Stack direction={'row'} gap={2}>
				<Stack sx={{ width: '34%', border: '1px solid #ececec', borderRadius: '10px', background: '#fff' }}>
					<Box sx={{ p: '10px 12px', fontWeight: 600 }}>Inquiry Rooms</Box>
					<Divider />
					<Stack>
						{inquiryList.map((ele: Notice) => (
							<Box
								key={ele._id}
								onClick={() => setSelectedInquiryId(ele._id)}
								sx={{
									cursor: 'pointer',
									p: '10px 12px',
									borderBottom: '1px solid #f2f2f2',
									background: selectedInquiryId === ele._id ? 'rgba(212,160,23,0.1)' : '#fff',
								}}
							>
								<div style={{ fontWeight: 600 }}>{ele.noticeTitle}</div>
								<div style={{ fontSize: 12, color: '#757575' }}>{ele.memberData?.memberNick ?? 'Unknown user'}</div>
							</Box>
						))}
					</Stack>
				</Stack>

				<Stack sx={{ width: '66%', border: '1px solid #ececec', borderRadius: '10px', background: '#fff' }}>
					<Box sx={{ p: '10px 12px', fontWeight: 600 }}>Chat</Box>
					<Divider />
					<Stack sx={{ p: '12px', minHeight: 360, maxHeight: 430, overflowY: 'auto' }} gap={1}>
						{selectedInquiry && (
							<Box sx={{ mb: 1, p: '10px', borderRadius: '8px', background: '#fafafa', border: '1px solid #eee' }}>
								<div style={{ fontSize: 12, color: '#757575' }}>
									Question from: {selectedInquiry.memberData?.memberNick ?? 'Unknown user'}
								</div>
								<div style={{ fontWeight: 600, marginTop: 4 }}>{selectedInquiry.noticeTitle}</div>
								<div style={{ fontSize: 13, marginTop: 4, whiteSpace: 'pre-wrap' }}>{selectedInquiry.noticeContent}</div>
							</Box>
						)}
						{selectedInquiryId ? (
							messageList.length ? (
								messageList.map((msg: InquiryMessage) => {
									const isMine = String(msg.senderId) === String(user?._id);
									return (
										<Stack key={msg._id} alignItems={isMine ? 'flex-end' : 'flex-start'}>
											<Box
												sx={{
													maxWidth: '80%',
													p: '8px 10px',
													borderRadius: '10px',
													background: isMine ? '#ffe6b3' : '#f6f6f6',
												}}
											>
												<div style={{ fontSize: 13, marginBottom: 4 }}>{msg.senderData?.memberNick ?? 'Unknown'}</div>
												<div>{msg.message}</div>
												<div style={{ fontSize: 11, color: '#9e9e9e', marginTop: 3 }}>
													{new Date(msg.createdAt).toLocaleString()}
												</div>
											</Box>
										</Stack>
									);
								})
							) : (
								<Typography color={'text.secondary'}>No messages yet</Typography>
							)
						) : (
							<Typography color={'text.secondary'}>Choose inquiry room</Typography>
						)}
					</Stack>
					<Divider />
					<Stack direction={'row'} gap={1} sx={{ p: '10px' }}>
						<TextField
							fullWidth
							size={'small'}
							placeholder={'Type a message'}
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') sendMessageHandler();
							}}
						/>
						<Button variant={'contained'} onClick={sendMessageHandler}>Send</Button>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
};

export default withAdminLayout(InquiryArticles);
