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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BoardArticle } from '@/libs/types/board-article/board-article';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '@/apollo/store';
import { REACT_APP_API_URL } from '@/libs/config';
import { useTranslation } from 'next-i18next';

interface BlogCardProps {
	boardArticle: BoardArticle;
	size?: string;
	likeArticleHandler: any;
}

const BlogCard = (props: BlogCardProps) => {
	const { boardArticle, size = 'normal', likeArticleHandler } = props;
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const imagePath: string = boardArticle?.articleImage
		? `${REACT_APP_API_URL}/${boardArticle?.articleImage}`
		: '/img/blog/blogImg.jpg';

	/** HANDLERS **/
	const chooseArticleHandler = (e: React.SyntheticEvent, boardArticle: BoardArticle) => {
		router.push(
			{
				pathname: '/blog/detail',
				query: { articleCategory: boardArticle?.articleCategory, id: boardArticle?._id },
			},
			undefined,
			{ shallow: true },
		);
	};

	const goMemberPage = (id: string) => {
		if (id === user?._id) router.push('/mypage');
		else router.push(`/member?memberId=${id}`);
	};
    
    if (device === 'mobile') {
		return <div>{t('COMMUNITY CARD MOBILE')}</div>;
	} else {
		return (
            <Stack 
				style={{marginBottom: "40px"}}
				onClick={(e: any) => chooseArticleHandler(e, boardArticle)}
			>
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
					<CardMedia component="img" height="200" image={imagePath}  />
					<CardContent sx={{ flexGrow: 1 }}>
						<Box sx={{ mb: 2 }}>
						<Chip label={boardArticle?.articleCategory} color="primary" size="small" />
						</Box>
						<Typography variant="h6" component="h2" gutterBottom>
						{boardArticle?.articleTitle}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						{boardArticle?.articleContent}
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
						<Avatar src="/img/banner/seoul.jpg" sx={{ width: 32, height: 32 }} />
						<Box>
							<Typography variant="body2">{boardArticle?.memberData?.memberNick}</Typography>
							<Typography variant="caption" color="text.secondary">
							{new Date(boardArticle.createdAt).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
							</Typography>
						</Box>
						</Box>
					</CardContent>
					<CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<IconButton size="small" color="primary" onClick={(e: any) => likeArticleHandler(e, user, boardArticle?._id)}>
									{boardArticle?.meLiked && boardArticle?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon sx={{color: '#ef4444'}} />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography variant="caption">{boardArticle?.articleLikes}</Typography>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<IconButton size="small">
								<ChatBubbleOutline fontSize="small" />
								</IconButton>
								<Typography variant="caption">{boardArticle?.articleComments}</Typography>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<IconButton size="small">
								<RemoveRedEyeIcon fontSize="small" />
								</IconButton>
								<Typography variant="caption">{boardArticle?.articleViews}</Typography>
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
