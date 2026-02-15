import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Stack,
  Pagination,
  Rating,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import PoolIcon from '@mui/icons-material/Pool';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BoltIcon from '@mui/icons-material/Bolt';
import { NextPage } from 'next';

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

const FeaturedStays: NextPage = () => {
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
        {
        id: 2,
        name: 'Mountain Retreat',
        location: 'Swiss Alps',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        price: 380,
        rating: 4.8,
        beds: 1,
        baths: 1,
        sqft: 500,
        },
        {
        id: 3,
        name: 'Urban Penthouse',
        location: 'New York',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        price: 520,
        rating: 5.0,
        beds: 2,
        baths: 2,
        sqft: 800,
        featured: true,
        pool: true,
        },
        {
        id: 4,
        name: 'Beach Villa',
        location: 'Bali',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        price: 395,
        rating: 4.7,
        beds: 2,
        baths: 2,
        sqft: 720,
        },
        {
        id: 5,
        name: 'Desert Oasis',
        location: 'Dubai',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
        price: 480,
        rating: 4.9,
        beds: 3,
        baths: 2,
        sqft: 900,
        },
        {
        id: 6,
        name: 'Historic Château',
        location: 'Paris',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
        price: 550,
        rating: 5.0,
        beds: 2,
        baths: 2,
        sqft: 750,
        featured: true,
        pool: true,
        },
    ];

    return (
        <Container>
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
                            <a href="#" className="group-hover:translate-x-1 transition-all">
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
                    {rooms.map((room, index) => (
                        <Stack key={room.id} className={`roomCard fade-in-up`} style={{ animationDelay: `${index}s` }}>
                            <Stack className="cardImageWrapper">
                                {room.featured && (
                                    <Box className='top-icon'>
                                        <Box><BoltIcon/></Box>
                                        <Typography style={{fontSize: "20", fontWeight: "bold"}}>Top</Typography>
                                    </Box>
                                )}
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={room.image}
                                    alt={room.name}
                                    className="cardImage"
                                />
                                <Box className="rating">
                                    {/* <Badge badgeContent={5} style={{color: "#bfbcbc"}}>
                                        <FavoriteIcon style={{ color: "red" }} />
                                    </Badge>
                                    <Badge badgeContent={5} style={{color: "#bfbcbc"}}>
                                        <RemoveRedEyeIcon sx={{ color: true ? "gray" : "white", }}/>
                                    </Badge> */}
                                    {false ? <BookmarkAddedIcon sx={{ color: "white", cursor: "pointer"}}/> : <BookmarkAddIcon sx={{ color: "gray", cursor: "pointer"}}/> }
                                </Box>
                            </Stack>

                            <Stack className="cardContent">
                                <Typography variant="h2" className="roomName">
                                    {room.name}
                                </Typography>
                                <div className="flex items-center gap-1 text-gray-600 mb-1">
                                    <LocationOnIcon sx={{ fontSize: 20 }} />
                                    <span className="text-sm">{room.location}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
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

                                <Stack className="amenities">
                                    <Box className="amenity">
                                        <BedIcon className="amenityIcon" />
                                        <span>{room.beds} Beds</span>
                                    </Box>
                                    <Box className="amenity">
                                        <BathtubIcon className="amenityIcon" />
                                        <span>{room.baths} Baths</span>
                                    </Box>
                                    {room.pool && (
                                        <Box className="amenity">
                                        <PoolIcon className="amenityIcon" />
                                        <span>{room.pool} Pool</span>
                                    </Box>
                                    )}
                                    <Box className="amenity">
                                        <SquareFootIcon className="amenityIcon" />
                                        <span>{room.sqft} m2</span>
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
                    ))}
                </Stack>
                <Pagination count={4} style={{marginTop: "35px"}}
                    // page={page} 
                    // onChange={handleChange} 
                />
            </Stack>
        </Container>
    );
};

export default FeaturedStays;
