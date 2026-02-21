import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import {
  Container,
  Stack,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Public,
  Security,
  Star,
  Support,
  Payments,
  Search,
  VerifiedUser,
  TrendingUp,
  FavoriteBorder,
  CheckCircleOutline,
} from '@mui/icons-material';

const About: NextPage = () => {
	const device = useDeviceDetect();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const features = [
		{
		icon: <Public sx={{ fontSize: 50 }} />,
		title: 'Worldwide Coverage',
		description:
			'Access millions of properties across 200+ countries and territories. From bustling cities to remote getaways, we bring the world to your fingertips.',
		},
		{
		icon: <Security sx={{ fontSize: 50 }} />,
		title: 'Secure & Safe',
		description:
			'Your security is our priority. We use industry-leading encryption and secure payment systems to protect your personal information and transactions.',
		},
		{
		icon: <Star sx={{ fontSize: 50 }} />,
		title: 'Verified Reviews',
		description:
			'Make informed decisions with authentic reviews from real travelers. Every review is verified to ensure transparency and reliability.',
		},
		{
		icon: <Support sx={{ fontSize: 50 }} />,
		title: '24/7 Support',
		description:
			'Our dedicated customer support team is available around the clock in multiple languages to assist you whenever you need help.',
		},
	];

	const benefits = [
		{
		icon: <Search sx={{ fontSize: 40, color: '#1976d2' }} />,
		title: 'Easy Search & Booking',
		description: 'Find and book your perfect stay in just a few clicks',
		},
		{
		icon: <Payments sx={{ fontSize: 40, color: '#1976d2' }} />,
		title: 'Secure Payments',
		description: 'Multiple payment options with bank-level security',
		},
		{
		icon: <TrendingUp sx={{ fontSize: 40, color: '#1976d2' }} />,
		title: 'Best Price Guarantee',
		description: 'Competitive prices and exclusive deals every day',
		},
		{
		icon: <VerifiedUser sx={{ fontSize: 40, color: '#1976d2' }} />,
		title: 'Verified Properties',
		description: 'All accommodations are carefully vetted and verified',
		},
	];

	const values = [
		{
		icon: <FavoriteBorder sx={{ fontSize: 35 }} />,
		title: 'Customer First',
		description: 'Your satisfaction and experience are at the heart of everything we do',
		},
		{
		icon: <CheckCircleOutline sx={{ fontSize: 35 }} />,
		title: 'Trust & Transparency',
		description: 'We believe in honest communication and building lasting relationships',
		},
		{
		icon: <Public sx={{ fontSize: 35 }} />,
		title: 'Global Connection',
		description: 'We connect travelers with unique stays and experiences worldwide',
		},
	];

	if (device === 'mobile') {
		return <div>ABOUT PAGE MOBILE</div>;
	} else {
		return (
			<Stack className='about-list-box'>
				<Stack className='container'>
					<Stack sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
						{/* Hero Section */}
						<Box
							sx={{
							position: 'relative',
							height: { xs: '400px', md: '500px' },
							backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1768346564825-6f90c0b89e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc3MTY2OTI2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'white',
							textAlign: 'center',
							borderRadius: "20px"
							}}
						>
							<Container maxWidth="lg">
							<Typography
								variant="h2"
								component="h1"
								gutterBottom
								sx={{
								fontWeight: 700,
								fontSize: { xs: '2.5rem', md: '3.5rem' },
								mb: 2,
								}}
							>
								Welcome to Stays Booking
							</Typography>
							<Typography
								variant="h5"
								sx={{
								fontWeight: 400,
								fontSize: { xs: '1.1rem', md: '1.5rem' },
								maxWidth: '800px',
								margin: '0 auto',
								}}
							>
								Your trusted partner for finding the perfect accommodation anywhere in the world
							</Typography>
							</Container>
						</Box>

						{/* Introduction Section */}
						<Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
							<Box sx={{ textAlign: 'center', mb: 6 }}>
							<Typography
								variant="h3"
								component="h2"
								gutterBottom
								sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}
							>
								About Stays Booking
							</Typography>
							<Typography
								variant="body1"
								sx={{
								fontSize: '1.125rem',
								lineHeight: 1.8,
								color: '#555',
								maxWidth: '900px',
								margin: '0 auto',
								}}
							>
								Stays Booking is more than just a booking platform—we're your companion in creating
								unforgettable travel experiences. Founded with a passion for travel and a commitment to
								innovation, we've built a platform that connects millions of travelers with exceptional
								accommodations worldwide. Whether you're planning a weekend getaway, a business trip,
								or the vacation of a lifetime, we're here to make your journey seamless and memorable.
							</Typography>
							</Box>

							{/* Mission & Vision */}
							<Grid container spacing={4} sx={{ mb: 8 }}>
							<Grid item xs={12} md={6}>
								<Card
								elevation={0}
								sx={{
									height: '100%',
									bgcolor: 'white',
									border: '1px solid #e0e0e0',
									transition: 'transform 0.3s, box-shadow 0.3s',
									'&:hover': {
									transform: 'translateY(-8px)',
									boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
									},
								}}
								>
								<CardContent sx={{ p: 4 }}>
									<Typography
									variant="h4"
									gutterBottom
									sx={{ fontWeight: 600, color: '#1976d2', mb: 2 }}
									>
									Our Mission
									</Typography>
									<Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
									To empower travelers around the globe with the tools, choices, and confidence to
									discover and book their ideal accommodations. We strive to make travel accessible,
									affordable, and enjoyable for everyone, while supporting local hosts and
									communities.
									</Typography>
								</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} md={6}>
								<Card
								elevation={0}
								sx={{
									height: '100%',
									bgcolor: 'white',
									border: '1px solid #e0e0e0',
									transition: 'transform 0.3s, box-shadow 0.3s',
									'&:hover': {
									transform: 'translateY(-8px)',
									boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
									},
								}}
								>
								<CardContent sx={{ p: 4 }}>
									<Typography
									variant="h4"
									gutterBottom
									sx={{ fontWeight: 600, color: '#1976d2', mb: 2 }}
									>
									Our Vision
									</Typography>
									<Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
									To become the world's most trusted and innovative travel accommodation platform,
									where every traveler finds their perfect stay and every host reaches their ideal
									guests. We envision a future where travel brings people together, fosters cultural
									understanding, and creates lasting memories.
									</Typography>
								</CardContent>
								</Card>
							</Grid>
							</Grid>
						</Container>

						{/* What Makes Us Unique */}
						<Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
							<Container maxWidth="lg">
							<Typography
								variant="h3"
								component="h2"
								align="center"
								gutterBottom
								sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}
							>
								What Makes Us Unique
							</Typography>
							<Typography
								variant="body1"
								align="center"
								sx={{ fontSize: '1.125rem', color: '#555', mb: 6, maxWidth: '700px', margin: '0 auto 48px' }}
							>
								We stand out by combining cutting-edge technology with personalized service to deliver
								an exceptional booking experience.
							</Typography>

							<Grid container spacing={4}>
								{features.map((feature, index) => (
								<Grid item xs={12} sm={6} md={3} key={index}>
									<Box
									sx={{
										textAlign: 'center',
										p: 3,
										height: '100%',
										transition: 'transform 0.3s',
										'&:hover': {
										transform: 'scale(1.05)',
										},
									}}
									>
									<Box sx={{ color: '#1976d2', mb: 2 }}>{feature.icon}</Box>
									<Typography
										variant="h6"
										gutterBottom
										sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1.5 }}
									>
										{feature.title}
									</Typography>
									<Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
										{feature.description}
									</Typography>
									</Box>
								</Grid>
								))}
							</Grid>
							</Container>
						</Box>

						{/* Benefits Section */}
						<Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
							<Typography
							variant="h3"
							component="h2"
							align="center"
							gutterBottom
							sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}
							>
							Benefits for Our Customers
							</Typography>
							<Typography
							variant="body1"
							align="center"
							sx={{ fontSize: '1.125rem', color: '#555', mb: 6, maxWidth: '700px', margin: '0 auto 48px' }}
							>
							We're committed to providing you with the best tools and support for a stress-free booking
							experience.
							</Typography>

							<Grid container spacing={4}>
							{benefits.map((benefit, index) => (
								<Grid item xs={12} sm={6} md={3} key={index}>
								<Card
									elevation={0}
									sx={{
									height: '100%',
									textAlign: 'center',
									p: 3,
									bgcolor: '#f9f9f9',
									border: '1px solid #e0e0e0',
									transition: 'all 0.3s',
									'&:hover': {
										bgcolor: 'white',
										boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
										transform: 'translateY(-4px)',
									},
									}}
								>
									<Box sx={{ mb: 2 }}>{benefit.icon}</Box>
									<Typography
									variant="h6"
									gutterBottom
									sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}
									>
									{benefit.title}
									</Typography>
									<Typography variant="body2" sx={{ color: '#666' }}>
									{benefit.description}
									</Typography>
								</Card>
								</Grid>
							))}
							</Grid>
						</Container>

						{/* Our Values Section */}
						<Box sx={{ bgcolor: '#272323', color: 'white', py: { xs: 6, md: 8 }, borderRadius: "20px" }}>
							<Container maxWidth="lg">
							<Typography
								variant="h3"
								component="h2"
								align="center"
								gutterBottom
								sx={{ fontWeight: 700, mb: 6 }}
							>
								Our Core Values
							</Typography>

							<Grid container spacing={4}>
								{values.map((value, index) => (
								<Grid item xs={12} md={4} key={index}>
									<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ mb: 2 }}>{value.icon}</Box>
									<Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
										{value.title}
									</Typography>
									<Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
										{value.description}
									</Typography>
									</Box>
								</Grid>
								))}
							</Grid>
							</Container>
						</Box>

						{/* Customer Satisfaction Commitment */}
						<Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
							<Grid container spacing={4} alignItems="center">
							<Grid item xs={12} md={6}>
								<Box
								component="img"
								src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZSUyMGRpdmVyc2V8ZW58MXx8fHwxNzcxNjgwOTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
								alt="Customer support team"
								sx={{
									width: '100%',
									height: 'auto',
									borderRadius: 2,
									boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
								}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography
								variant="h3"
								component="h2"
								gutterBottom
								sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}
								>
								Our Commitment to You
								</Typography>
								<Typography
								variant="body1"
								paragraph
								sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555', mb: 2 }}
								>
								At Stays Booking, customer satisfaction isn't just a goal—it's our promise. We
								understand that travel can be stressful, which is why we've designed every aspect of
								our platform to be intuitive, reliable, and supportive.
								</Typography>
								<Typography
								variant="body1"
								paragraph
								sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555', mb: 2 }}
								>
								Our dedicated team works tirelessly to ensure that you have access to accurate
								information, competitive pricing, and responsive support whenever you need it. We
								listen to your feedback, continuously improve our services, and go the extra mile to
								resolve any issues quickly and fairly.
								</Typography>
								<Typography
								variant="body1"
								sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555', mb: 3 }}
								>
								When you book with Stays Booking, you're not just a customer—you're part of our global
								community of travelers and explorers. We're honored to be part of your journey.
								</Typography>
								<Button
								variant="contained"
								size="large"
								sx={{
									background: "linear-gradient(90deg, #D4A017 0%, #462e01 100%)",
									color: "#fff",
									borderRadius: "30px",
									textTransform: "none",
									boxShadow: "none",

									"&:hover": {
									background: "linear-gradient(90deg, #C99614 0%, #462e01 100%)",
									boxShadow: "none",
									}
								}}
								>
								Start Your Journey
								</Button>
							</Grid>
							</Grid>
						</Container>

						{/* Final CTA Section */}
						<Box
							sx={{
							bgcolor: '#f9f9f9',
							py: { xs: 6, md: 8 },
							borderTop: '1px solid #e0e0e0',
							}}
						>
							<Container maxWidth="md">
							<Box sx={{ textAlign: 'center' }}>
								<Typography
								variant="h4"
								component="h2"
								gutterBottom
								sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}
								>
								Ready to Find Your Perfect Stay?
								</Typography>
								<Typography
								variant="body1"
								sx={{ fontSize: '1.125rem', color: '#555', mb: 4, lineHeight: 1.7 }}
								>
								Join millions of satisfied travelers who trust Stays Booking for their accommodation
								needs. Your next adventure is just a few clicks away.
								</Typography>
								<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
								<Button
									variant="contained"
									size="large"
									sx={{
										background: "linear-gradient(90deg, #D4A017 0%, #462e01 100%)",
										color: "#fff",
										borderRadius: "30px",
										padding: "8px 22px",
										textTransform: "none",
										fontWeight: 600,
										boxShadow: "none",

										"&:hover": {
											background: "linear-gradient(90deg, #C99614 0%, #462e01 100%)",
											boxShadow: "none",
										}
									}}
								>
									Explore Accommodations
								</Button>
								<Button
									variant="outlined"
									size="large"
									sx={{
									borderColor: '#1976d2',
									color: '#1976d2',
									px: 4,
									py: 1.5,
									fontSize: '1rem',
									textTransform: 'none',
									fontWeight: 600,
									borderRadius: "30px",
									'&:hover': {
										borderColor: '#1565c0',
										bgcolor: 'rgba(25, 118, 210, 0.04)',
									},
									}}
								>
									Contact Support
								</Button>
								</Box>
							</Box>
							</Container>
						</Box>
						</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(About);
