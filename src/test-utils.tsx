import './setup-tests';
import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './redux/store';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

interface Props {
	children?: React.ReactNode;
}

const AllTheProviders: FC = ({ children }: Props) => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>{children}</Router>
				</ThemeProvider>
			</Provider>
		</React.StrictMode>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
