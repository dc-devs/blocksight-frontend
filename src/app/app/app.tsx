import AppHome from '../screens/app-home';
import Token from '../screens/token-info';
import Dashboard from '../screens/dashboard';
import SignIn from '../screens/sign-in';
import SignUp from '../screens/sign-up';
import Users from '../screens/users';
import LayoutApp from '../layouts/layout-app';
import LayoutAppHome from '../layouts/layout-app-home';
import { Routes, Route } from 'react-router-dom';

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
