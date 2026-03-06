import { OrderStatus } from '../../enums/booking.enum';
import { PropertyLocation, PropertyType } from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface CreateBookingInput {
    propertyId: string;
    guests: number;
    checkInDate: Date;
    checkOutDate: Date;
    bookingStatus?: OrderStatus;
}

interface BokISearch {
  bookingStatus?: OrderStatus;
}

export interface BookingsInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: BokISearch;
}

interface ABokISearch {
  propertyId: string;
  bookingStatus?: OrderStatus;
}

export interface AgentBookingInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: ABokISearch;
}

interface ALBokISearch {
  bookingStatus?: OrderStatus;
  propertyLocationList?: PropertyLocation[];
}

export interface AllBookingsInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: ALBokISearch;
}

interface BookingRange {
	start: number;
	end: number;
}
