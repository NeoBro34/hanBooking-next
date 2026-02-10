import { NextPage } from 'next';
import { Box, Container, Stack } from '@mui/material';
import withLayoutMain from '@/libs/components/layout/LayoutHome';
import PopularDestination from '@/libs/components/homepage/PopularDestination';
import Features from '@/libs/components/homepage/Feature';
import FeaturedRooms from '@/libs/components/homepage/FeaturedRooms';
import TopAgents from '@/libs/components/homepage/TopAgents';

const Home: NextPage = () => {
  return (
      <Container>
        <Stack className={'home-page'}>
          <PopularDestination />
          <Features />
          <FeaturedRooms />
          <TopAgents />
          <Box>Top Proporties</Box>
          <Box>Events</Box>
        </Stack>
      </Container>
  );
};

export default withLayoutMain(Home);