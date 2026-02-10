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
import styles from './FeaturedRooms.module.scss';
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
}

const FeaturedRooms: NextPage = () => {
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
        },
    ];

    return (
        <Container>
            <Stack className="featuredRooms" id="rooms">
                <Box className="sectionHeader">
                    <Typography variant="h2" className={`sectionTitle decorative-line`}>
                        Featured Rooms
                    </Typography>
                    <Typography variant="body1" className="sectionSubtitle">
                        Handpicked luxury accommodations for unforgettable experiences
                    </Typography>
                </Box>

                <Stack className="roomCard-box" >
                    {rooms.map((room, index) => (
                        <Stack key={room.id} className={`roomCard fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                            <Stack className="cardImageWrapper">
                                {room.featured && (
                                    <Chip
                                        label="Featured"
                                        className="featuredBadge"
                                        size="small"
                                    />
                                )}
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={room.image}
                                    alt={room.name}
                                    className="cardImage"
                                />
                                <Box className="rating">
                                    <Badge badgeContent={5} style={{color: "#bfbcbc"}}>
                                        <RemoveRedEyeIcon sx={{ color: true ? "gray" : "white", }}/>
                                    </Badge>
                                    <Badge badgeContent={5} style={{color: "#bfbcbc"}}>
                                        <FavoriteIcon style={{ color: "red" }} />
                                    </Badge>
                                </Box>
                            </Stack>

                            <Stack className="cardContent">
                                <Typography variant="h2" className="roomName">
                                    {room.name}
                                </Typography>
                                <Typography variant="body2" className="location">
                                    <LocationOnIcon/>{room.location}
                                </Typography>

                                <Stack className="amenities">
                                    <Box className="amenity">
                                        <BedIcon className="amenityIcon" />
                                        <span>{room.beds} Beds</span>
                                    </Box>
                                    <Box className="amenity">
                                        <BathtubIcon className="amenityIcon" />
                                        <span>{room.baths} Baths</span>
                                    </Box>
                                    <Box className="amenity">
                                        <SquareFootIcon className="amenityIcon" />
                                        <span>{room.sqft} sqft</span>
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
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="bookButton"
                                        endIcon={<ArrowForwardIcon />}
                                    >
                                        Book
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
                <Pagination count={4} style={{marginTop: "15px"}}
                    // page={page} 
                    // onChange={handleChange} 
                />
            </Stack>
        </Container>
    );
};

export default FeaturedRooms;
