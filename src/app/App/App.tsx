import AppHome from '../screens/AppHome';
import Token from '../screens/TokenInfo';
import Dashboard from '../screens/Dashboard';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Users from '../screens/Users';
import LayoutApp from '../layouts/LayoutApp';
import LayoutAppHome from '../layouts/LayoutAppHome';
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
