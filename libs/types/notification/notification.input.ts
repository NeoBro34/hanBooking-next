import { Direction } from '@/libs/enums/common.enum';
import {
	NotificationGroup,
	NotificationStatus,
	NotificationType,
} from '@/libs/enums/notification.enum';

export interface CreateNotificationInput {
	notificationType: NotificationType;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	receiverId: string;
	propertyId?: string;
	articleId?: string;
}

interface NotificationsSearch {
	notificationStatus?: NotificationStatus;
	notificationGroup?: NotificationGroup;
	notificationType?: NotificationType;
}

export interface NotificationsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: NotificationsSearch;
}
