import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '@/apollo/user/query';
import { Notice } from '@/libs/types/notice/notice';
import { NoticesInquiry } from '@/libs/types/notice/notice.input';
import { Direction } from '@/libs/enums/common.enum';
import { NoticeCategory, NoticeStatus } from '@/libs/enums/notice.enum';

type FaqItem = {
	id: string;
	subject: string;
	content: string;
};

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const [category, setCategory] = useState<string>('property');
	const [expanded, setExpanded] = useState<string | false>(false);

	const input: NoticesInquiry = useMemo(
		() => ({
			page: 1,
			limit: 100,
			sort: 'createdAt',
			direction: Direction.DESC,
			search: {
				noticeCategory: NoticeCategory.FAQ,
				noticeStatus: NoticeStatus.ACTIVE,
			},
		}),
		[],
	);

	const { data: faqData } = useQuery(GET_NOTICES, {
		fetchPolicy: 'network-only',
		variables: { input },
	});

	const staticFaqs: Record<string, FaqItem[]> = {
		property: [
			{
				id: 'faq-property-1',
				subject: 'Are listings on Hanbooking verified before publishing?',
				content: 'Yes. Listings go through moderation, and suspicious content can be moved to HOLD or DELETE status.',
			},
			{
				id: 'faq-property-2',
				subject: 'How can I search with filters?',
				content: 'In the Stays section, you can filter by location, price range, room count, and other criteria.',
			},
			{
				id: 'faq-property-3',
				subject: 'What information is shown on a property detail page?',
				content: 'You can see key details, images, price, amenities, and the fields required to create a booking.',
			},
			{
				id: 'faq-property-4',
				subject: 'Is there a Favorites feature?',
				content: 'Yes. Logged-in users can save listings to Favorites and review them later from My Page.',
			},
			{
				id: 'faq-property-5',
				subject: 'How do I report an inaccurate listing?',
				content: 'Send a message in 1:1 Inquiry. Admin will review the report and take action if needed.',
			},
		],
		payment: [
			{
				id: 'faq-payment-1',
				subject: 'Where is payment handled for bookings?',
				content: 'Payment is handled in the booking flow, and the final amount is shown before confirmation.',
			},
			{
				id: 'faq-payment-2',
				subject: 'Do I get a refund if I cancel?',
				content: 'Refund eligibility depends on the listing policy and cancellation timing. Use Inquiry for exact help.',
			},
			{
				id: 'faq-payment-3',
				subject: 'Are there hidden fees?',
				content: 'No. Any additional fee is clearly shown before you complete the booking.',
			},
			{
				id: 'faq-payment-4',
				subject: 'What should I do if payment fails?',
				content: 'Send the transaction time and error details through 1:1 Inquiry so admin can investigate quickly.',
			},
			{
				id: 'faq-payment-5',
				subject: 'Where can I check my booking status?',
				content: 'Open the Bookings section in My Page to see the current status.',
			},
		],
		buyers: [
			{
				id: 'faq-buyer-1',
				subject: 'What should I check before booking?',
				content: 'Review dates, guest count, total price, cancellation policy, and listing rules.',
			},
			{
				id: 'faq-buyer-2',
				subject: 'How can I find the right listing faster?',
				content: 'Use precise filters and try sorting by price or newest listings.',
			},
			{
				id: 'faq-buyer-3',
				subject: 'Can I contact an agent or owner before booking?',
				content: 'Contact options depend on the listing. For official support questions, use Inquiry.',
			},
			{
				id: 'faq-buyer-4',
				subject: 'How do I save a listing for later?',
				content: 'Click the Favorite button and access it later from My Page -> Favorites.',
			},
			{
				id: 'faq-buyer-5',
				subject: 'Where do support replies appear?',
				content: 'Admin replies appear in the same Inquiry room you created.',
			},
		],
		agents: [
			{
				id: 'faq-agent-1',
				subject: 'How do I join the platform as an agent?',
				content: 'Complete your profile and pass admin verification if required.',
			},
			{
				id: 'faq-agent-2',
				subject: 'What fields are required when creating a listing?',
				content: 'Title, location, price, description, and primary media files should be complete.',
			},
			{
				id: 'faq-agent-3',
				subject: 'Why is my listing not visible?',
				content: 'It may be under moderation, have a status change, or have missing required details. Check via Inquiry.',
			},
			{
				id: 'faq-agent-4',
				subject: 'How quickly should I respond to booking requests?',
				content: 'For better user experience, respond as fast as possible, ideally within one hour.',
			},
			{
				id: 'faq-agent-5',
				subject: 'Can I see stats in the agent dashboard?',
				content: 'Yes, key metrics for your listings and bookings are available.',
			},
		],
		membership: [
			{
				id: 'faq-membership-1',
				subject: 'Can I use Hanbooking without registering?',
				content: 'You can browse some pages, but booking, inquiry, and favorites require login.',
			},
			{
				id: 'faq-membership-2',
				subject: 'Where can I update my profile information?',
				content: 'You can update profile details in My Page.',
			},
			{
				id: 'faq-membership-3',
				subject: 'What if I forgot my password?',
				content: 'Use the reset flow on the login page or contact support through Inquiry.',
			},
			{
				id: 'faq-membership-4',
				subject: 'Can I deactivate or close my account?',
				content: 'Yes, send a request through support Inquiry.',
			},
			{
				id: 'faq-membership-5',
				subject: 'Where can I see notifications?',
				content: 'Open the bell icon in the top bar to view your notifications.',
			},
		],
		community: [
			{
				id: 'faq-community-1',
				subject: 'What can I post in the Community section?',
				content: 'You can share useful real-estate related posts, experiences, and discussions.',
			},
			{
				id: 'faq-community-2',
				subject: 'What should I do if I see spam or abusive content?',
				content: 'Report it via admin or support Inquiry. The content will be reviewed and moderated.',
			},
			{
				id: 'faq-community-3',
				subject: 'Why is my post not visible?',
				content: 'It may be under moderation or temporarily hidden due to policy issues.',
			},
			{
				id: 'faq-community-4',
				subject: 'Is direct user-to-user chat available?',
				content: 'Currently, 1:1 Inquiry is available for official support. More features may be added later.',
			},
			{
				id: 'faq-community-5',
				subject: 'How can I correct misinformation?',
				content: 'Leave a factual comment or send details to admin through Inquiry for review.',
			},
		],
		other: [
			{
				id: 'faq-other-1',
				subject: 'What is the fastest way to contact support?',
				content: 'Use the Inquiry tab in the CS section. Replies appear in the same room.',
			},
			{
				id: 'faq-other-2',
				subject: 'What details should I provide for technical issues?',
				content: 'Share the page URL, time, error text, and a screenshot if possible.',
			},
			{
				id: 'faq-other-3',
				subject: 'Can I suggest new features?',
				content: 'Yes. Send your feature request through Inquiry, and the product team will review it.',
			},
			{
				id: 'faq-other-4',
				subject: 'How is data privacy handled?',
				content: 'Account and activity data are protected according to the platform policy.',
			},
			{
				id: 'faq-other-5',
				subject: 'How long does it take to get an admin reply?',
				content: 'Replies are usually fast during business hours. Complex issues may require extra review time.',
			},
		],
	};

	const adminFaqs: FaqItem[] = (faqData?.getNotices?.list ?? []).map((item: Notice) => ({
		id: `admin-${item._id}`,
		subject: item.noticeTitle,
		content: item.noticeContent,
	}));

	const faqList: FaqItem[] = [...(staticFaqs[category] ?? []), ...adminFaqs];

	useEffect(() => {
		setExpanded(faqList[0]?.id || false);
	}, [category, faqList.length]);

	const changeCategoryHandler = (nextCategory: string) => {
		setCategory(nextCategory);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	}

	return (
		<Stack className={'faq-content'}>
			<Box className={'categories'} component={'div'}>
				<div className={category === 'property' ? 'active' : ''} onClick={() => changeCategoryHandler('property')}>
					Property
				</div>
				<div className={category === 'payment' ? 'active' : ''} onClick={() => changeCategoryHandler('payment')}>
					Payment
				</div>
				<div className={category === 'buyers' ? 'active' : ''} onClick={() => changeCategoryHandler('buyers')}>
					For Buyers
				</div>
				<div className={category === 'agents' ? 'active' : ''} onClick={() => changeCategoryHandler('agents')}>
					For Agents
				</div>
				<div className={category === 'membership' ? 'active' : ''} onClick={() => changeCategoryHandler('membership')}>
					Membership
				</div>
				<div className={category === 'community' ? 'active' : ''} onClick={() => changeCategoryHandler('community')}>
					Community
				</div>
				<div className={category === 'other' ? 'active' : ''} onClick={() => changeCategoryHandler('other')}>
					Other
				</div>
			</Box>
			<Box className={'wrap'} component={'div'}>
				{faqList.map((ele: FaqItem) => (
					<Accordion expanded={expanded === ele.id} onChange={handleChange(ele.id)} key={ele.id}>
						<AccordionSummary id={`faq-header-${ele.id}`} className="question" aria-controls={`faq-content-${ele.id}`}>
							<Typography className="badge" variant={'h4'}>
								Q
							</Typography>
							<Typography>{ele.subject}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Stack className={'answer flex-box'}>
								<Typography className="badge" variant={'h4'} color={'primary'}>
									A
								</Typography>
								<Typography>{ele.content}</Typography>
							</Stack>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Stack>
	);
};

export default Faq;
