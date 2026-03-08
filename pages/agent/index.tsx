import React, { useState,  MouseEvent, useEffect, ChangeEvent } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Pagination, TextField, Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchIcon from '@mui/icons-material/Search';
import AgentCard from '@/libs/components/agent/AgentCard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Member } from '@/libs/types/member/member';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TARGET_MEMBER } from '@/apollo/user/mutation';
import { GET_AGENTS } from '@/apollo/user/query';
import { T } from '@/libs/types/common';
import { Messages } from '@/libs/config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '@/libs/sweetAlert';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const AgentList: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [filterSortName, setFilterSortName] = useState('Recent');
	const [sortingOpen, setSortingOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [searchFilter, setSearchFilter] = useState<any>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);
	const [agents, setAgents] = useState<Member[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);

	/** APOLLO REQUESTS **/
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const {
		loading: getAgentsLoading,
		data: getAgentsData,
		error: getAgentsError,
		refetch: getAgentsRefetch,
	} = useQuery(
		GET_AGENTS, 
		{
			fetchPolicy: 'network-only',
			variables: { input: searchFilter },
			notifyOnNetworkStatusChange: true,
		}
	);

	/** LIFECYCLES **/
	useEffect(() => {
		if (getAgentsData) {
			setAgents(getAgentsData?.getAgents?.list);
			setTotal(getAgentsData?.getAgents?.metaCounter[0]?.total);
		}
	}, [getAgentsData]);

	useEffect(() => {
		if (router.query.input) {
			const input_obj = JSON.parse(router?.query?.input as string);
			setSearchFilter(input_obj);
		} else
			router.replace(`/agent?input=${JSON.stringify(searchFilter)}`, `/agent?input=${JSON.stringify(searchFilter)}`);

		setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
	}, [router]);

	/** HANDLERS **/
	const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
		setSortingOpen(true);
	};

	const sortingCloseHandler = () => {
		setSortingOpen(false);
		setAnchorEl(null);
	};

	const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		switch (e.currentTarget.id) {
			case 'recent':
				setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: 'DESC' });
				setFilterSortName('Recent');
				break;
			case 'old':
				setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: 'ASC' });
				setFilterSortName('Oldest order');
				break;
			case 'likes':
				setSearchFilter({ ...searchFilter, sort: 'memberLikes', direction: 'DESC' });
				setFilterSortName('Likes');
				break;
			case 'views':
				setSearchFilter({ ...searchFilter, sort: 'memberViews', direction: 'DESC' });
				setFilterSortName('Views');
				break;
		}
		setSortingOpen(false);
		setAnchorEl2(null);
	};

	const paginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		await router.push(`/agent?input=${JSON.stringify(searchFilter)}`, `/agent?input=${JSON.stringify(searchFilter)}`, {
			scroll: false,
		});
		setCurrentPage(value);
	};

	const likeMemberHandler = async (user: any, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetMember({
				variables: {
					input: id,
				},
			});

			await getAgentsRefetch({ input: searchFilter });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeMemberHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <div>AgentList PAGE MOBILE</div>;
	} else {
		return (
			<Stack className='agent-list-box'>
				<Stack className='container'>
					<Stack className='top-search-box'>
						<TextField
							style={{width: "70%", marginLeft:"15px"}}
							variant="standard"
							placeholder='search agent'
							InputProps={{
								disableUnderline: true,
								startAdornment: <SearchIcon style={{marginRight: "10px"}} />,
							}}
							/>
							<Box component={'div'} className={'right'}>
								<span>Sort by</span>
								<div>
									<Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
										{filterSortName}
									</Button>
									<Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} sx={{ paddingTop: '5px' }}>
										<MenuItem 
											onClick={sortingHandler} 
											id={'recent'} disableRipple
										>
											Recent
										</MenuItem>
										<MenuItem 
											onClick={sortingHandler} 
											id={'old'} disableRipple
										>
											Oldest
										</MenuItem>
										<MenuItem 
											onClick={sortingHandler} 
											id={'likes'} disableRipple
										>
											Likes
										</MenuItem>
										<MenuItem 
											onClick={sortingHandler} 
											id={'views'} disableRipple
										>
											Views
										</MenuItem>
									</Menu>
								</div>
							</Box>
						</Stack>
					<Stack className='agent-card-box'>
						{agents?.length === 0 ? (
							<div style={{width:"100%",display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Agents found!</p>
							</div>
						) : (
							agents.map((agent: Member) => {
								return <AgentCard agent={agent} key={agent._id} likeMemberHandler={likeMemberHandler} />;
							})
						)}
					</Stack>
					<Stack>
						<Pagination count={2}
							style={{marginBottom: "30px"}}
						// page={page} 
						// onChange={handleChange} 
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

AgentList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default withLayoutBasic(AgentList);
