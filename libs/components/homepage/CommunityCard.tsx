import React from 'react';
import Link from 'next/link';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import { useTranslation } from 'next-i18next';
import useDeviceDetect from '@/libs/hooks/useDeviceDetect';

interface CommunityCardProps {
	vertical: boolean;
	article: BoardArticle;
	index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { vertical, article, index } = props;
	const { t } = useTranslation('common');
	const device = useDeviceDetect();
	const articleImage = article?.articleImage
		? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/blog/blogImg.jpg';

	if (device === 'mobile') {
		return (
			<Link
				href={`/blog/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}
				className="relative group flex-shrink-0 sm:flex-grow transition-all w-72 sm:w-56 h-72 sm:h-[400px] duration-500 sm:hover:w-full rounded-2xl overflow-hidden"
			>
				<img className="h-full w-full object-cover object-center" src={articleImage} alt="image" />
				<div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white bg-black/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
					<h1 className="text-xl sm:text-3xl line-clamp-2">{article.articleTitle}</h1>
					<p className="text-xs sm:text-sm line-clamp-3">{article.articleContent}</p>
					<span className="text-xs sm:text-sm mt-2">
						<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
					</span>
				</div>
				<div className="absolute inset-0 flex flex-col justify-start p-6 sm:p-10 text-white bg-black/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
					<h1 className="absolute px-3 py-1 text-sm sm:text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
						{article.articleCategory}
					</h1>
				</div>
			</Link>
		)
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
		)
	}
};

export default CommunityCard;
