import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './SearchBar';
import styles from '/scss/pc/homepage/Hero.module.scss';


const HeaderFilter = () => {
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
                        <SearchBar />
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