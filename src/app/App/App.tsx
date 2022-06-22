import { useEffect } from 'react';
import { Status } from '../../redux';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import LayoutApp from '../layouts/LayoutApp';
import LayoutHome from '../layouts/LayoutHome';
import { useNavigate } from 'react-router-dom';
import IsAuthenticated from './IsAuthenticated';
import { Routes, Route } from 'react-router-dom';
import {
	Home,
	Users,
	SignIn,
	SignUp,
	Settings,
	TokenInfo,
	Dashboard,
} from '../screens/';
import {
	fetchAuthentication,
	selectAuthentication,
	selectAuthenticationStatus,
} from '../../redux/slices/authenticationSlice';
import {
	fetchMetaMaskProvider,
	selectMetaMaskProvider,
} from '../../redux/slices/metamaskSlice';
import {
	selectIsMetaMaskConnected,
	fetchIsMetaMaskConnected,
} from '../../redux/slices/metamaskConnectedSlice';
import {
	selectIsMetaMaskInstalled,
	fetchIsMetaMaskInstalled,
} from '../../redux/slices/metamaskInstalledSlice';

const App = () => {
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const authentication = useSelector(selectAuthentication);
	const authenticationStatus = useSelector(selectAuthenticationStatus);
	const metaMaskProvider = useSelector(selectMetaMaskProvider);
	const isMetaMaskInstalled = useSelector(selectIsMetaMaskInstalled);
	const isMetaMaskConnected = useSelector(selectIsMetaMaskConnected);

	useEffect(() => {
		if (!isMetaMaskInstalled) {
			appDispatch(fetchIsMetaMaskInstalled());
		}

		if (isMetaMaskInstalled && !isMetaMaskConnected) {
			appDispatch(fetchIsMetaMaskConnected());
		}

		if (isMetaMaskConnected) {
			appDispatch(fetchMetaMaskProvider());
		}
	}, [isMetaMaskInstalled, isMetaMaskConnected, appDispatch]);

	console.log('App - isMetaMaskInstalled', isMetaMaskInstalled);
	console.log('App - isMetaMaskConnected', isMetaMaskConnected);
	console.log('App - metaMaskProvider', metaMaskProvider);

	useEffect(() => {
		if (authentication && authenticationStatus === Status.IDLE) {
			appDispatch(fetchAuthentication());
		}
	}, [authenticationStatus, authentication, appDispatch, navigate]);

	useEffect(() => {
		if (authentication && authenticationStatus === Status.IDLE) {
			appDispatch(fetchAuthentication());
		}
	}, [authenticationStatus, authentication, appDispatch, navigate]);

	// useEffect(() => {
	// 	if (isMetaMaskConnected && metaMaskProvider.on) {
	// 		metaMaskProvider.on('accountsChanged', (accounts: string[]) => {
	// 			console.log('--- accountsChanged ---', accounts);
	// 			console.log(metaMaskProvider.selectedAddress);
	// 			console.log(authentication);
	// 			// Handle the new accounts, or lack thereof.
	// 			// "accounts" will always be an array, but it can be empty.
	// 		});

	// 		metaMaskProvider.on('chainChanged', (chainId: string) => {
	// 			console.log('--- chainChanged ---', chainId);
	// 			console.log(authentication);
	// 			// Handle the new chain.
	// 			// Correctly handling chain changes can be complicated.
	// 			// We recommend reloading the page unless you have good reason not to.
	// 		});
	// 	}
	// }, [authentication, isMetaMaskConnected, metaMaskProvider]);

	return (
		<>
			<Routes>
				<Route
					path="/users"
					element={
						<LayoutHome>
							<Users />
						</LayoutHome>
					}
				/>
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route
					path="/dashboard/settings"
					element={
						<LayoutApp>
							<Settings />
						</LayoutApp>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<IsAuthenticated>
							<LayoutApp>
								<Dashboard />
							</LayoutApp>
						</IsAuthenticated>
					}
				/>
				<Route
					path="/token/:symbol"
					element={
						<LayoutApp>
							<TokenInfo />
						</LayoutApp>
					}
				/>
				<Route
					path="/"
					element={
						<LayoutHome>
							<Home />
						</LayoutHome>
					}
				/>
			</Routes>
		</>
	);
};

export default App;
