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
import { Routes, Route } from 'react-router-dom';
import LayoutAppHome from '../layouts/LayoutAppHome';
import {
	fetchAuthentication,
	selectAuthentication,
	selectAuthenticationStatus,
	// selectTokenBalancesError,
} from '../../redux/slices/authenticationSlice';
import { useNavigate } from 'react-router-dom';

const App = () => {
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const selectedAuthentication = useSelector(selectAuthentication);
	const selectedAuthenticationStatus = useSelector(
		selectAuthenticationStatus
	);

	useEffect(() => {
		if (
			selectedAuthentication &&
			selectedAuthenticationStatus === Status.IDLE
		) {
			appDispatch(fetchAuthentication());
		}

		if (
			selectedAuthenticationStatus === Status.SUCCEEDED &&
			!selectedAuthentication.isAuthenticated
		) {
			navigate('/sign-in', { replace: true });
		}
	}, [
		selectedAuthenticationStatus,
		selectedAuthentication,
		appDispatch,
		navigate,
	]);

	console.log(
		'[App] isAuthenticated',
		!!selectedAuthentication.isAuthenticated
	);

	console.log(
		'[App] selectedAuthenticationStatus',
		selectedAuthenticationStatus
	);

	if (selectedAuthenticationStatus === Status.LOADING) {
		return <></>;
	}

	return (
		<>
			<Routes>
				<Route
					path="/users"
					element={
						<LayoutAppHome>
							<Users />
						</LayoutAppHome>
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
						// <IsAuthenticated>
						<LayoutApp>
							<Dashboard />
						</LayoutApp>
						// </IsAuthenticated>
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
						<LayoutAppHome>
							<AppHome />
						</LayoutAppHome>
					}
				/>
			</Routes>
		</>
	);
};

export default App;
