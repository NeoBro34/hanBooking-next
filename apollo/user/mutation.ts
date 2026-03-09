import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
	mutation Signup($input: MemberInput!) {
		signup(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberWarnings
			memberBlocks
			memberProperties
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberWarnings
			memberBlocks
			memberProperties
			memberRank
			memberPoints
			memberLikes
			memberViews
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const UPDATE_MEMBER = gql`
	mutation UpdateMember($input: MemberUpdate!) {
		updateMember(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberProperties
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const LIKE_TARGET_MEMBER = gql`
	mutation LikeTargetMember($input: String!) {
		likeTargetMember(memberId: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberWarnings
			memberBlocks
			memberProperties
			memberRank
			memberPoints
			memberLikes
			memberViews
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        PROPERTY        *
 *************************/

export const CREATE_PROPERTY = gql`
	mutation CreateProperty($input: PropertyInput!) {
		createProperty(input: $input) {
			_id
			propertyType
			propertyStatus
			propertyLocation
			propertyAddress
			propertyTitle
			propertyPricePerNight
			propertyMaxGuests
			propertyBeds
			propertyRooms
			propertyViews
			propertyLikes
			propertyComments
			propertyRank
			propertyPoints
			propertyImages
			amenities
			propertyDesc
			memberId
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_PROPERTY = gql`
	mutation UpdateProperty($input: PropertyUpdate!) {
		updateProperty(input: $input) {
			_id
			propertyType
			propertyStatus
			propertyLocation
			propertyAddress
			propertyTitle
			propertyPricePerNight
			propertyMaxGuests
			propertyBeds
			propertyRooms
			propertyViews
			propertyLikes
			propertyComments
			propertyRank
			propertyPoints
			propertyImages
			amenities
			propertyDesc
			memberId
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

export const LIKE_TARGET_PROPERTY = gql`
	mutation LikeTargetProperty($input: String!) {
		likeTargetProperty(propertyId: $input) {
			_id
			propertyType
			propertyStatus
			propertyLocation
			propertyAddress
			propertyTitle
			propertyPricePerNight
			propertyMaxGuests
			propertyBeds
			propertyRooms
			propertyViews
			propertyLikes
			propertyComments
			propertyRank
			propertyPoints
			propertyImages
			amenities
			propertyDesc
			memberId
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_BOARD_ARTICLE = gql`
	mutation CreateBoardArticle($input: BoardArticleInput!) {
		createBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_BOARD_ARTICLE = gql`
	mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
		updateBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const LIKE_TARGET_BOARD_ARTICLE = gql`
	mutation LikeTargetBoardArticle($input: String!) {
		likeTargetBoardArticle(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CommentInput!) {
		createComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_COMMENT = gql`
	mutation UpdateComment($input: CommentUpdate!) {
		updateComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
	mutation Subscribe($input: String!) {
		subscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
		unsubscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;


/**************************
 *         BOOKING        *
 *************************/

export const CREATE_BOOKING = gql`
	mutation CreateBooking($input: CreateBookingInput!) {
		createBooking(input: $input) {
			_id
			memberId
			propertyId
			guests
			checkInDate
			checkOutDate
			totalPrice
			bookingStatus
		}
	}
`;

export const CONFIRM_BOOKING = gql`
	mutation ConfirmBooking($bookingId: String!) {
		confirmBooking(bookingId: $bookingId) {
			_id
			memberId
			propertyId
			guests
			checkInDate
			checkOutDate
			totalPrice
			bookingStatus
		}
	}
`;

export const CANCEL_BOOKING = gql`
	mutation ConfirmBooking($bookingId: String!) {
		cancelBooking(bookingId: $bookingId) {
			_id
			memberId
			propertyId
			guests
			checkInDate
			checkOutDate
			totalPrice
			bookingStatus
		}
	}
`;

export const COMPLETE_BOOKING = gql`
	mutation CompleteBooking($bookingId: String!) {
		completeBooking(bookingId: $bookingId) {
			_id
			memberId
			propertyId
			guests
			checkInDate
			checkOutDate
			totalPrice
			bookingStatus
		}
	}
`;

/**************************
 *         INQUIRY        *
 *************************/

export const CREATE_INQUIRY = gql`
	mutation CreateInquiry($input: CreateInquiryInput!) {
		createInquiry(input: $input) {
			_id
			noticeCategory
			noticeStatus
			noticeTitle
			noticeContent
			memberId
			inquiryAnswer
			answeredAt
			answeredBy
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      NOTIFICATION      *
 *************************/

export const MARK_NOTIFICATION_READ = gql`
	mutation MarkNotificationRead($notificationId: String!) {
		markNotificationRead(notificationId: $notificationId) {
			_id
			notificationStatus
			updatedAt
		}
	}
`;

export const MARK_ALL_NOTIFICATIONS_READ = gql`
	mutation MarkAllNotificationsRead {
		markAllNotificationsRead
	}
`;

export const SEND_INQUIRY_MESSAGE = gql`
	mutation SendInquiryMessage($input: SendInquiryMessageInput!) {
		sendInquiryMessage(input: $input) {
			_id
			inquiryId
			senderId
			message
			createdAt
			updatedAt
			senderData {
				_id
				memberType
				memberNick
				memberImage
			}
		}
	}
`;
