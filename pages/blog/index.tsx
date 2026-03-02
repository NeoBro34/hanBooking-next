import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Button, TextField } from '@mui/material';
import BlogCard from '@/libs/components/common/blogCard';
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { IconButton } from '@mui/material';

const BlogList: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>BlogList PAGE MOBILE</div>;
	} else {
		return (
			<Stack className='blog-list-box'>
				<Stack className='container'>
					<Stack className='blog-top-section'>
						<Stack className='search-box'>
							<Stack className='blog-search'>
								<Box className='search-input'>
									<TextField
										style={{width: "100%"}}
										variant="standard"
										placeholder='search article'
										InputProps={{
											disableUnderline: true,
										}}
									/>
									<IconButton className='search-chip' >
										<SearchIcon color='secondary' />
									</IconButton>
								</Box>
								
							</Stack>
							<Stack className='catrgory-box'>
								<Button className='category-button' variant="contained">Free Board</Button>
								<Button className='category-button' variant="contained">Recommendation</Button>
								<Button className='category-button' variant="contained">News</Button>
								<Button className='category-button' variant="contained">Humor</Button>
							</Stack>
						</Stack>
						<Box style={{width: "100%", display: "flex", justifyContent: "end"}}>
							<Button 
								variant="contained"
								color='secondary'
								className='write-button'
							>
								<DriveFileRenameOutlineIcon style={{marginRight: "7px"}}/> Write
							</Button>
						</Box>
					</Stack>
					<Stack className='blog-buttom-section'>
						{[1,2,3].map(() => (
							<BlogCard/>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(BlogList);
