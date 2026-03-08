import React from 'react';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { Property } from '../../../types/property/property';
import { REACT_APP_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { PropertyStatus } from '../../../enums/property.enum';
import { Booking } from '@/libs/types/booking/booking';
import { OrderStatus } from '@/libs/enums/booking.enum';
import Moment from 'react-moment';

interface Data {
	id: string;
	member: string;
	property: string;
	price: string;
	guests: string;
	dataIn: string;
	dataOut: string;
	location: string;
	type: string;
	status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'Booking ID',
	},
	{
		id: 'property',
		numeric: true,
		disablePadding: false,
		label: 'Property',
	},
	{
		id: 'member',
		numeric: true,
		disablePadding: false,
		label: 'Member',
	},
	{
		id: 'dataIn',
		numeric: false,
		disablePadding: false,
		label: 'Check-in',
	},
	{
		id: 'dataOut',
		numeric: false,
		disablePadding: false,
		label: 'Check-out',
	},
	{
		id: 'guests',
		numeric: false,
		disablePadding: false,
		label: 'Guest',
	},
	{
		id: 'location',
		numeric: false,
		disablePadding: false,
		label: 'Location',
	},
	{
		id: 'price',
		numeric: false,
		disablePadding: false,
		label: 'Total Price',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'Status',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface PropertyPanelListType {
	properties: Booking[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updatePropertyHandler: any;
	removePropertyHandler: any;
}

export const BookingPanelList = (props: PropertyPanelListType) => {
	const {
		properties,
		anchorEl,
		menuIconClickHandler,
		menuIconCloseHandler,
		updatePropertyHandler,
		removePropertyHandler,
	} = props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{properties.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{properties.length !== 0 &&
							properties.map((property: Booking, index: number) => {
								const propertyImage = `${REACT_APP_API_URL}/${property?.propertyData?.propertyImages?.[0]}`;
								const memberImage = property?.memberData?.memberImage
									? `${process.env.REACT_APP_API_URL}/${property?.memberData?.memberImage}`
									: '/img/profile/defaultUser.svg';

								return (
									<TableRow hover key={property?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{property._id}</TableCell>
										<TableCell align="left" className={'name'}>
											{property.bookingStatus === OrderStatus.CANCELLED ? (
												<Stack direction={'row'}>
													<div>
														<Avatar alt="Remy Sharp" src={propertyImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
													<div style={{ marginTop: '10px' }}>{property?.propertyData?.propertyTitle}</div>
												</Stack>
											) : (
												<Stack direction={'row'}>
													<Link href={`/stays/detail?id=${property?.propertyData?._id}`}>
														<div>
															<Avatar alt="Remy Sharp" src={propertyImage} sx={{ ml: '2px', mr: '10px' }} />
														</div>
													</Link>
													<Link href={`/stays/detail?id=${property?.propertyData._id}`}>
														<div>{property?.propertyData?.propertyTitle}</div>
													</Link>
												</Stack>
											)}
										</TableCell>
										<TableCell align="center">
											<Stack direction={'row'} sx={{alignItems:'center'}}>
												<Link href={`/member/?memberId=${property?.memberData?._id}`}>
													<div>
														<Avatar alt="Remy Sharp" src={memberImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
												</Link>
												<Link href={`/member/?memberId=${property?.memberData?._id}`}>
													<div>{property?.memberData?.memberNick}</div>
												</Link>
											</Stack>
										</TableCell>
										<TableCell align="center">
											<Moment style={{fontWeight:'bold'}} className="month" format={'DD:MMMM:YY'}>
												{property?.checkInDate}
											</Moment>
										</TableCell>
										<TableCell align="center">
											<Moment style={{fontWeight:'bold'}} className="month" format={'DD:MMMM:YY'}>
												{property?.checkOutDate}
											</Moment>
										</TableCell>
										<TableCell align="center">
											{property?.guests}
										</TableCell>
										<TableCell align="center">
											{property?.propertyData?.propertyLocation}
										</TableCell>
										<TableCell style={{fontWeight:'bold'}} align="center">
											{property?.totalPrice} $
										</TableCell>
										<TableCell align="center">
											{property.bookingStatus === OrderStatus.CANCELLED && (
												<Button
													variant="outlined"
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removePropertyHandler(property._id)}
												>
													<DeleteIcon fontSize="small" />
												</Button>
											)}

											{property.bookingStatus === OrderStatus.PENDING && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge warning'}>
														{property.bookingStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(OrderStatus)
															.filter((ele) => ele !== property.bookingStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updatePropertyHandler({ _id: property._id, bookingStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}

											{property.bookingStatus === OrderStatus.CONFIRMED && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{property.bookingStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(OrderStatus)
															.filter((ele) => ele !== property?.bookingStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updatePropertyHandler({ _id: property._id, propertyStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
