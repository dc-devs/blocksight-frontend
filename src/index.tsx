import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import reportWebVitals from './report-web-vitals';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import store from './redux/store';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';

export const muiCache = createCache({
	key: 'mui',
	prepend: true,
});

ReactDOM.render(
	<React.StrictMode>
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
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
