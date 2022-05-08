import ColorsPieChart from '../../../../../../../../interfaces/colorsPieChartInterface';
import {
	themeColors,
	defaultColors,
} from '../../../../../../../../theme/colors';

const { primaryMain } = defaultColors;

const {
	darkPurple,
	lightPurple,
	lightBlue,
	lighterBlue,
	darkAqua,
	lightAqua,
	green,
	lightGreen,
	darkOrange,
	lightOrange,
	red,
} = themeColors;

const colors = {
	0: primaryMain,
	1: darkPurple,
	2: lightPurple,
	3: lightBlue,
	4: lighterBlue,
	5: darkAqua,
	6: lightAqua,
	7: green,
	8: lightGreen,
	9: darkOrange,
	10: lightOrange,
	11: red,
} as ColorsPieChart;

export default colors;
