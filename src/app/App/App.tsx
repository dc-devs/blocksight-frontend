import { useEffect } from 'react';
import { Status } from '../../redux';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import LayoutApp from '../layouts/LayoutApp';
import LayoutHome from '../layouts/LayoutHome';
import { useNavigate } from 'react-router-dom';
import IsAuthenticated from './IsAuthenticated';
import { Routes, Route } from 'react-router-dom';
import signOut from '../../utils/actions/signOut';
import {
	Home,
	Users,
	SignIn,
	SignUp,
	Settings,
	Exchanges,
	TokenInfo,
	Dashboard,
} from '../screens/';
import {
	fetchAuthentication,
	selectAuthentication,
	selectAuthenticationStatus,
	setAuthentication,
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
	const dispatch = useAppDispatch();
	const authentication = useSelector(selectAuthentication);
	const authenticationStatus = useSelector(selectAuthenticationStatus);
	const metaMaskProvider = useSelector(selectMetaMaskProvider);
	const isMetaMaskInstalled = useSelector(selectIsMetaMaskInstalled);
	const isMetaMaskConnected = useSelector(selectIsMetaMaskConnected);

	useEffect(() => {
		if (!isMetaMaskInstalled) {
			dispatch(fetchIsMetaMaskInstalled());
		}

		if (isMetaMaskInstalled && !isMetaMaskConnected) {
			dispatch(fetchIsMetaMaskConnected());
		}

		if (isMetaMaskConnected) {
			dispatch(fetchMetaMaskProvider());
		}
	}, [isMetaMaskInstalled, isMetaMaskConnected, dispatch]);

	console.log('App - isMetaMaskInstalled', isMetaMaskInstalled);
	console.log('App - isMetaMaskConnected', isMetaMaskConnected);
	console.log('App - metaMaskProvider', metaMaskProvider);

	useEffect(() => {
		if (authentication && authenticationStatus === Status.IDLE) {
			dispatch(fetchAuthentication());
		}
	}, [authenticationStatus, authentication, dispatch, navigate]);

	useEffect(() => {
		if (isMetaMaskConnected && metaMaskProvider.on) {
			metaMaskProvider.on('accountsChanged', (accounts: string[]) => {
				if (accounts.length < 1) {
					if (authentication.user?.id) {
						signOut({
							userId: authentication.user.id,
							dispatch,
							navigate,
						});
					}
				} else {
					const selectedAddress = accounts[0];

					const updatedAuthentication = { ...authentication };

					if (updatedAuthentication && updatedAuthentication.wallet) {
						updatedAuthentication.wallet = {
							...updatedAuthentication.wallet,
							selectedAddress: selectedAddress,
						};
					}

					dispatch(setAuthentication(updatedAuthentication));
				}
			});

			metaMaskProvider.on('chainChanged', (chainId: string) => {
				const updatedAuthentication = { ...authentication };

				if (updatedAuthentication && updatedAuthentication.wallet) {
					updatedAuthentication.wallet = {
						...updatedAuthentication.wallet,
						chainId: String(Number(chainId)),
					};
				}

				dispatch(setAuthentication(updatedAuthentication));
			});
		}
	}, [dispatch, authentication, isMetaMaskConnected, metaMaskProvider]);

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
					path="/exchanges"
					element={
						<IsAuthenticated>
							<LayoutApp>
								<Exchanges />
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
