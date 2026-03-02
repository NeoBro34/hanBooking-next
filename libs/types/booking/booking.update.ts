import { OrderStatus } from "../../enums/booking.enum";

export interface BookingUpdate {
    _id: string;
    memberId?: string;
    propertyId?: string;
    guests?: number;
    checkInDate?: Date;
    checkOutDate?: Date;
    totalPrice?: number;
    bookingStatus?: OrderStatus;
}