import React from 'react';
import { CardMedia, Stack, Typography } from '@mui/material';
import Moment from 'react-moment';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";

const BlogCard = () => {
	const device = useDeviceDetect();
    
    if (device === 'mobile') {
		return <div>COMMUNITY CARD MOBILE</div>;
	} else {
		return (
            <Stack
				sx={{ width:'317px' }}
				className="community-general-card-config"
				// onClick={(e: any) => chooseArticleHandler(e, boardArticle)}
			>
				<Stack className="image-box">
					<CardMedia
                        component="img"
                        image='/img/banner/seoul.jpg'
                        className="cardImage"
                    />
				</Stack>
				<Stack className="desc-box" sx={{ marginTop: '-20px' }}>
					<Stack>
						<Typography
							className="desc"
							// onClick={(e: any) => {
							// 	e.stopPropagation();
							// 	goMemberPage(boardArticle?.memberData?._id as string);
							// }}
						>
							{/* {boardArticle?.memberData?.memberNick} */}
                            Simoon
						</Typography>
						<Typography className="title">
                            {/* {boardArticle?.articleTitle} */}
                            Good
                        </Typography>
					</Stack>
					<Stack className={'buttons'}>
                        <IconButton color={'default'}>
							<CommentIcon />
						</IconButton>
						<Typography className="view-cnt">
                            {/* {boardArticle?.articleViews} */}
                            10
                        </Typography>
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">
                            {/* {boardArticle?.articleViews} */}
                            20
                        </Typography>
						<IconButton color={'default'}>
							{true ? (
                                <FavoriteIcon sx={{ color: '#ef4444' }} />
                            ) : (
                                <FavoriteIcon sx={{ color: 'gray' }} />
                            )}
						</IconButton>
						<Typography className="view-cnt">
                            {/* {boardArticle?.articleLikes} */}
                            33
                        </Typography>
					</Stack>
				</Stack>
				<Stack className="date-box">
					<Moment className="month" format={'MMMM'}>
						{/* {boardArticle?.createdAt} */}
					</Moment>
					<Typography className="day">
						<Moment format={'DD'}>
                            {/* {boardArticle?.createdAt} */}
                        </Moment>
					</Typography>
				</Stack>
			</Stack>
        );
    }
}

export default BlogCard;