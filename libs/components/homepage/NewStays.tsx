import React, { useEffect, useState } from 'react';
import { Box, Stack, Pagination } from '@mui/material';
import { PropertiesInquiry } from '@/libs/types/property/property.input';
import useDeviceDetect from '@/libs/hooks/useDeviceDetect';
import { Property } from '@/libs/types/property/property';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '@/apollo/user/query';
import { T } from '@/libs/types/common';
import { LIKE_TARGET_PROPERTY } from '@/apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '@/libs/sweetAlert';
import { Message } from '../../enums/common.enum';
import SmallStayBookingCard from '../common/SmallPropertyCard';


interface NewStaysProps {
    initialInput: PropertiesInquiry;
}

const NewStays = (props: NewStaysProps) => {
    const { initialInput } = props;
    const device = useDeviceDetect();
    const [featuredStays, setFeaturedStays] = useState<Property[]>([]);
    const [page, setPage] = useState(initialInput.page || 1);

    /** APOLLO REQUESTS **/
    const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

    const {
        loading: getFeaturedStaysLoading,
        data: getFeaturedStaysData,
        error: getFeaturedStaysError,
        refetch: getFeaturedStaysRefetch,
    } = useQuery(
        GET_PROPERTIES, 
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                input: {
                    ...initialInput,
                    page: page,
                }
            },
            notifyOnNetworkStatusChange: true,
        }
    );

    useEffect(() => {
        if (getFeaturedStaysData) {
            setFeaturedStays(getFeaturedStaysData?.getProperties?.list);
        }
    }, [getFeaturedStaysData]);

    const total = getFeaturedStaysData?.getProperties?.metaCounter?.[0]?.total ?? 0;
    const limit = initialInput.limit ?? 6;
    const pageCount = Math.ceil(total / limit);
    
    /** HANDLERS **/
    const likePropertyHandler = async (user: T, id: string) => {
        try {
            if(!id) return;
            if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

            // execute likeTargetProperty Mutation
            await likeTargetProperty({
                variables: { input: id },
            });

            // execute getFeaturedStaysRefetch
            await getFeaturedStaysRefetch({ input: initialInput });

            await sweetTopSmallSuccessAlert('success', 800);
        } catch (err: any) {
            console.log('ERROR, likePropertyHandler:', err.message);
            sweetMixinErrorAlert(err.message).then();
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (!featuredStays) return null;

    if (device === 'mobile') {
        return (
            <div>Mobile</div>
        );
    } else {
        return (
            <>
                <Stack 
                    style={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        marginTop: "150px"
                    }}
                >
                    <Box>
                        <p
                        className="title text-3xl font-semibold"
                        >
                            Featured Top Stays
                        </p>
                        <p
                            className="title-desc text-sm text-slate-500  mt-2"
                        >
                            Handpicked luxury accommodations for unforgettable experiences
                        </p>
                    </Box>
                    <Box>
                        <div className="flex items-center justify-end mt-6 text-sm">
                            <button
                                type="button"
                                className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium text-gray-500  transition active:scale-95"
                            >
                                <a href="/stays" className="group-hover:translate-x-1 transition-all">
                                    All Stays
                                </a>
                                <svg
                                    className="group-hover:translate-x-3 transition-all"
                                    width="15"
                                    height="11"
                                    viewBox="0 0 15 11"
                                    fill="none"
                                >
                                    <path
                                        d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </Box>
                </Stack>
                <Stack className="featuredRooms" id="rooms">
                    <Stack className="roomCard-box" >
                        {featuredStays.map((property: Property) => {
                            return (
                                <SmallStayBookingCard property={property} likePropertyHandler={likePropertyHandler} key={property._id}/>
                            );
                        })}
                    </Stack>
                    <Pagination
                        page={page}
                        count={pageCount}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                    />
                </Stack>
            </>
        );
    }
};

NewStays.defaultProps = {
    initialInput: {
        page: 1,
        limit: 6,
        sort: 'createdAt',
        direction: 'DESC',
        search: {},
    },
};

export default NewStays;
