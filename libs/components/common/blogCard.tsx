import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const BlogCard = () => {
	const device = useDeviceDetect();
    
    if (device === 'mobile') {
		return <div>COMMUNITY CARD MOBILE</div>;
	} else {
		return (
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
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<IconButton size="small">
								<RemoveRedEyeIcon fontSize="small" />
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
        );
    }
}

export default BlogCard;