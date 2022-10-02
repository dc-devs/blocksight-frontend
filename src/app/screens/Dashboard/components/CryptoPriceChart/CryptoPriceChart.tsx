import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import PriceChart from '../../../../components/core/charts/PriceChart';

const useStyles = makeStyles()((theme) => ({
	cryptoPriceChartContainer: {
		marginTop: '50px',
		width: '100%',
		height: '450px',
		padding: theme.spacing(2),
	},
	headerContainer: {
		width: '100%',
		height: '95px',
	},
	priceChartContainer: {
		width: '100%',
		height: '355px',
	},
}));

const data = [
	{
		date: '11 May',
		workingFiat: parseFloat('4990.00'),
	},
	{
		date: '18 Mar',
		workingFiat: parseFloat('10980.00'),
	},
	{
		date: '16 Jul',
		workingFiat: parseFloat('12970.00'),
	},
	{
		date: '22 Jun',
		workingFiat: parseFloat('14510.00'),
	},
	{
		date: '04 Jun',
		workingFiat: parseFloat('16000.00'),
	},
	{
		date: '04 Jun',
		workingFiat: parseFloat('17490.00'),
	},
	{
		date: '18 May',
		workingFiat: parseFloat('18530.00'),
	},
	{
		date: '03 May',
		workingFiat: parseFloat('20020.00'),
	},
	{
		date: '18 Mar',
		workingFiat: parseFloat('26030.00'),
	},
	{
		date: '01 Mar',
		workingFiat: parseFloat('27020.00'),
	},
	{
		date: '23 Nov',
		workingFiat: parseFloat('29030.00'),
	},
	{
		date: '04 Sep',
		workingFiat: parseFloat('30040.00'),
	},
	{
		date: '18 Aug',
		workingFiat: parseFloat('32530.00'),
	},
	{
		date: '11 Aug',
		workingFiat: parseFloat('35520.00'),
	},
	{
		date: '10 Aug',
		workingFiat: parseFloat('35610.00'),
	},
	{
		date: '20 Jul',
		workingFiat: parseFloat('49620.00'),
	},
	{
		date: '15 Jul',
		workingFiat: parseFloat('51630.00'),
	},
	{
		date: '14 Jul',
		workingFiat: parseFloat('57640.00'),
	},
	{
		date: '03 Jul',
		workingFiat: parseFloat('59650.00'),
	},
	{
		date: '01 Jul',
		workingFiat: parseFloat('61640.00'),
	},
	{
		date: '01 Jul',
		workingFiat: parseFloat('63650.00'),
	},
	{
		date: '29 Jun',
		workingFiat: parseFloat('65640.00'),
	},
	{
		date: '11 May',
		workingFiat: parseFloat('60850.00'),
	},
	{
		date: '11 May',
		workingFiat: parseFloat('60750.00'),
	},
];

console.log(data);

const CryptoPriceChart = () => {
	const { classes } = useStyles();

	return (
		<Paper className={classes.cryptoPriceChartContainer}>
			<Box className={classes.headerContainer}></Box>
			<Box className={classes.priceChartContainer}>
				<PriceChart data={data} />
			</Box>
		</Paper>
	);
};

export default CryptoPriceChart;
