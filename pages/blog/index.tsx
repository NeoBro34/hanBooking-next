import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Button, TextField, Tab, Typography, Pagination } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { IconButton } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { BoardArticlesInquiry } from '@/libs/types/board-article/board-article.input';
import { BoardArticle } from '@/libs/types/board-article/board-article';
import { T } from '@/libs/types/common';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TARGET_BOARD_ARTICLE } from '@/apollo/user/mutation';
import { GET_BOARD_ARTICLES } from '@/apollo/user/query';
import { BoardArticleCategory } from '@/libs/enums/board-article.enum';
import { Messages } from '@/libs/config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '@/libs/sweetAlert';
import BlogCard from '@/libs/components/common/BlogCard';


export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const BlogList: NextPage = ({ initialInput, ...props }: T) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { query } = router;
	const articleCategory = query?.articleCategory as string;
	const [searchCommunity, setSearchCommunity] = useState<BoardArticlesInquiry>(initialInput);
	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	if (articleCategory) initialInput.search.articleCategory = articleCategory;

	/** APOLLO REQUESTS **/
	const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

	const {
		loading: getBoardArticlesLoading,
		data: getBoardArticlesData,
		error: getBoardArticlesError,
		refetch: getBoardArticlesRefetch,
	} = useQuery(
		GET_BOARD_ARTICLES, 
		{
			fetchPolicy: 'cache-and-network',
			variables: { input: searchCommunity },
			notifyOnNetworkStatusChange: true,
		}
	);

	
	/** LIFECYCLES **/
	useEffect(() => {
		if (getBoardArticlesData) {
			setBoardArticles(getBoardArticlesData?.getBoardArticles?.list);
			setTotalCount(getBoardArticlesData?.getBoardArticles?.metaCounter[0]?.total);
		}
	}, [getBoardArticlesData]);

	useEffect(() => {
		if (!query?.articleCategory)
			router.push(
				{
					pathname: router.pathname,
					query: { articleCategory: 'FREE' },
				},
				router.pathname,
				{ shallow: true },
			);
	}, []);

	/** HANDLERS **/
	const tabChangeHandler = async (e: T, value: string) => {
		console.log(value);

		setSearchCommunity({ ...searchCommunity, page: 1, search: { articleCategory: value as BoardArticleCategory } });
		await router.push(
			{
				pathname: '/blog',
				query: { articleCategory: value },
			},
			router.pathname,
			{ shallow: true },
		);
	};

	const paginationHandler = (e: T, value: number) => {
		setSearchCommunity({ ...searchCommunity, page: value });
	};

	const likeArticleHandler = async (e: any, user: any, id: string) => {
		try {
			e.stopPropagation();
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetBoardArticle({ variables: { input: id } });

			await getBoardArticlesRefetch({ input: searchCommunity });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeMemberHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <div>BlogList PAGE MOBILE</div>;
	} else {
		return (
			<Stack className='blog-list-box'>
				<Stack className='container'>
					<TabContext value={searchCommunity.search.articleCategory}>
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
									<TabList
										className='catrgory-box'
										aria-label="lab API tabs example"
										TabIndicatorProps={{
											style: { display: 'none' },
										}}
										onChange={tabChangeHandler}
									>
										<Tab
											value={'FREE'}
											label={'Free Board'}
											className={`category-button ${searchCommunity.search.articleCategory == 'FREE' ? 'active' : ''}`}
										/>
										<Tab
											value={'RECOMMEND'}
											label={'Recommendation'}
											className={`category-button ${searchCommunity.search.articleCategory == 'RECOMMEND' ? 'active' : ''}`}
										/>
										<Tab
											value={'NEWS'}
											label={'News'}
											className={`category-button ${searchCommunity.search.articleCategory == 'NEWS' ? 'active' : ''}`}
										/>
										<Tab
											value={'HUMOR'}
											label={'Humor'}
											className={`category-button ${searchCommunity.search.articleCategory == 'HUMOR' ? 'active' : ''}`}
										/>
									</TabList>
							</Stack>
							<Box style={{width: "100%", display: "flex", justifyContent: "end"}}>
								<Button 
									variant="contained"
									color='success'
									className='write-button'
									onClick={() =>
										router.push({
											pathname: '/mypage',
											query: {
												category: 'writeArticle',
											},
										})
									}
								>
									<DriveFileRenameOutlineIcon style={{marginRight: "7px"}}/> Write
								</Button>
							</Box>
						</Stack>
						<Stack className='blog-buttom-section'>
							<TabPanel value="FREE">
								<Stack className="list-box">
									{totalCount ? (
										boardArticles?.map((boardArticle: BoardArticle) => {
											return (
												<BlogCard 
													boardArticle={boardArticle} 
													key={boardArticle?._id} 
													likeArticleHandler={likeArticleHandler}
												/>
											);
										})
									) : (
										<Stack className={'no-data'}>
											<img src="/img/icons/icoAlert.svg" alt="" />
											<p>No Article found!</p>
										</Stack>
									)}
								</Stack>
							</TabPanel>
							<TabPanel value="RECOMMEND">
								<Stack className="list-box">
									{totalCount ? (
										boardArticles?.map((boardArticle: BoardArticle) => {
											return (
												<BlogCard 
													boardArticle={boardArticle} 
													key={boardArticle?._id} 
													likeArticleHandler={likeArticleHandler}
												/>
											);
										})
									) : (
										<Stack className={'no-data'}>
											<img src="/img/icons/icoAlert.svg" alt="" />
											<p>No Article found!</p>
										</Stack>
									)}
								</Stack>
							</TabPanel>
							<TabPanel value="NEWS">
								<Stack className="list-box">
									{totalCount ? (
										boardArticles?.map((boardArticle: BoardArticle) => {
											return (
												<BlogCard 
													boardArticle={boardArticle} 
													key={boardArticle?._id} 
													likeArticleHandler={likeArticleHandler}
												/>
											);
										})
									) : (
										<Stack className={'no-data'}>
											<img src="/img/icons/icoAlert.svg" alt="" />
											<p>No Article found!</p>
										</Stack>
									)}
								</Stack>
							</TabPanel>
							<TabPanel value="HUMOR">
								<Stack className="list-box">
									{totalCount ? (
										boardArticles?.map((boardArticle: BoardArticle) => {
											return (
												<BlogCard 
													boardArticle={boardArticle} 
													key={boardArticle?._id} 
													likeArticleHandler={likeArticleHandler}
												/>
											);
										})
									) : (
										<Stack className={'no-data'}>
											<img src="/img/icons/icoAlert.svg" alt="" />
											<p>No Article found!</p>
										</Stack>
									)}
								</Stack>
							</TabPanel>
						</Stack>
					</TabContext>
				</Stack>
			</Stack>
		);
	}
};

BlogList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			articleCategory: 'FREE',
		},
	},
};

export default withLayoutBasic(BlogList);
