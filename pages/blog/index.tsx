import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Button, Pagination, TextField } from '@mui/material';
import BlogCard from '@/libs/components/blog/blogCard';
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Chip,
  IconButton,
  CardActions,
} from '@mui/material';
import { Favorite, ChatBubbleOutline, BookmarkBorder } from '@mui/icons-material';

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
							<img src="/img/logo/community.png" alt="" />
						</Stack>
						<Stack className='catrgory-box'>
							<Button className='category-button' variant="contained">Free Board</Button>
							<Button className='category-button' variant="contained">Recommendation</Button>
							<Button className='category-button' variant="contained">News</Button>
							<Button className='category-button' variant="contained">Humor</Button>
						</Stack>
						<Stack className='blog-search'>
							<TextField
								style={{width: "75%"}}
								variant="standard"
								placeholder='search article'
								InputProps={{
									disableUnderline: false,
									startAdornment: <SearchIcon style={{marginRight: "10px"}} />,
								}}
							/>
							<Button 
								variant="contained"
								color='secondary'
								className='write-button'
							>
								<DriveFileRenameOutlineIcon style={{marginRight: "7px"}}/> Write
							</Button>
						</Stack>
					</Stack>
					<Stack className='main-section'>
						{[1,2,3,4,5,].map(() => (
							<BlogCard/>
						))}
					</Stack>
					<Stack style={{width: "100%", alignItems: "center"}}>
						<Pagination count={2}
							style={{marginBottom: "50px"}}
						// page={page} 
						// onChange={handleChange} 
						/>
					</Stack>
					<Stack className='blog-buttom-section'>
						{[1,2,3].map(() => (
							<Stack style={{marginBottom: "40px"}}>
									<Card
										sx={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											transition: 'transform 0.2s, box-shadow 0.2s',
											'&:hover': {
											transform: 'translateY(-4px)',
											boxShadow: 6,
											},
										}}
										>
										<CardMedia component="img" height="200" image="/img/banner/blogheader.jpg"  />
										<CardContent sx={{ flexGrow: 1 }}>
											<Box sx={{ mb: 2 }}>
											<Chip label="Humor" color="primary" size="small" />
											</Box>
											<Typography variant="h6" component="h2" gutterBottom>
											Getting Started
											</Typography>
											<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											</Typography>
											<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
											<Avatar src="/img/banner/seoul.jpg" sx={{ width: 32, height: 32 }} />
											<Box>
												<Typography variant="body2">Simoon</Typography>
												<Typography variant="caption" color="text.secondary">
												Yanuary 20
												</Typography>
											</Box>
											</Box>
										</CardContent>
										<CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
											<Box sx={{ display: 'flex', gap: 1 }}>
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
												<IconButton size="small" color="primary">
												<Favorite fontSize="small" />
												</IconButton>
												<Typography variant="caption">23</Typography>
											</Box>
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
												<IconButton size="small">
												<ChatBubbleOutline fontSize="small" />
												</IconButton>
												<Typography variant="caption">12</Typography>
											</Box>
											</Box>
											<IconButton size="small">
											<BookmarkBorder fontSize="small" />
											</IconButton>
										</CardActions>
									</Card>
							</Stack>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(BlogList);
