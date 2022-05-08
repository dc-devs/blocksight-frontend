import { render, screen } from '../../../testUtils';
import Logo from './Logo';

test('renders learn react link', () => {
	render(<Logo />);
	const LogoText = screen.getByTestId('LogoText');
	expect(LogoText).toBeInTheDocument();
});
