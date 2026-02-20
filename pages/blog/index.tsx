import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Button } from '@mui/material';
import BlogCard from '@/libs/components/blog/blogCard';

const BlogList: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>BlogList PAGE MOBILE</div>;
	} else {
		return (
			<Stack className='blog-list-box'>
				<Stack className='container'>
					<Stack className='blog-top-section'>
						<Stack className='img-box'>
							<img src="/img/banner/blogheader.jpg" alt="" />
						</Stack>
						<Stack className='catrgory-box'>
							<Button className='category-button' variant="contained">Free Board</Button>
							<Button className='category-button' variant="contained">Recommendation</Button>
							<Button className='category-button' variant="contained">News</Button>
							<Button className='category-button' variant="contained">Humor</Button>
						</Stack>
					</Stack>
					<Stack className='main-section'>
						{[1,2,3,4,5,6,].map(() => (
							<BlogCard/>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(BlogList);
