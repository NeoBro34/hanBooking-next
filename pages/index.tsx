import { NextPage } from 'next';
import { Box, Container, Stack } from '@mui/material';
import withLayoutMain from '@/libs/components/layout/LayoutHome';
import PopularDestination from '@/libs/components/homepage/PopularDestination';
import Features from '@/libs/components/homepage/Feature';
import FeaturedStays from '@/libs/components/homepage/FeaturedStays';
import TopAgents from '@/libs/components/homepage/TopAgents';
import About from '@/libs/components/homepage/About';
import NewStays from '@/libs/components/homepage/NewStays';

const Home: NextPage = () => {
  return (
      <Container>
        <Stack className={'home-page'}>
          <PopularDestination />
          <Features />
          <FeaturedStays />
          <About/>
          <TopAgents />
          <NewStays/>
        </Stack>
      </Container>
  );
};

export default withLayoutMain(Home);