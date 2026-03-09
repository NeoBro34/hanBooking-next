import React from 'react';
import { useRouter } from 'next/router';
import { Box, Stack, CardMedia, Typography, Rating } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '@/libs/types/property/property';
import BoltIcon from '@mui/icons-material/Bolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { REACT_APP_API_URL, topPropertyRank } from '@/libs/config';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';



interface PropertySmallCardProps {
	property: Property;
}
const PropertySmallCard = (props: PropertySmallCardProps) => {
    const { property } = props;
    const device = useDeviceDetect();
    const { t } = useTranslation('common');
    const router = useRouter();
    const imagePath: string = property?.propertyImages[0]
            ? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
            : '/img/banner/header1.svg';

    /** HANDLERS **/
    const pushDetailHandler = async ( propertyId:string ) => {
		console.log("propertyId:", propertyId);
		await router.push({ pathname: '/stays/detail', query: {id: propertyId}});
	};

    if (device === 'mobile') {
        return (
            <div>{t('Mobile')}</div>
        );
    } else {
        return (
            <Stack 
                onClick={() => { pushDetailHandler(property?._id) }} 
                className='right-card-box-small'>
                <Stack className="cardImageWrapper">
                    {property && property?.propertyRank > topPropertyRank && (
                        <Box className='top-icon'>
                            <Box><BoltIcon/></Box>
                            <Typography style={{fontSize:"10px", fontWeight: "bold"}}>
                                {t('Top')}
                            </Typography>
                        </Box>
                    )}
                    <CardMedia
                        component="img"
                        image={imagePath}
                        className="cardImage"
                    />
                </Stack>
                <Stack className='obsion-box'>
                    <Box className='info-box'>
                        <span
                            className="text-xm font-bold text-gray-900">
                            {property.propertyTitle}
                        </span>
                        <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <LocationOnIcon sx={{ fontSize: 10 }} />
                            <span className="text-xs">{property.propertyLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Rating 
                                value={4.8} 
                                precision={0.1} 
                                readOnly 
                                size="small"
                            />
                            <span className="text-xs text-gray-600">
                                ({property.propertyComments} {t('reviews')})
                            </span>
                        </div>
                    </Box>
                </Stack>
            </Stack>
        );
    }
};

export default PropertySmallCard;
