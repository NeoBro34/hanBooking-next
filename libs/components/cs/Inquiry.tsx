import React, { useEffect, useMemo, useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { CREATE_INQUIRY, SEND_INQUIRY_MESSAGE } from '@/apollo/user/mutation';
import { GET_INQUIRY_MESSAGES, GET_MY_INQUIRIES } from '@/apollo/user/query';
import { NoticesInquiry, CreateInquiryInput } from '@/libs/types/notice/notice.input';
import { Notice } from '@/libs/types/notice/notice';
import { InquiryMessage } from '@/libs/types/inquiry-message/inquiry-message';
import Moment from 'react-moment';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '@/libs/sweetAlert';
import { Direction } from '@/libs/enums/common.enum';
import { userVar } from '@/apollo/store';
import { NoticeCategory } from '@/libs/enums/notice.enum';
import { useTranslation } from 'next-i18next';

const Inquiry = () => {
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
	const user = useReactiveVar(userVar);
	const [selectedInquiryId, setSelectedInquiryId] = useState<string>('');
	const [newMessage, setNewMessage] = useState('');
	const [form, setForm] = useState<CreateInquiryInput>({ noticeTitle: '', noticeContent: '' });

	const inquiryInput: NoticesInquiry = useMemo(
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

	const { data, refetch } = useQuery(GET_MY_INQUIRIES, {
		fetchPolicy: 'network-only',
		variables: { input: inquiryInput },
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
	const [createInquiry] = useMutation(CREATE_INQUIRY);
	const [sendInquiryMessage] = useMutation(SEND_INQUIRY_MESSAGE);

	const createInquiryHandler = async () => {
		try {
			if (!form.noticeTitle.trim() || !form.noticeContent.trim()) {
				throw new Error(t('Please provide title and content'));
			}
			const result = await createInquiry({ variables: { input: form } });
			setForm({ noticeTitle: '', noticeContent: '' });
			await refetch({ input: inquiryInput });
			const createdId = result?.data?.createInquiry?._id;
			if (createdId) setSelectedInquiryId(createdId);
			await sweetTopSmallSuccessAlert(t('Inquiry sent'), 900);
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? t('Error')).then();
		}
	};

	const sendMessageHandler = async () => {
		try {
			if (!selectedInquiryId) throw new Error(t('Please choose inquiry'));
			if (!newMessage.trim()) throw new Error(t('Please type message'));

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
			await refetch({ input: inquiryInput });
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? t('Error')).then();
		}
	};

	const inquiryList: Notice[] = data?.getMyInquiries?.list ?? [];
	const messageList: InquiryMessage[] = messageData?.getInquiryMessages ?? [];
	const selectedInquiry = inquiryList.find((item) => item._id === selectedInquiryId);

	useEffect(() => {
		if (!selectedInquiryId && inquiryList.length) {
			setSelectedInquiryId(inquiryList[0]._id);
		}
	}, [inquiryList, selectedInquiryId]);

	if (device === 'mobile') {
		return <div>{t('Inquiry MOBILE')}</div>;
	}

	return (
		<Stack gap={2}>
			<Typography variant={'h5'}>{t('1:1 Inquiry Chat')}</Typography>

			<Stack gap={1} sx={{ border: '1px solid #ececec', borderRadius: '10px', p: '12px', background: '#fff' }}>
				<Typography variant={'subtitle1'}>{t('Create New Inquiry')}</Typography>
				<TextField
					label={t('Title')}
					value={form.noticeTitle}
					onChange={(e) => setForm({ ...form, noticeTitle: e.target.value })}
				/>
				<TextField
					label={t('Content')}
					value={form.noticeContent}
					multiline
					minRows={3}
					onChange={(e) => setForm({ ...form, noticeContent: e.target.value })}
				/>
				<Box>
					<Button variant={'contained'} onClick={createInquiryHandler}>{t('Send Inquiry')}</Button>
				</Box>
			</Stack>

			<Stack direction={'row'} gap={2}>
				<Stack sx={{ width: '34%', border: '1px solid #ececec', borderRadius: '10px', background: '#fff' }}>
					<Box sx={{ p: '10px 12px', fontWeight: 600 }}>{t('My Inquiry Rooms')}</Box>
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
								<div style={{ fontSize: 12, color: '#757575' }}>
									<Moment format={'DD.MM.YYYY HH:mm'}>{ele.createdAt}</Moment>
								</div>
							</Box>
						))}
					</Stack>
				</Stack>

				<Stack sx={{ width: '66%', border: '1px solid #ececec', borderRadius: '10px', background: '#fff' }}>
					<Box sx={{ p: '10px 12px', fontWeight: 600 }}>{t('Chat')}</Box>
					<Divider />
					<Stack sx={{ p: '12px', minHeight: 320, maxHeight: 380, overflowY: 'auto' }} gap={1}>
						{selectedInquiry && (
							<Box sx={{ mb: 1, p: '10px', borderRadius: '8px', background: '#fafafa', border: '1px solid #eee' }}>
									<div style={{ fontSize: 12, color: '#757575' }}>{t('My inquiry question')}</div>
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
													<div style={{ fontSize: 13, marginBottom: 4 }}>{msg.senderData?.memberNick ?? t('Unknown')}</div>
												<div>{msg.message}</div>
												<div style={{ fontSize: 11, color: '#9e9e9e', marginTop: 3 }}>
													{new Date(msg.createdAt).toLocaleString()}
												</div>
											</Box>
										</Stack>
									);
								})
							) : (
								<Typography color={'text.secondary'}>{t('No messages yet')}</Typography>
							)
						) : (
							<Typography color={'text.secondary'}>{t('Choose inquiry room')}</Typography>
						)}
					</Stack>
					<Divider />
					<Stack direction={'row'} gap={1} sx={{ p: '10px' }}>
						<TextField
							fullWidth
							size={'small'}
							placeholder={t('Type a message')}
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') sendMessageHandler();
							}}
						/>
						<Button variant={'contained'} onClick={sendMessageHandler}>{t('Send')}</Button>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Inquiry;
