import { useState } from 'react';
import { Box, Button, CardMedia, Container, IconButton, Pagination, Rating, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PoolIcon from '@mui/icons-material/Pool';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

interface Room {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  beds: number;
  baths: number;
  sqft: number;
  featured?: boolean;
  pool?: boolean;
}

export function StayBookingCard() {

    const rooms: Room[] = [
        {
        id: 1,
        name: 'Ocean View Suite',
        location: 'Maldives',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        price: 450,
        rating: 4.9,
        beds: 2,
        baths: 2,
        sqft: 650,
        featured: true,
        pool: true,
        },
    ];
    

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(5);
  const [isBookmarkAdd, setBookmarkAdd] = useState(false);
  const [add, setAdd] = useState(5);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmarkAdd = () => {
    if (isBookmarkAdd) {
      setAdd(add - 1);
    } else {
      setAdd(add + 1);
    }
    setBookmarkAdd(!isBookmarkAdd);
  };

  return (
    <Stack className='new-stay-box-left'>
        {rooms.map((room, index) => (
            <Stack className="new-stay-card bg-white rounded-2xl shadow-md max-w-4xl w-full">
                <div className="flex flex-col md:flex-row h-64">
                    <Stack className="cardImageWrapper">
                        {room.featured && (
                            <Box className='top-icon'>
                                <Box><AutoAwesomeIcon/></Box>
                                <Typography sx={{ml:"15px", mt:"3px"}}>New</Typography>
                            </Box>
                        )}
                        <CardMedia
                            component="img"
                            image={room.image}
                            alt={room.name}
                            className="cardImage"
                        />
                    </Stack>
                    <Stack className="md:w-3/4 p-3 flex flex-col justify-between">
                        <Stack className='obsion-box'>
                            <Box className='info-box'>
                                <h2 className="text-3xl font-bold text-gray-900 mb-3 mt-2">
                                    <a href="/stays/detail">{room.name}</a>
                                </h2>
                                <div className="flex items-center gap-1 text-gray-600 mb-3">
                                    <LocationOnIcon sx={{ fontSize: 20 }} />
                                    <span className="text-sm">{room.location}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-8">
                                    <Rating 
                                        value={room.rating} 
                                        precision={0.1} 
                                        readOnly 
                                        size="small"
                                    />
                                    <span className="text-sm text-gray-600">
                                        ({23} reviews)
                                    </span>
                                </div>
                                <div className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                                    <Stack className="amenities">
                                        <Box className="amenity">
                                            <MeetingRoomIcon />
                                            <span>{room.baths} Room</span>
                                        </Box>
                                        <Box className="amenity">
                                            <BedIcon />
                                            <span>{room.beds} Beds</span>
                                        </Box>
                                        {room.pool && (
                                            <Box className="amenity">
                                            <PoolIcon />
                                            <span>{room.pool} Pool</span>
                                        </Box>
                                        )}
                                        <Box className="amenity">
                                            <SelfImprovementIcon />
                                            <span>Spa</span>
                                        </Box>
                                        <Box className="amenity">
                                            <LocalParkingIcon  />
                                            <span>Parking</span>
                                        </Box>
                                    </Stack>
                                </div>
                            </Box>
                            <Box className="rating-box">
                                <IconButton 
                                    onClick={handleLikeClick}
                                    style={{marginLeft: "-8px"}}
                                >
                                    <Badge 
                                        badgeContent={5} 
                                        style={{color: "gray", cursor: "pointer"}}>
                                            {isLiked ? (
                                                <FavoriteIcon sx={{ fontSize: 35, color: '#ef4444' }} />
                                            ) : (
                                                <FavoriteIcon sx={{ fontSize: 35, color: 'gray' }} />
                                            )}
                                    </Badge>
                                </IconButton>
                                <div>
                                    <Badge 
                                        badgeContent={15} 
                                        style={{color: "gray", cursor: "pointer",}}>
                                            <RemoveRedEyeIcon sx={{ color: true ? "gray" : "white",fontSize:"35px" }}/>
                                    </Badge>
                                </div>
                                <div
                                    onClick={handleBookmarkAdd}
                                >
                                    {isBookmarkAdd ? 
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
                                    $ {room.price}
                                </Typography>
                                <Typography variant="body2" className="priceLabel">
                                    /night
                                </Typography>
                            </Box>
                            <button
                                type="button"
                                className="group flex items-center gap-2 px-7 py-3 cursor-pointer font-medium   text-gray-400  transition active:scale-95 bg-gradient-to-r from-yellow-600 to-[#4e4b4b] py-1 px-3 rounded-full text-white hover:translate-x-0.5 transition"
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
                </div>
            </Stack>
        ))}
    </Stack>
  );
}
