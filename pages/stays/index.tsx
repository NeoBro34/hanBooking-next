import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Container } from '@mui/material';

const Stays: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>Stays MOBILE</div>;
	} else {
		return (
			<div className='container'>
                Stays
            </div>
		);
	}
};

export default withLayoutBasic(Stays);
