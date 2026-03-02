import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
// import CommunityCard from '../common/CommunityCard';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { BoardArticle } from '../../types/board-article/board-article';
import { Booking, Bookings } from '@/libs/types/booking/booking';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const MyBookings: NextPage = ({ initialInput, ...props }: T) => {
    const device = useDeviceDetect();
    const user = useReactiveVar(userVar);
    const [searchBookings, setSearchBookings] = useState({
        ...initialInput,
        search: { memberId: user._id },
    });
    const [bookings, setBookings] = useState<Bookings[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    /** APOLLO REQUESTS **/

    /** HANDLERS **/
    const paginationHandler = (e: T, value: number) => {
        setSearchBookings({ ...searchBookings, page: value });
    };

    if (device === 'mobile') {
        return <>ARTICLE PAGE MOBILE</>;
    } else
        return (
            <div id="my-bookings-page">
                <Stack className="main-title-box">
                    <Stack className="right-box">
                        <Typography className="main-title">Article</Typography>
                        <Typography className="sub-title">We are glad to see you again!</Typography>
                    </Stack>
                </Stack>
                <Stack className="article-list-box">
                    {true ? (
                        [1,2,3].map(() => (
                            <Stack className='card-box'>
                            <img src="/img/property/noimg.png" alt="" />
                            <Stack className='item-info'>
                                <h1>Hotel Name</h1>
                                <h4><LocationOnIcon sx={{mr:"6px"}}/>Location</h4>
                                <span><PeopleIcon sx={{mr:"6px"}}/>Guests: <strong>2</strong></span>
                                <strong>Total: <span>$357</span></strong>
                            </Stack>
                            <Stack className='check-box'>
                                <Box className='checking'>
                                    <strong>Check-In:</strong>
                                    <span>Tue Mar 03 2026</span>
                                </Box>
                                 <Box className='checking'>
                                    <strong>Check-Out:</strong>
                                    <span>Tue Mar 06 2026</span>
                                </Box>
                                <Box className='pay-box'>
                                    <span><RadioButtonCheckedIcon sx={{mr:"7px"}}/>Unpaid</span>
                                    <Button color='secondary' className='pay-button'><p>Pay Now</p></Button>
                                </Box>
                            </Stack>
                        </Stack>
                        ))
                    ) : (
                        <div className={'no-data'}>
                            <img src="/img/icons/icoAlert.svg" alt="" />
                            <p>No Articles found!</p>
                        </div>
                    )}
                </Stack>

                {bookings?.length > 0 && (
                    <Stack className="pagination-conf">
                        <Stack className="pagination-box">
                            <Pagination
                                count={Math.ceil(totalCount / searchBookings.limit)}
                                page={searchBookings.page}
                                shape="circular"
                                color="primary"
                                onChange={paginationHandler}
                            />
                        </Stack>
                        <Stack className="total">
                            <Typography>Total {totalCount ?? 0} booking(s) available</Typography>
                        </Stack>
                    </Stack>
                )}
            </div>
        );
};

MyBookings.defaultProps = {
    initialInput: {
        page: 1,
        limit: 6,
        sort: 'createdAt',
        direction: 'DESC',
        search: {},
    },
};

export default MyBookings;
