import React, { useState } from 'react';
import { Box, Typography, Container, Button, TextField, Grid, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '/scss/pc/homepage/Hero.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
// import styles from '/scss/pc/homepage/SearchBar.module.scss';

const HeaderFilter = () => {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('2');

    const destinations = [
        'Seoul',
        'Busan',
        'Incheon',
        'Daegu',
        'Daejeon',
        'Gwangju',
        'Ulsan',
        'Sejong',
        'Gyeonggi-do',
        'Gangwon-do',
        'Chungcheongbuk-do',
        'Chungcheongnam-do',
        'Jeollabuk-do',
        'Jeollanam-do',
        'Gyeongsangbuk-do',
        'Gyeongsangnam-do',
        'Jeju'
    ];

    const handleSearch = () => {
        console.log({ destination, checkIn, checkOut, guests });
        // Add search logic here
    };


    return (
        <section className={styles.hero} id="home">
            <Container className={styles.heroContainer}>
                <Box className={styles.heroContent}>
                    <Typography variant="h1" className={`${styles.heroTitle} fade-in-up`}>
                        Discover Your Perfect Escape
                    </Typography>
                    <Typography variant="h5" className={`${styles.heroSubtitle} fade-in-up`} style={{ animationDelay: '0.2s' }}>
                        Luxury accommodations in the South Korea most breathtaking destinations
                    </Typography>
                    
                    <Box className={`${styles.searchWrapper} fade-in-up`} style={{ animationDelay: '0.4s' }}>
                        <Box className={styles.searchBar}>
                            <Grid container spacing={2} className={styles.searchGrid}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box className={styles.inputWrapper}>
                                        <LocationOnIcon className={styles.inputIcon} />
                                        <TextField
                                        select
                                        fullWidth
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        placeholder="Where to?"
                                        variant="outlined"
                                        className={styles.searchInput}
                                        SelectProps={{
                                            displayEmpty: true,
                                        }}
                                        >
                                        <MenuItem  value="" disabled>
                                            <div style={{fontWeight: "600"}}>Where to?</div>
                                        </MenuItem>
                                            {destinations.map((dest) => (
                                                <MenuItem
                                                key={dest} value={dest}>
                                                    {dest}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Box className={styles.inputWrapper}>
                                        <CalendarMonthIcon className={styles.inputIcon} />
                                        <TextField
                                        type="date"
                                        fullWidth
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        variant="outlined"
                                        className={styles.searchInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            placeholder: 'Check-in',
                                        }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Box className={styles.inputWrapper}>
                                        <CalendarMonthIcon className={styles.inputIcon} />
                                        <TextField
                                        type="date"
                                        fullWidth
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        variant="outlined"
                                        className={styles.searchInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            placeholder: 'Check-out',
                                        }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Box className={styles.inputWrapper}>
                                        <PeopleIcon className={styles.inputIcon} />
                                        <TextField
                                        select
                                        fullWidth
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        variant="outlined"
                                        className={styles.searchInput}
                                        >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <MenuItem key={num} value={num.toString()}>
                                            <div style={{fontWeight: "600"}}>{num} {num === 1 ? 'Guest' : 'Guests'}</div>
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Button
                                style={{background: '#c67d10',}}
                                variant="contained"
                                size="large"
                                fullWidth
                                className={styles.searchButton}
                                onClick={handleSearch}
                                startIcon={<SearchIcon />}
                            >
                                Search Hotels
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
            
            <Box className={styles.scrollIndicator}>
                <Box className={styles.mouse}>
                <Box className={styles.wheel} />
                </Box>
            </Box>
        </section>
    );
};

export default HeaderFilter;