import { useEffect } from 'react';
import { Status } from '../../redux';
import Users from '../screens/Users';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AppHome from '../screens/AppHome';
import Token from '../screens/TokenInfo';
import { useSelector } from 'react-redux';
import Settings from '../screens/Settings';
import { useAppDispatch } from '../../hooks';
import Dashboard from '../screens/Dashboard';
import LayoutApp from '../layouts/LayoutApp';
import LayoutHome from '../layouts/LayoutHome';
import { useNavigate } from 'react-router-dom';
import IsAuthenticated from './IsAuthenticated';
import { Routes, Route } from 'react-router-dom';
import {
	fetchAuthentication,
	selectAuthentication,
	selectAuthenticationStatus,
} from '../../redux/slices/authenticationSlice';
import {
	fetchMetaMaskWallet,
	selectMetaMaskWallet,
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
	const selectedAuthentication = useSelector(selectAuthentication);
	const selectedAuthenticationStatus = useSelector(
		selectAuthenticationStatus
	);
	const metaMaskWallet = useSelector(selectMetaMaskWallet);
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
			appDispatch(fetchMetaMaskWallet());
		}
	}, [isMetaMaskInstalled, isMetaMaskConnected, appDispatch]);

	console.log('App - metaMaskWallet', metaMaskWallet);
	console.log('App - isMetaMaskInstalled', isMetaMaskInstalled);
	console.log('App - isMetaMaskConnected', isMetaMaskConnected);

	useEffect(() => {
		if (
			selectedAuthentication &&
			selectedAuthenticationStatus === Status.IDLE
		) {
			appDispatch(fetchAuthentication());
		}
	}, [
		selectedAuthenticationStatus,
		selectedAuthentication,
		appDispatch,
		navigate,
	]);

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
							<Token />
						</LayoutApp>
					}
				/>
				<Route
					path="/"
					element={
						<LayoutHome>
							<AppHome />
						</LayoutHome>
					}
				/>
			</Routes>
		</>
	);
};

export default App;
