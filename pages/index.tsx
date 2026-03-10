import { NextPage } from 'next';
import { Container, Stack } from '@mui/material';
import withLayoutMain from '@/libs/components/layout/LayoutHome';
import PopularDestination from '@/libs/components/homepage/PopularDestination';
import Features from '@/libs/components/homepage/Feature';
import FeaturedStays from '@/libs/components/homepage/FeaturedStays';
import TopAgents from '@/libs/components/homepage/TopAgents';
import About from '@/libs/components/homepage/About';
import NewStays from '@/libs/components/homepage/NewStays';
import CommunityBoard from '@/libs/components/homepage/CommunityBoard';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Events from '@/libs/components/homepage/Events';

const Home: NextPage = () => {
  return (
    <Container>
      <Stack className={'home-page'}>
        <PopularDestination />
        <Features />
        <FeaturedStays />
        <About />
        <TopAgents />
        <NewStays />
        <CommunityBoard />
        <Events/>
      </Stack>
    </Container>
  );
};

/** LANGUAGE LOAD */
export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default withLayoutMain(Home);