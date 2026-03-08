import { OrderStatus } from "../../enums/booking.enum";

export interface BookingUpdate {
    _id: string;
    bookingStatus?: OrderStatus;
}