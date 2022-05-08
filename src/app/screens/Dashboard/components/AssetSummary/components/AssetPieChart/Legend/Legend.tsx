import { makeStyles } from 'tss-react/mui';
import LegendColumn from './LegendColumn';
import splitArrayInTwo from '../../../../../../../../utils/splitArrayInTwo';
import getLegendItemsData from './getLegendItemsData';

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
