import { PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';
import { PropertyAmenity } from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
    _id: string;
    propertyType: PropertyType;
    propertyStatus: PropertyStatus;
    propertyLocation: PropertyLocation;
    propertyAddress: string;
    propertyTitle: string;
    propertyPricePerNight: number;
    propertyMaxGuests: number;
    propertyBeds: number;
    propertyRooms: number;
    propertyViews: number;
    propertyLikes: number;
    propertyComments: number;
    propertyRank: number;
    propertyPoints: number;
    propertyImages: string[];
    amenities: PropertyAmenity[];
    propertyDesc?: string;
    memberId: string;
    deletedAt?: Date;
    constructedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    /** from aggregation **/
    meLiked?: MeLiked[];
    memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}
