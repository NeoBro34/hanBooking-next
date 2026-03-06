import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { Property } from '../../types/property/property';
import { formatterStr } from '../../utils';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { PropertyStatus } from '../../enums/property.enum';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Booking } from '@/libs/types/booking/booking';

interface MyBookingCardProps {
    myBooking: Booking;
    confirmBookingHandler?: any;
    completeBookingHandler?: any;
    cancelBookingHandler?: any;
    memberPage?: boolean;
}

export const MyBookingCard = (props: MyBookingCardProps) => {
    const { myBooking, memberPage, confirmBookingHandler, completeBookingHandler, cancelBookingHandler } = props;
    const device = useDeviceDetect();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const property = myBooking.propertyData;

    /** HANDLERS **/
    const pushEditProperty = async (id: string) => {
        console.log('+pushEditProperty: ', id);
        await router.push({
            pathname: '/mypage',
            query: { category: 'myBookings', bookingId: id },
        });
    };

    const pushPropertyDetail = async (id: string) => {
        if (memberPage)
            await router.push({
                pathname: '/stays/detail',
                query: { id: id },
            });
        else return;
    };
    console.log('memberPage:', memberPage);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (device === 'mobile') {
        return <div>MOBILE PROPERTY CARD</div>;
    } else
        return (
            <Stack className="my-booking-card-box">
                <Stack className='card-box'>
                    <img 
                        src={`${process.env.REACT_APP_API_URL}/${property?.propertyImages?.[0]}`} alt="" 
                        onClick={() => pushPropertyDetail(property?._id)}
                        style={{cursor:"pointer"}}
                    />
                        <Stack className='item-info'>
                            <h1 
                                onClick={() => pushPropertyDetail(property?._id)}
                                style={{cursor:"pointer"}}
                            >
                                {property.propertyTitle}
                            </h1>
                            <h4><LocationOnIcon sx={{mr:"1px"}}/>{property.propertyLocation}</h4>
                            <span><PeopleIcon sx={{mr:"6px"}}/>Guests: <strong>{myBooking.guests}</strong></span>
                            <strong>Total: <span>${myBooking.totalPrice}</span></strong>
                        </Stack>
                        <Stack className='check-box'>
                            <Box className='checking'>
                                <strong>Check-In:</strong>
                                <span>{new Date(myBooking.checkInDate).toLocaleDateString("en-US", 
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                            </Box>
                                <Box className='checking'>
                                <strong>Check-Out:</strong>
                                <span>{new Date(myBooking.checkOutDate).toLocaleDateString("en-US", 
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                            </Box>
                            <Box className='pay-box'>
                                <span style={
                                            myBooking.bookingStatus === 'PENDING'
                                            ? { color: "blue" }
                                            : myBooking.bookingStatus === 'CONFIRMED'
                                            ? { color: "orange" }
                                            : myBooking.bookingStatus === 'COMPLETED'
                                            ? { color: "green" }
                                            : { color: "red" }
                                        }>
                                    <RadioButtonCheckedIcon sx={{mr:"7px"}}/>
                                    {myBooking.bookingStatus}
                                </span>

                                {myBooking.bookingStatus !== "CANCELLED" &&
                                    myBooking.bookingStatus !== "COMPLETED" && (
                                    <Button
                                        color='error'
                                        className='cancle-button'
                                        onClick={() => cancelBookingHandler?.(myBooking._id)}
                                    >
                                        <p>Cancel</p>
                                    </Button>
                                )}

                                {myBooking.bookingStatus === "PENDING" && (
                                    <Button
                                        color='success'
                                        className='pay-button'
                                        onClick={() => confirmBookingHandler?.(myBooking._id)}
                                    >
                                        <p>Pay Now</p>
                                    </Button>
                                )}

                                {/* {myBooking.bookingStatus === "CONFIRMED" && (
                                    <Button
                                        color='primary'
                                        onClick={() => completeBookingHandler?.(myBooking._id)}
                                    >
                                        Complete
                                    </Button>
                                )} */}
                            </Box>
                        </Stack>
                    </Stack>
            </Stack>
        );
};
