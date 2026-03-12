import { useState } from 'react';
import { Box, Button, CardMedia, IconButton, Rating, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import PoolIcon from '@mui/icons-material/Pool';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Property } from '@/libs/types/property/property';
import useDeviceDetect from '@/libs/hooks/useDeviceDetect';
import BoltIcon from '@mui/icons-material/Bolt';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '@/apollo/store';
import { REACT_APP_API_URL, topPropertyRank } from '@/libs/config';
import Link from 'next/link';
import { PropertyAmenity } from '@/libs/enums/property.enum';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}


const StayBookingCard = (props: PropertyCardType) => {
    const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
    const router = useRouter();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';
    
    const pushDetailHandler = async ( propertyId:string ) => {
        await router.push({ pathname: '/stays/detail', query: {id: propertyId}});
	};


    if (device === 'mobile') {
		return (
            <div>{t('PROPERTY CARD')}</div>
        );
	} else {
        return (
            <Stack className='new-stay-box-left'>
                <Stack className="new-stay-card bg-white rounded-2xl shadow-md max-w-4xl w-full">
                    <div className="flex flex-col md:flex-row h-64">
                        <Stack className="cardImageWrapper">
                            {property.createdAt && Date.now() - new Date(property.createdAt).getTime() <= 10 * 24 * 60 * 60 * 1000 ? (
                                <Box className='top-icon'>
                                    <Box><AutoAwesomeIcon/></Box>
                                    <Typography sx={{ml:"15px", mt:"3px",fontWeight:"bold"}}>{t('New')}</Typography>
                                </Box>
                            ) : (
                            property && property?.propertyRank > topPropertyRank && (
                                <Box className='top-icon-top'>
                                    <Box><BoltIcon/></Box>
                                    <Typography sx={{ml:"7px", mt:"3px",fontWeight:"bold"}}>{t('Top')}</Typography>
                                </Box>
                            ))}
                            <CardMedia
                                component="img"
                                image={imagePath}
                                alt={'propertycard'}
                                className="cardImage"
                                onClick={() => { pushDetailHandler(property?._id) }}
                            />
                        </Stack>
                        <Stack className="md:w-3/4 p-3 flex flex-col justify-between">
                            <Stack className='obsion-box'>
                                <Box className='info-box'>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-3 mt-2">
                                        <Link
                                            href={{
                                                pathname: '/stays/detail',
                                                query: { id: property?._id },
                                            }}
                                        >
                                            {property.propertyTitle}
                                        </Link>
                                    </h2>
                                    <div className="flex items-center gap-1 text-gray-600 mb-3">
                                        <LocationOnIcon sx={{ fontSize: 20 }} />
                                        <span className="text-sm">{property.propertyLocation}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-8">
                                        <Rating 
                                            value={4.8} 
                                            precision={0.1} 
                                            readOnly 
                                            size="small"
                                        />
                                        <span className="text-sm text-gray-600">
                                            ({property.propertyComments} {t('reviews')})
                                        </span>
                                    </div>
                                    <div className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                                        <Stack className="amenities">
                                            <Box className="amenity">
                                                <MeetingRoomIcon />
                                                <span>{property.propertyRooms} Room</span>
                                            </Box>
                                            <Box className="amenity">
                                                <BedIcon />
                                                <span>{property.propertyBeds} Beds</span>
                                            </Box>
                                            {property.amenities.includes(PropertyAmenity.POOL) && (
                                                <Box className="amenity">
                                                    <PoolIcon />
                                                    <span>Pool</span>
                                                </Box>
                                            )}
                                            {property.amenities.includes(PropertyAmenity.WIFI) && (
                                                <Box className="amenity">
                                                    <SelfImprovementIcon />
                                                    <span>Wifi</span>
                                                </Box>
                                            )}
                                            {property.amenities.includes(PropertyAmenity.PARKING) && (
                                                <Box className="amenity">
                                                    <LocalParkingIcon  />
                                                    <span>Parking</span>
                                                </Box>
                                            )}
                                        </Stack>
                                    </div>
                                </Box>
                                <Box className="rating-box">
                                    <IconButton 
                                        onClick={() => likePropertyHandler(user, property?._id)}
                                        style={{marginLeft: "-8px"}}
                                    >
                                        <Badge 
                                            badgeContent={property.propertyLikes} 
                                            style={{color: "gray", cursor: "pointer"}}>
                                                {myFavorites ? ( 
                                                    <FavoriteIcon sx={{ fontSize: 35, color: '#ef4444' }} /> 
                                                ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? ( 
                                                    <FavoriteIcon sx={{ fontSize: 35, color: '#ef4444' }} /> 
                                                ) : ( 
                                                    <FavoriteBorderIcon sx={{ fontSize: 35}} /> 
                                                )}
                                        </Badge>
                                    </IconButton>
                                    <div>
                                        <Badge 
                                            badgeContent={property.propertyViews} 
                                            style={{color: "gray", cursor: "pointer",}}>
                                                <RemoveRedEyeIcon sx={{ color: true ? "gray" : "white",fontSize:"35px" }}/>
                                        </Badge>
                                    </div>
                                    <div>
                                        {false ? 
                                            <BookmarkAddedIcon sx={{ color: "gray", cursor: "pointer", fontSize:"35px"}}/>
                                        : 
                                            <BookmarkAddIcon sx={{ color: "gray", cursor: "pointer", fontSize:"35px"}}/> 
                                        }
                                    </div>
                                </Box>
                            </Stack>
                            <Box className='border'></Box>
                            <Stack className="cardFooter">
                                <Box className="priceWrapper">
                                    <Typography variant="h4" className="price">
                                        $ {property.propertyPricePerNight}
                                    </Typography>
                                    <Typography variant="body2" className="priceLabel">
                                        {t('/night')}
                                    </Typography>
                                </Box>
                                <Link
                                    href={{
                                        pathname: '/stays/detail',
                                        query: { id: property?._id },
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="group flex items-center gap-2 px-7 py-3 cursor-pointer font-medium   text-gray-400  transition active:scale-95 bg-gradient-to-r from-yellow-600 to-[#4e4b4b] py-1 px-3 rounded-full text-white hover:translate-x-0.5 transition"
                                    >
                                        <p className="group-hover:translate-x-0.5 transition-all">
                                            {t('Book Now')}
                                        </p>
                                        <svg
                                            className="group-hover:translate-x-1 transition-all"
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
                                </Link>
                            </Stack>
                        </Stack>
                    </div>
                </Stack>
            </Stack>
        );
    }
}

export default StayBookingCard;
