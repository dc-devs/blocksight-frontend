import React from 'react';
import theme from './theme';
import App from './app/App';
import store from './redux/store';
import { Provider } from 'react-redux';
import createCache from '@emotion/cache';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

const link = createHttpLink({
	credentials: 'include',
	uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
	link,
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache(),
});

export const muiCache = createCache({
	key: 'mui',
	prepend: true,
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<CacheProvider value={muiCache}>
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Router>
							<App />
						</Router>
					</ThemeProvider>
				</Provider>
			</CacheProvider>
		</ApolloProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
