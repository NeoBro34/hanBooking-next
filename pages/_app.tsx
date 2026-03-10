import type { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import light from '../scss/MaterialTheme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';

import '../scss/app.scss';
import '../scss/pc/main.scss';
import '../scss/mobile/main.scss';

const App = ({ Component, pageProps }: AppProps) => {

	const [muiTheme] = useState(createTheme(light));
	const client = useApollo(pageProps.initialApolloState);

	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
			<ApolloProvider client={client}>
				<MuiThemeProvider theme={muiTheme}>
					<CssBaseline />
					<Component {...pageProps} />
				</MuiThemeProvider>
			</ApolloProvider>
		</ThemeProvider>
	);
};

export default appWithTranslation(App);