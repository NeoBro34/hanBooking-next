import React, { useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { useRouter } from 'next/router';
import TopUsers from './TopUsers';

const HeaderFilter = () => {

    const router = useRouter();

    const [destination, setDestination] = useState<string>('');
    const [guests, setGuests] = useState<string>('2');

    // GraphQL ENUM bilan mos keladigan values
    const destinations = [
        { label: 'Seoul', value: 'SEOUL' },
        { label: 'Busan', value: 'BUSAN' },
        { label: 'Incheon', value: 'INCHEON' },
        { label: 'Daegu', value: 'DAEGU' },
        { label: 'Daejeon', value: 'DAEJEON' },
        { label: 'Gwangju', value: 'GWANGJU' },
        { label: 'Ulsan', value: 'ULSAN' },
        { label: 'Sejong', value: 'SEJONG' },
        { label: 'Jeju', value: 'JEJU' }
    ];

    const handleSearch = async () => {

        try {

            const input = {
                page: 1,
                limit: 6,
                search: {
                    locationList: destination ? [destination] : []
                }
            };

            await router.push(`/stays?input=${JSON.stringify(input)}`);

        } catch (err) {
            console.log('Search error:', err);
        }

    };

    return (
        <section className={'hero'} id="home">

            <Stack className={'heroContent'}>

                <Stack className='hero-left-box'>
                    Header left
                </Stack>

                <Stack className='hero-right-box'>

                    <Typography variant="h3" className={'heroTitle'}>
                        Discover Your Perfect Escape
                    </Typography>

                    <Typography variant="h6" className={'heroSubtitle'}>
                        Luxury accommodations in the South Korea most breathtaking destinations
                    </Typography>

                    <Box className={'searchWrapper'}>

                        <Box className={'searchBar'}>

                            <Stack className={'searchGrid'}>

                                {/* LOCATION */}
                                <Box className={'inputWrapper'}>

                                    <LocationOnIcon className={'inputIcon'} />

                                    <TextField
                                        select
                                        fullWidth
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        variant="outlined"
                                        className={'searchInput'}
                                        SelectProps={{ displayEmpty: true }}
                                    >

                                        <MenuItem value="" disabled>
                                            Where to?
                                        </MenuItem>

                                        {destinations.map((dest) => (
                                            <MenuItem key={dest.value} value={dest.value}>
                                                {dest.label}
                                            </MenuItem>
                                        ))}

                                    </TextField>

                                </Box>

                                {/* GUESTS UI (backendga yuborilmayapti) */}
                                <Box className={'inputWrapper'}>

                                    <PeopleIcon className={'inputIcon'} />

                                    <TextField
                                        select
                                        fullWidth
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        variant="outlined"
                                        className={'searchInput'}
                                    >

                                        {[1,2,3,4,5,6].map((num) => (
                                            <MenuItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'Guest' : 'Guests'}
                                            </MenuItem>
                                        ))}

                                    </TextField>

                                </Box>

                            </Stack>

                            {/* SEARCH BUTTON */}

                            <Button
                                style={{
                                    background: `linear-gradient(90deg, #D4A017 0%, #462e01 100%)`
                                }}
                                variant="contained"
                                size="large"
                                fullWidth
                                className={'searchButton'}
                                onClick={handleSearch}
                                startIcon={<SearchIcon />}
                            >
                                Search
                            </Button>

                        </Box>

                    </Box>

                </Stack>

            </Stack>

            <TopUsers />

            <Box className={'scrollIndicator'}>
                <Box className={'mouse'}>
                    <Box className={'wheel'} />
                </Box>
            </Box>

        </section>
    );
};

export default HeaderFilter;