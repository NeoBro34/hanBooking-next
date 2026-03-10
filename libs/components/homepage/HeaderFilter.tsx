import React, { useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { useRouter } from 'next/router';
import TopUsers from './TopUsers';
import useDeviceDetect from '@/libs/hooks/useDeviceDetect';

const HeaderFilter = () => {

    const router = useRouter();
    const device = useDeviceDetect();
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

    if (device === 'mobile') {
        return (
            <section className={'hero'} id="home">
                <Stack className={'heroContent'} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                <Stack className="hero-left-box hidden md:flex" />

                <Stack className="hero-right-box w-full md:w-auto">
                    <Typography
                        variant="h3"
                        className={'heroTitle'}
                        sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, color: { xs: '#F09F24', md: undefined } }}
                    >
                        Discover Your Perfect Escape
                    </Typography>

                    <Typography
                        variant="h6"
                        className={'heroSubtitle'}
                        sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: { xs: '#ffffff', md: undefined } }}
                    >
                        Luxury accommodations in the South Korea most breathtaking destinations
                    </Typography>

                    <Box className={'searchWrapper'}>
                        <Box
                            className={'searchBar'}
                            sx={{
                                padding: { xs: 2, md: 4 },
                                backgroundColor: { xs: 'rgba(255,255,255,0.95)', md: undefined },
                                borderRadius: { xs: 3, md: undefined },
                            }}
                        >
                            <Stack className={'searchGrid'} sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
                                {/* LOCATION */}
                                <Box className={'inputWrapper'} sx={{ width: { xs: '100%', sm: '45%' } }}>
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
                                <Box className={'inputWrapper'} sx={{ width: { xs: '100%', sm: '45%' } }}>
                                    <PeopleIcon className={'inputIcon'} />
                                    <TextField
                                        select
                                        fullWidth
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        variant="outlined"
                                        className={'searchInput'}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <MenuItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'Guest' : 'Guests'}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Stack>

                            <Button
                                style={{
                                    background: `linear-gradient(90deg, #D4A017 0%, #462e01 100%)`,
                                }}
                                variant="contained"
                                size="large"
                                fullWidth
                                className={'searchButton'}
                                onClick={handleSearch}
                                startIcon={<SearchIcon />}
                                sx={{ mt: { xs: 2, md: 0 } }}
                            >
                                Search
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </Stack>

            <Box className="hidden sm:block">
                <TopUsers />
            </Box>

            <Box className={'scrollIndicator hidden md:block'}>
                <Box className={'mouse'}>
                    <Box className={'wheel'} />
                </Box>
            </Box>
        </section>
        )
    } else {
    return (
        <section className={'hero'} id="home">

            <Stack className={'heroContent'}>

                <Stack className='hero-left-box'>

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
}

export default HeaderFilter;