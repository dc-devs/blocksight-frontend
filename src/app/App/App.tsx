import Users from '../screens/Users';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AppHome from '../screens/AppHome';
import Token from '../screens/TokenInfo';
import Settings from '../screens/Settings';
import Dashboard from '../screens/Dashboard';
import LayoutApp from '../layouts/LayoutApp';
import { Routes, Route } from 'react-router-dom';
import LayoutAppHome from '../layouts/LayoutAppHome';

const App = () => {
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
						<LayoutApp>
							<Dashboard />
						</LayoutApp>
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
