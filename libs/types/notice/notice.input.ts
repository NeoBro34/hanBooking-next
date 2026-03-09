import { Direction } from '@/libs/enums/common.enum';
import { NoticeCategory, NoticeStatus } from '@/libs/enums/notice.enum';

export interface CreateNoticeInput {
	noticeCategory: NoticeCategory;
	noticeTitle: string;
	noticeContent: string;
}

export interface CreateInquiryInput {
	noticeTitle: string;
	noticeContent: string;
}

interface NoticesSearch {
	noticeCategory?: NoticeCategory;
	noticeStatus?: NoticeStatus;
	memberId?: string;
	text?: string;
}

export interface NoticesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: NoticesSearch;
}
