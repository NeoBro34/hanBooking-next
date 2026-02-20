import React, { useState,  MouseEvent } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Pagination, TextField, Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchIcon from '@mui/icons-material/Search';

const AgentList: NextPage = () => {
	const device = useDeviceDetect();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [sortingOpen, setSortingOpen] = useState(false);
	const [filterSortName, setFilterSortName] = useState('New');


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
											id={'new'}
											disableRipple
											sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
										>
											New
										</MenuItem>
										<MenuItem
											// onClick={sortingHandler}
											id={'lowest'}
											disableRipple
											sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
										>
											Lowest Price
										</MenuItem>
										<MenuItem
											// onClick={sortingHandler}
											id={'highest'}
											disableRipple
											sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
										>
											Highest Price
										</MenuItem>
									</Menu>
								</div>
							</Box>
						</Stack>
					<Stack className='agent-card-box'>

					</Stack>
					<Stack>
						<Pagination count={2}
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
