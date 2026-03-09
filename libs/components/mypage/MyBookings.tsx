import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
// import CommunityCard from '../common/CommunityCard';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { BoardArticle } from '../../types/board-article/board-article';
import { Booking, Bookings } from '@/libs/types/booking/booking';
import { BookingsInquiry } from '@/libs/types/booking/booking.input';
import { useRouter } from 'next/router';
import { GET_MY_BOOKINGS } from '@/apollo/user/query';
import { OrderStatus } from '@/libs/enums/booking.enum';
import { sweetConfirmAlert, sweetErrorHandling } from '@/libs/sweetAlert';
import { CANCEL_BOOKING, COMPLETE_BOOKING, CONFIRM_BOOKING } from '@/apollo/user/mutation';
import { MyBookingCard } from './MyBookingCard';
import { useTranslation } from 'next-i18next';

const MyBookings: NextPage = ({ initialInput, ...props }: T) => {
    const device = useDeviceDetect();
    const { t } = useTranslation('common');
    const user = useReactiveVar(userVar);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [searchFilter, setSearchFilter] = useState<BookingsInquiry>(initialInput);
    const [myBookings, setMyBookings] = useState<Booking[]>([]);
    const [total, setTotal] = useState<number>(0);
    const router = useRouter();

    /** APOLLO REQUESTS **/
    const [confirmBooking] = useMutation(CONFIRM_BOOKING);
    const [completeBooking] = useMutation(COMPLETE_BOOKING);
    const [cancelBooking] = useMutation(CANCEL_BOOKING);
    

    const {
        loading: getMyBookingLoading,
        data: getMyBookingData,
        error: getMyBookingError,
        refetch: getMyBookingRefetch,
    } = useQuery(
        GET_MY_BOOKINGS, 
        {
            fetchPolicy: 'network-only',
            variables: { input: searchFilter },
            notifyOnNetworkStatusChange: true,
        }
    );

    useEffect(() => {
        if (getMyBookingData) {
            setMyBookings(getMyBookingData?.getMyBookings?.list);
            setTotal(getMyBookingData?.getMyBookings?.metaCounter[0]?.total ?? 0);
        }
    }, [getMyBookingData]);

    /** HANDLERS **/
    const paginationHandler = (e: T, value: number) => {
        setSearchFilter({ ...searchFilter, page: value });
    };

    const changeStatusHandler = async (value: OrderStatus) => {
        const newFilter = {
            ...searchFilter,
            page: 1,
            search: {
                ...searchFilter.search,
                bookingStatus: value,
            },
        };

        setSearchFilter(newFilter);

        await getMyBookingRefetch({
            input: newFilter,
        });
    };

    const confirmBookingHandler = async (id: string) => {
        console.log("booking id:", id);
        try {
            if (await sweetConfirmAlert(t('Are you sure to CONFIRM this booking?'))) {
                await confirmBooking({
                    variables: {
                        bookingId: id
                    },
                });

                await getMyBookingRefetch({ input: searchFilter });
            }
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };

    const completeBookingHandler = async (id: string) => {
        try {
            if (await sweetConfirmAlert(t('Are you sure to COMPLETE this booking?'))) {
                await completeBooking({
                    variables: {
                        bookingId: id,
                    },
                });

                await getMyBookingRefetch({ input: searchFilter });
            }
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };

    const cancelBookingHandler = async (id: string) => {
        try {
            if (await sweetConfirmAlert(t('Are you sure to CANCEL this booking?'))) {
                await cancelBooking({
                    variables: {
                        bookingId: id,
                    },
                });

                await getMyBookingRefetch({ input: searchFilter });
            }
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };

    

    if (device === 'mobile') {
        return <>{t('ARTICLE PAGE MOBILE')}</>;
    } else
        return (
            <div id="my-bookings-page">
                <Stack className="main-title-box">
                    <Stack className="right-box">
                        <Typography className="main-title">{t('My Bookings')}</Typography>
                        <Typography className="sub-title">{t('We are glad to see you again!')}</Typography>
                    </Stack>
                </Stack>
                <Stack className="property-list-box">
                    <Stack className="tab-name-box">
                        <Typography
                            onClick={() => changeStatusHandler(OrderStatus.PENDING)}
                            className={searchFilter.search.bookingStatus === 'PENDING' ? 'active-tab-name' : 'tab-name'}
                        >
                            {t('Pending')}
                        </Typography>
                        <Typography
                            onClick={() => changeStatusHandler(OrderStatus.CONFIRMED)}
                            className={searchFilter.search.bookingStatus === 'CONFIRMED' ? 'active-tab-name' : 'tab-name'}
                        >
                            {t('Confirmed')}
                        </Typography>
                        <Typography
                            onClick={() => changeStatusHandler(OrderStatus.COMPLETED)}
                            className={searchFilter.search.bookingStatus === 'COMPLETED' ? 'active-tab-name' : 'tab-name'}
                        >
                            {t('Completed')}
                        </Typography>
                        <Typography
                            onClick={() => changeStatusHandler(OrderStatus.CANCELLED)}
                            className={searchFilter.search.bookingStatus === 'CANCELLED' ? 'active-tab-name' : 'tab-name'}
                        >
                            {t('Cancelled')}
                        </Typography>
                    </Stack>
                    <Stack className="list-box">
                        <Stack className="listing-title-box">
                            <Typography className="title-text">{t('Listing title')}</Typography>
                            <Typography className="title-text">{t('Date Published')}</Typography>
                            <Typography className="title-text">{t('Status')}</Typography>
                            <Typography className="title-text">{t('View')}</Typography>
                            <Typography className="title-text">{t('Action')}</Typography>
                        </Stack>

                        {myBookings?.length === 0 ? (
                            <div className={'no-data'}>
                                <img src="/img/icons/icoAlert.svg" alt="" />
                                <p>{t('No Property found!')}</p>
                            </div>
                        ) : (
                            myBookings.map((myBooking: Booking) => {
                                return (
                                    <MyBookingCard
                                        memberPage={true}
                                        myBooking={myBooking}
                                        confirmBookingHandler={confirmBookingHandler}
                                        completeBookingHandler={completeBookingHandler}
                                        cancelBookingHandler={cancelBookingHandler}
                                    />
                                );
                            })
                        )}

                        {myBookings.length !== 0 && (
                            <Stack className="pagination-config">
                                <Stack className="pagination-box">
                                    <Pagination
                                        count={Math.ceil(total / searchFilter.limit)}
                                        page={searchFilter.page}
                                        shape="circular"
                                        color="primary"
                                        onChange={paginationHandler}
                                    />
                                </Stack>
                                <Stack sx={{width:'100%', alignItems:'center', display:'flex', justifyContent:'center'}}>
                                    <Typography>{total} {t('property available')}</Typography>
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </div>
        );
};

MyBookings.defaultProps = {
    initialInput: {
        page: 1,
        limit: 6,
        sort: 'createdAt',
        direction: 'DESC',
        search: {
            bookingStatus: 'PENDING'
        },
    },
};

export default MyBookings;
