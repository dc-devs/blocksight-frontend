import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';
import TokenBalances from './components/TokenBalances';
import AssetPieChart from './components/AssetPieChart';
import { ITokenBalance, INetwork } from '../../../../../interfaces';

const useStyles = makeStyles()(() => ({
	assetSummaryContainer: {
		marginTop: '50px',
	},
	assetSummaryItemContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
}));

interface Props {
	totalValue: string;
	networks: INetwork[];
	tokenBalances: ITokenBalance[];
}

const AssetDolllarSummary = ({ networks, totalValue, tokenBalances }: Props) => {
	const { classes } = useStyles();

	return (
		<div className={classes.assetSummaryContainer}>
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
				spacing={3}
			>
				<Grid item xs={4}>
					<div className={classes.assetSummaryItemContainer}>
						<AssetPieChart
							totalValue={totalValue}
							tokenBalances={tokenBalances}
						/>
					</div>
				</Grid>
				<Grid item xs={8}>
					<TokenBalances
						networks={networks}
						tokenBalances={tokenBalances}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default AssetDolllarSummary;
