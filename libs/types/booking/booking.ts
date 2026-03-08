import { OrderStatus } from "../../enums/booking.enum";

export interface Booking {
    _id: string;
    memberId: string;
    propertyId: string;
    guests: number;
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    bookingStatus?: OrderStatus;
    propertyData: {
        _id: string;
        propertyTitle: string;
        propertyLocation: string;
        propertyPricePerNight: number;
        propertyImages: string[];
    };
    memberData: {
        _id: string;
        memberNick: string;
        memberPhone: string;
        memberImage?: string;
    };
}

export interface TotalCounter {
    total: number;
}

export interface Bookings {
    list: Booking[];
    metaCounter: TotalCounter[];
}