import React, { useState,  MouseEvent } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Pagination, TextField, Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchIcon from '@mui/icons-material/Search';
import AgentCard from '@/libs/components/agent/AgentCard';

const AgentList: NextPage = () => {
	const device = useDeviceDetect();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [sortingOpen, setSortingOpen] = useState(false);
	const [filterSortName, setFilterSortName] = useState('Recent');


	/** HANDLERS **/
	const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
		setSortingOpen(true);
	};

	const sortingCloseHandler = () => {
		setSortingOpen(false);
		setAnchorEl(null);
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
											// onClick={sortingHandler} 
											id={'recent'} disableRipple
										>
											Recent
										</MenuItem>
										<MenuItem 
											// onClick={sortingHandler} 
											id={'old'} disableRipple
										>
											Oldest
										</MenuItem>
										<MenuItem 
											// onClick={sortingHandler} 
											id={'likes'} disableRipple
										>
											Likes
										</MenuItem>
										<MenuItem 
											// onClick={sortingHandler} 
											id={'views'} disableRipple
										>
											Views
										</MenuItem>
									</Menu>
								</div>
							</Box>
						</Stack>
					<Stack className='agent-card-box'>
						{[1,2,3,4,5].map((agent, index) => (
							<AgentCard/>
						))}
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

export default withLayoutBasic(AgentList);
