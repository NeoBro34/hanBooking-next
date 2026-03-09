import { Member } from '../member/member';

export interface InquiryMessage {
	_id: string;
	inquiryId: string;
	senderId: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	senderData?: Member;
}
