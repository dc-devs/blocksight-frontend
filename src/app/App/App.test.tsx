import { render, screen } from '../../testUtils';
// import { useDispatch } from 'react-redux';
import App from './App';
// import { updateIsMetaMaskConnected } from '../../redux/slices/metamask-connected-slice';

describe('App', () => {
	describe('when not logged in with metamask', () => {
		test('should render the app home layout', () => {
			render(<App />);

			const layoutAppHome = screen.getByTestId('layoutAppHome');
			expect(layoutAppHome).toBeInTheDocument();
		});
	});
});
