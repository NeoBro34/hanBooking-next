import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box } from '@mui/material';

const CS: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>CS PAGE MOBILE</div>;
	} else {
		return (
			<div className='container'>
                CS PAGE
            </div>
		);
	}
};

export default withLayoutBasic(CS);
