import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme  from '../scss/MaterialTheme/index';
import { useState } from 'react';
import "../scss/app.scss";
import "../scss/pc/main.scss";
 
export default function App({ Component, pageProps }: AppProps) {
  //@ts-ignore

  // Socket.io, Redux, Mui ...
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Component {...pageProps} />
     </ThemeProvider>
  );
}