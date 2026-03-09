import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import { useTranslation } from 'next-i18next';

interface CommunityCardProps {
	vertical: boolean;
	article: BoardArticle;
	index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { vertical, article, index } = props;
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
	const articleImage = article?.articleImage
		? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/blog/blogImg.jpg';

	if (device === 'mobile') {
		return <div>{t('COMMUNITY CARD (MOBILE)')}</div>;
	} else {
		return (
			<Link href={`/blog/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`} className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full">
				<img className="h-full w-full object-cover object-center rounded-2xl"
					src={articleImage}
					alt="image" />
				<div
					className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
					<h1 className="text-3xl">{article.articleTitle}</h1>
					<p className="text-sm">{article.articleContent}</p>
					<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
				</div>
				<div
					className="absolute inset-0 flex flex-col justify-start p-10 text-white bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
					<h1 className='text-3xl absolute px-3 py-1 text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full'>{article.articleCategory}</h1>
				</div>
			</Link>
		);
	}
};

export default CommunityCard;
