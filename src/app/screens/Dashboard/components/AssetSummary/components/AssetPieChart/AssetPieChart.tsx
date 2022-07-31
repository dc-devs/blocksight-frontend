import { useState } from 'react';
import numeral from 'numeral';
import Paper from '@mui/material/Paper';
import LegendComponent from './Legend';
import pieChartColors from './pieChartColors';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import generateSeriesData from './GenerateSeriesData';
import { Pie, Cell, Label, Sector, Legend, PieChart } from 'recharts';
import TokenBalance from '../../../../../../../interfaces/ITokenBalance';

const useStyles = makeStyles()((theme) => ({
	allocationPieChartContainer: {
		paddingTop: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(6),
		borderRadius: '10px',
		overflowY: 'scroll',
	},
	allocationPieChartHeader: {
		fontSize: '1.2rem',
	},
	allocationPieChart: {
		display: 'flex',
		justifyContent: 'center',
	},
	pieChart: {
		cursor: 'pointer',
		'& .recharts-legend-wrapper': {
			top: '310px !important',
		},
	},
	label: {
		fontSize: '1.5rem',
		color: theme.palette.primary.main,
		fill: theme.palette.primary.main,
	},
}));

interface Props {
	totalValue: string;
	tokenBalances: TokenBalance[];
}

const AssetPieChart = ({ totalValue, tokenBalances }: Props) => {
	const { classes } = useStyles();
	const seriesData = generateSeriesData({ tokenBalances });
	const [index, setIndex] = useState(-1);

	const onPieEnter = (_: any, index: number) => {
		setIndex(index);
	};

	const onPieLeave = () => {
		setIndex(-1);
	};

	const cellComponents = seriesData.map((entry, index) => {
		return <Cell key={`cell-${index}`} fill={pieChartColors[index]} />;
	});

	const renderActiveShape = (props: any) => {
		const {
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
			payload,
		} = props;

		const tokenAssetValue = numeral(payload.value).format('$0,000');
		const tokenAssetSymbol = payload.name;

		return (
			<g>
				<text
					x={cx}
					y={cy - 17}
					dy={8}
					textAnchor="middle"
					fill={fill}
					className={classes.label}
				>
					{tokenAssetSymbol}
				</text>
				<text
					x={cx}
					y={cy + 17}
					dy={8}
					textAnchor="middle"
					fill={fill}
					className={classes.label}
				>
					{tokenAssetValue}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					cornerRadius={100}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					cornerRadius={100}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
			</g>
		);
	};

	return (
		<Paper elevation={2} className={classes.allocationPieChartContainer}>
			<Typography className={classes.allocationPieChartHeader}>
				Allocations
			</Typography>
			<div className={classes.allocationPieChart}>
				<PieChart width={350} height={390} className={classes.pieChart}>
					<Pie
						cy={140}
						cursor="pointer"
						activeIndex={index}
						onMouseEnter={onPieEnter}
						onMouseLeave={onPieLeave}
						activeShape={renderActiveShape}
						data={seriesData}
						innerRadius={120}
						outerRadius={130}
						paddingAngle={0}
						cornerRadius={100}
						dataKey="value"
						className={classes.pieChart}
					>
						{cellComponents}

						{index === -1 ? (
							<Label
								width={30}
								position="center"
								className={classes.label}
							>
								{totalValue}
							</Label>
						) : (
							''
						)}
					</Pie>
					<Legend content={LegendComponent} />
				</PieChart>
			</div>
		</Paper>
	);
};

export default AssetPieChart;
