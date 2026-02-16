import React from 'react';
import Link from 'next/link';
import {
  Container,
  Grid,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Hotel,
  Email,
  Phone,
  LocationOn,
  Send,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    Support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  };

  return (
    <div className="footer-bg text-white mt-auto">
      {/* Newsletter Section */}
      <div 
        className="py-12"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 183, 56, 0.1) 0%, rgba(240, 159, 36, 0.05) 100%)',
          borderTop: '1px solid rgba(245, 183, 56, 0.2)',
        }}
      >
          <div className='container '>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <h3 className="font-display text-3xl font-bold mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-400">
                  Get exclusive deals and travel inspiration delivered to your inbox
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="flex gap-2">
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(245, 183, 56, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(245, 183, 56, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f5b738',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'white',
                        '&::placeholder': {
                          color: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<Send />}
                    className='group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium   text-gray-500  transition active:scale-95 bg-gradient-to-r from-yellow-600 to-[#4e4b4b] py-3 px-8 rounded-full text-white hover:translate-x-1 transition mt-10'
                  >
                    Subscribe
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12 border-t border-gray-800">
          <Grid container spacing={4}>
            {/* Brand Column */}
            <Grid item xs={12} md={3}>
              <div className="flex items-center gap-2 mb-4">
                <Link href={"/"}><img src="/img/logo/logoWhiteF.png" width={"200px"} alt="" /></Link>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Discover extraordinary stays around the world. From luxury hotels to cozy retreats, 
                we help you find your perfect accommodation.
              </p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(245, 183, 56, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(245, 183, 56, 0.2)',
                        color: '#f5b738',
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </div>
            </Grid>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <Grid marginTop={"80px"} marginLeft={"90px"} item xs={6} md={2} key={title}>
                <h4 className="font-display text-lg font-semibold mb-4 text-yellow-600">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}> 
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-yellow-600 transition-colors no-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}

            {/* Contact Column */}
            <Grid marginTop={"80px"} item xs={12} md={3}>
              <h4 className="font-display text-lg font-semibold mb-4 text-yellow-600">
                Contact Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <LocationOn className="text-yellow-600 mt-1" />
                  <span className="text-gray-400">
                    South Korea, Seoul
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-yellow-600" />
                  <span className="text-gray-400">+82 00 1234 - 7777</span>
                </div>
                <div className="flex items-center gap-3">
                  <Email className="text-yellow-600" />
                  <span className="text-gray-400">hanbooking@gmail.com</span>
                </div>
              </div>
            </Grid>
          </Grid>
      </div>

      {/* Bottom Bar */}
      <div 
        className="py-6 border-t border-gray-800"
        style={{
          background: 'linear-gradient(135deg, #1b1f27 0%, #282f37 100%)',
        }}
      >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mr-6 ml-6">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} StayLuxe. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-yellow-600 no-underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-600 no-underline">
                Privacy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-yellow-600 no-underline">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-yellow-600 no-underline">
                Sitemap
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Footer;
