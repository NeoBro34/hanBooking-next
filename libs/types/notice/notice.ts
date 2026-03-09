import { NoticeCategory, NoticeStatus } from '@/libs/enums/notice.enum';
import { TotalCounter } from '../property/property';
import { Member } from '../member/member';

export interface Notice {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	memberId: string;
	inquiryAnswer?: string;
	answeredAt?: Date;
	answeredBy?: string;
	createdAt: Date;
	updatedAt: Date;
	memberData?: Member;
}

export interface Notices {
	list: Notice[];
	metaCounter: TotalCounter[];
}
