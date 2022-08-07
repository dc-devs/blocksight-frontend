import { createTheme } from '@mui/material/styles';
import { textColors, defaultColors } from './colors';

const {
	errorMain,
	primaryLight,
	primaryMain,
	primaryDark,
	secondaryMain,
	backgroundDefault,
} = defaultColors;

const { primaryText } = textColors;

const theme = createTheme({
	typography: {
		fontFamily: `Montserrat, Helvetica, Arial, sans-serif;`,
		body1: {
			fontFamily: `Montserrat, Helvetica, Arial, sans-serif;`,
		},
		body2: {
			fontFamily: `Montserrat, Helvetica, Arial, sans-serif;`,
		},
	},
	palette: {
		primary: {
			light: primaryLight,
			main: primaryMain,
			dark: primaryDark,
		},
		secondary: {
			main: secondaryMain,
		},
		error: {
			main: errorMain,
		},
		background: {
			default: backgroundDefault,
		},
		text: {
			primary: primaryText,
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: primaryMain,
					},
				},
			},
		},
	},
});

export default theme;
