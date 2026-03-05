import React from 'react';
import { Box, Typography, CardMedia, Stack, Rating } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import PoolIcon from '@mui/icons-material/Pool';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BoltIcon from '@mui/icons-material/Bolt';
import { Property } from '@/libs/types/property/property';
import useDeviceDetect from '@/libs/hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '@/apollo/store';
import { REACT_APP_API_URL, topPropertyRank } from '@/libs/config';
import { PropertyAmenity } from '../../enums/property.enum';

interface FeaturedPropertyCardProps {
    property: Property;
	likePropertyHandler?: any;
}

const FeaturedPropertyCard = (props: FeaturedPropertyCardProps) => {
    const { property, likePropertyHandler } = props;
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);

    /** HANDLERS **/
	const pushDetailHandler = async ( propertyId:string ) => {
		console.log("propertyId:", propertyId);
		await router.push({ pathname: '/stays/detail', query: {id: propertyId}});
	};

    if (device === 'mobile') {
		return (
            <div>Mobile</div>
        );
    } else { 
        return (
            <>
                <Stack className={`roomCard fade-in-up`} style={{ animationDelay: `5s` }}>
                    <Stack className="cardImageWrapper">
                        {property && property?.propertyRank >= topPropertyRank && (
                            <Box className='top-icon'>
                                <Box><BoltIcon/></Box>
                                <Typography style={{fontSize: "20", fontWeight: "bold"}}>Top</Typography>
                            </Box>
                        )}
                        <CardMedia
                            component="img"
                            height="280"
                            image={`${REACT_APP_API_URL}/${property?.propertyImages[0]}`}
                            alt={'Ocean View Suite'}
                            className="cardImage"
                            onClick={() => { pushDetailHandler(property._id) }}
                        />
                        <Box className="rating">
                            <Badge 
                                badgeContent={property.propertyLikes} 
                                sx={{ "& .MuiBadge-badge": { fontWeight: 900,color: "#bfbcbc"} }}
                                onClick={(e) => {
									e.stopPropagation();
									likePropertyHandler(user, property?._id);
								}}
                            >
                                {property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteBorderIcon style={{ color: 'gray' }} />
								)}
                            </Badge>
                            <Badge badgeContent={property.propertyViews} sx={{ "& .MuiBadge-badge": { fontWeight: 900,color: "#bfbcbc"} }}>
                                <RemoveRedEyeIcon sx={{ color: true ? "gray" : "white", }}/>
                            </Badge>
                            {false ? <BookmarkAddedIcon sx={{ color: "white", cursor: "pointer"}}/> : <BookmarkAddIcon sx={{ color: "gray", cursor: "pointer"}}/> }
                        </Box>
                    </Stack>

                    <Stack className="cardContent">
                        <Typography variant="h2" className="roomName"
                            onClick={() => { pushDetailHandler(property._id)}}
                            >
                            {property.propertyTitle}
                        </Typography>
                        <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <LocationOnIcon sx={{ fontSize: 20 }} />
                            <span className="text-sm">
                                {property.propertyLocation}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Rating
                                value={4.9} 
                                precision={0.1} 
                                readOnly 
                                size="small"
                            />
                            <span className="text-sm text-gray-600">
                                ({property.propertyComments} reviews)
                            </span>
                        </div>

                        <Stack className="amenities">
                            <Box className="amenity">
                                <BedIcon className="amenityIcon" />
                                <span>{property.propertyRooms} Rooms</span>
                            </Box>
                            <Box className="amenity">
                                <BathtubIcon className="amenityIcon" />
                                <span>{property.propertyBeds} Baths</span>
                            </Box>
                            {property.amenities.includes(PropertyAmenity.POOL) && (
                                <Box className="amenity">
                                <PoolIcon className="amenityIcon" />
                                <span> Pool</span>
                            </Box>
                            )}
                            <Box className="amenity">
                                <SquareFootIcon className="amenityIcon" />
                                <span>70 m2</span>
                            </Box>
                        </Stack>
                        <Box className='border'></Box>

                        <Stack className="cardFooter">
                            <Box className="priceWrapper">
                                <Typography variant="h4" className="price">
                                    $ {property.propertyPricePerNight}
                                </Typography>
                                <Typography variant="body2" className="priceLabel">
                                    /night
                                </Typography>
                            </Box>
                            <button
                                onClick={() => { pushDetailHandler(property._id)}}
                                type="button"
                                className="group flex items-center gap-2 px-5 py-2 cursor-pointer font-medium   text-gray-400  transition active:scale-95 bg-gradient-to-r from-yellow-600 to-[#4e4b4b] py-1 px-3 rounded-full text-white hover:translate-x-0.5 transition"
                            >
                                <p className="group-hover:translate-x-0.5 transition-all">
                                    Book Now
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
                        </Stack>
                    </Stack>
                </Stack>
            </>
        );
    }
};

export default FeaturedPropertyCard;