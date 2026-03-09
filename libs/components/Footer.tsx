import React from 'react';
import Link from 'next/link';
import { Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  const footerLinks = {
    [t('Company')]: [
      { label: t('About Us'), href: '/about' },
      { label: t('Our Products'), href: '/stays' },
      { label: t('Our Agents'), href: '/agent' },
      { label: t('Blog'), href: '/blog' },
    ],
    [t('Support')]: [
      { label: t('Help Center'), href: '/cs' },
      { label: t('Contact Us'), href: '/cs/?tab=faq' },
      { label: t('Terms of Service'), href: '/cs/?tab=faq' },
      { label: t('Privacy Policy'), href: '/cs' },
    ],
  };

  return (
    <div className="footer-bg text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container py-12 border-t border-gray-800">
          <Grid container spacing={4}>
            {/* Brand Column */}
            <Grid item xs={12} md={3} sx={{ ml: { md: 3 }, pl: { md: 1 } }}>
              <div className="flex items-center gap-2 mb-4">
                <Link href={"/"}><img src="/img/logo/logoWhiteF.png" width={"200px"} alt="" /></Link>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {t('Discover extraordinary stays across South Korea. From luxury hotels to cozy retreats, we help you find your perfect accommodation.')}
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
                {t('Contact Info')}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <LocationOn className="text-yellow-600 mt-1" />
                  <span className="text-gray-400">
                    {t('South Korea, Seoul')}
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
              © {new Date().getFullYear()} {t('StayLuxe. All rights reserved.')}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-yellow-600 no-underline">
                {t('Terms')}
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-600 no-underline">
                {t('Privacy')}
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-yellow-600 no-underline">
                {t('Cookies')}
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-yellow-600 no-underline">
                {t('Sitemap')}
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Footer;
