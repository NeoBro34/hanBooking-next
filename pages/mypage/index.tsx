import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box } from '@mui/material';

const MyPage: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>MyPage MOBILE</div>;
	} else {
		return (
			<div className='container'>
                MyPage
            </div>
		);
	}
};

export default withLayoutBasic(MyPage);
