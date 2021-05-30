import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TokenBalances from './components/token-balances';
import AssetPieChart from './components/asset-pie-chart';
import TokenBalance from '../../../../../interfaces/token-balance-interface';

const useStyles = makeStyles(() => ({
	assetSummaryContainer: {
		marginTop: '20px',
	},
	assetSummaryItemContainer: {
		display: 'flex',
		flexDirection: 'column',
		height: '478px',
	},
}));

interface Props {
	totalValue: string;
	tokenBalances: TokenBalance[];
}

const AssetDolllarSummary = ({ totalValue, tokenBalances }: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.assetSummaryContainer}>
			<Grid
				container
				direction="row"
				justify="flex-start"
				alignItems="flex-start"
				spacing={3}
			>
				<Grid item xs={5}>
					<div className={classes.assetSummaryItemContainer}>
						<AssetPieChart
							totalValue={totalValue}
							tokenBalances={tokenBalances}
						/>
					</div>
				</Grid>
				<Grid item xs={7}>
					<TokenBalances tokenBalances={tokenBalances} />
				</Grid>
			</Grid>
		</div>
	);
};

export default AssetDolllarSummary;