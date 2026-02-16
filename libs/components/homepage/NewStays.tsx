import { Box, Button, CardMedia, Container, Pagination, Rating, Stack, Typography } from '@mui/material';
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
import BoltIcon from '@mui/icons-material/Bolt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
interface TopRoom {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  featured: true,
}

export default function NewStays() {
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
    ];

    const topRooms: TopRoom[] = [
        {
        id: 1,
        name: 'Ocean View Suite',
        location: 'Maldives',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        price: 450,
        rating: 4.9,
        featured: true,
        },
        {
        id: 2,
        name: 'Mountain Retreat',
        location: 'Swiss Alps',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        price: 380,
        rating: 4.8,
        featured: true,
        },
        {
        id: 3,
        name: 'Urban Penthouse',
        location: 'New York',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        price: 520,
        rating: 5.0,
        featured: true,
        },
        {
        id: 1,
        name: 'Ocean View Suite',
        location: 'Maldives',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        price: 450,
        rating: 4.9,
        featured: true,
        },
        {
        id: 2,
        name: 'Mountain Retreat',
        location: 'Swiss Alps',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        price: 380,
        rating: 4.8,
        featured: true,
        },
        {
        id: 3,
        name: 'Urban Penthouse',
        location: 'New York',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        price: 520,
        rating: 5.0,
        featured: true,
        },
    ];
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
                    New Stays for You
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
        <Stack className='new-stay'>
            <Stack className='new-stay-box-left'>
                {rooms.map((room, index) => (
                    <Stack className="new-stay-card bg-white rounded-2xl shadow-md max-w-2xl w-full">
                        <div className="flex flex-col md:flex-row h-54">
                            <Stack className="cardImageWrapper">
                                {room.featured && (
                                    <Box className='top-icon'>
                                        <Box><AutoAwesomeIcon/></Box>
                                        <Typography sx={{ml:"15px", mt:"3px"}}>New</Typography>
                                    </Box>
                                )}
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={room.image}
                                    alt={room.name}
                                    className="cardImage"
                                />
                            </Stack>
                            <Stack className="md:w-3/4 p-3 flex flex-col justify-between">
                                <Stack className='obsion-box'>
                                    <Box className='info-box'>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                                            <a href="#">{room.name}</a>
                                        </h2>
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
                                        <div className="text-gray-700 text-sm leading-relaxed line-clamp-2 mt-6">
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
                                        </div>
                                    </Box>
                                    <Box className="rating-box">
                                        <div>
                                            <Badge 
                                                badgeContent={5} 
                                                style={{color: "gray", cursor: "pointer"}}>
                                                    <FavoriteIcon style={{ color: "red" }} />
                                            </Badge>
                                        </div>
                                        <div>
                                            <Badge 
                                                badgeContent={15} 
                                                style={{color: "gray", cursor: "pointer"}}>
                                                    <RemoveRedEyeIcon sx={{ color: true ? "gray" : "white", }}/>
                                            </Badge>
                                        </div>
                                        <div>
                                            {false ? 
                                                <BookmarkAddedIcon sx={{ color: "white", cursor: "pointer"}}/>
                                            : 
                                                <BookmarkAddIcon sx={{ color: "gray", cursor: "pointer"}}/> 
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
                        </div>
                    </Stack>
                ))}
                <Pagination count={2} style={{marginTop: "15px"}}
                    // page={page} 
                    // onChange={handleChange} 
                />
            </Stack>
            <Stack className='new-stay-box-right'>
                <Stack className='new-stay-box-right-top'>
                    {topRooms.map((room, index) => (
                        <Stack className='right-card-box'>
                            <Stack className="cardImageWrapper">
                                {room.featured && (
                                    <Box className='top-icon'>
                                        <Box><BoltIcon/></Box>
                                        <Typography style={{fontSize:"10px", fontWeight: "bold"}}>
                                            Top
                                        </Typography>
                                    </Box>
                                )}
                                <CardMedia
                                    component="img"
                                    image={room.image}
                                    alt={room.name}
                                    className="cardImage"
                                />
                            </Stack>
                            <Stack className='obsion-box'>
                                <Box className='info-box'>
                                    <a href='#' className="text-xm font-bold text-gray-900">
                                        {room.name}
                                    </a>
                                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                                        <LocationOnIcon sx={{ fontSize: 10 }} />
                                        <span className="text-xs">{room.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Rating 
                                            value={room.rating} 
                                            precision={0.1} 
                                            readOnly 
                                            size="small"
                                        />
                                        <span className="text-xs text-gray-600">
                                            ({23} reviews)
                                        </span>
                                    </div>
                                </Box>
                                <Box className="rating-box">
                                    <FavoriteIcon style={{ color: "red", fontSize: "18", cursor: "pointer" }} />
                                </Box>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
                <div className='scroll-down flex text-yellow-600 flex-col items-center animate-bounce'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9A7 7 0 1 0 5 9v6a7 7 0 1 0 14 0zm-7-3v4" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>

                <Stack className='new-stay-box-right-bottom'>
                    <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <h1 className="text-2xl font-semibold text-center mx-auto">Our Community Blog</h1>
                        <div className="flex items-center justify-end mt-6 mb-3 text-sm">
                            <button
                                type="button"
                                className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium text-gray-500  transition active:scale-95"
                            >
                                <a href="#" className="group-hover:translate-x-1 transition-all">
                                    News
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
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {[1,2,3,4].map((ele, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1719368472026-dc26f70a9b76?q=80&w=736&auto=format&fit=crop" alt="image" className="w-50 h-35 object-cover" />
                                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <h1 className="text-xl font-medium">Image Title</h1>
                                    <a href="#" className="flex items-center gap-1 text-sm text-white/70">
                                        Show More
                                        <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.125 1.625H11.375V4.875" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M5.41602 7.58333L11.3743 1.625" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9.75 7.04167V10.2917C9.75 10.579 9.63586 10.8545 9.4327 11.0577C9.22953 11.2609 8.95398 11.375 8.66667 11.375H2.70833C2.42102 11.375 2.14547 11.2609 1.9423 11.0577C1.73914 10.8545 1.625 10.579 1.625 10.2917V4.33333C1.625 4.04602 1.73914 3.77047 1.9423 3.5673C2.14547 3.36414 2.42102 3.25 2.70833 3.25H5.95833" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </Stack>
            </Stack>
        </Stack>
    </>
  );
}
