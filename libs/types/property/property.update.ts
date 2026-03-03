import { PropertyAmenity, PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';

export interface PropertyUpdate {
    _id: string;
    propertyType?: PropertyType;
    propertyStatus?: PropertyStatus;
    propertyLocation?: PropertyLocation;
    propertyAddress?: string;
    propertyTitle?: string;
    propertyPricePerNight?: number;
    propertyMaxGuests?: number;
    propertyBeds?: number;
    propertyRooms?: number;
    propertyImages?: string[];
    amenities?: PropertyAmenity[];
    propertyDesc?: string;
    deletedAt?: Date;
    constructedAt?: Date;
}
