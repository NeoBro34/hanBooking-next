import { NoticeStatus } from '@/libs/enums/notice.enum';

export interface NoticeUpdate {
	_id: string;
	noticeTitle?: string;
	noticeContent?: string;
	noticeStatus?: NoticeStatus;
}

export interface AnswerInquiryInput {
	_id: string;
	inquiryAnswer: string;
}
