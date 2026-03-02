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
}

export interface TotalCounter {
    total: number;
}

export interface Bookings {
    list: Booking[];
    metaCounter: TotalCounter[];
}