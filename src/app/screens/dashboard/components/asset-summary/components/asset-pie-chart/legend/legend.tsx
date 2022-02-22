import { makeStyles } from 'tss-react/mui';
import LegendColumn from './legend-column';
import splitArrayInTwo from '../../../../../../../../utils/split-array-in-two';
import getLegendItemsData from './get-legend-items-data';

const useStyles = makeStyles()(() => ({
	legendContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	legendColumnContainer: {},
}));

const Legend = (legendPayload: any) => {
	const { classes } = useStyles();
	const legendItemsData = getLegendItemsData(legendPayload);

	const legendItemsDataHalves = splitArrayInTwo(legendItemsData);

	return (
		<div className={classes.legendContainer}>
			<div className={classes.legendColumnContainer}>
				<LegendColumn
					legendItemsDatas={legendItemsDataHalves.firstHalf}
				/>
			</div>
			<div className={classes.legendColumnContainer}>
				<LegendColumn
					legendItemsDatas={legendItemsDataHalves.secondHalf}
				/>
			</div>
		</div>
	);
};

export default Legend;
