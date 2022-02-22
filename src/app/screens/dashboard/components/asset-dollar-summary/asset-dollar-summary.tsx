import numeral from 'numeral';
import { useEffect } from 'react';
import BigNumber from 'bignumber.js';
import Grid from '@material-ui/core/Grid';
import DollarSummary from './dollar-summary';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchTotalDeposits,
	selectTotalDeposits,
	selectTotalDepositsStatus,
	selectTotalDepositsError,
} from '../../../../../redux/slices/total-deposits-slice';

const useStyles = makeStyles(() => ({
	assetDollarSummaryContainer: {},
}));

interface TotalValue {
	string: string;
	formatted: string;
}

interface Props {
	totalValue: TotalValue;
}

const AssetDollarSummary = ({ totalValue }: Props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const totalDeposits = useSelector(selectTotalDeposits);
	const totalDepositsStatus = useSelector(selectTotalDepositsStatus);
	const totalDepositsError = useSelector(selectTotalDepositsError);

	// GET Token Balances
	useEffect(() => {
		if (totalDepositsStatus === 'idle') {
			dispatch(fetchTotalDeposits());
		}
	}, [totalDepositsStatus, dispatch]);

	const totalDepositsString = totalDeposits.string;
	const totalDepositsFormatted = totalDeposits.formatted;

	const totalDepositsBN = new BigNumber(totalDepositsString);
	const cryptoAssetValueBN = new BigNumber(totalValue?.string);

	const deltaValuePositive =
		totalDepositsStatus === 'idle' || !totalDepositsFormatted
			? true
			: cryptoAssetValueBN.isGreaterThan(totalDepositsBN);

	const cryptoAssetDeltaValueBN =
		cryptoAssetValueBN.dividedBy(totalDepositsBN);
	const cryptoAssetDeltaValue = numeral(
		cryptoAssetDeltaValueBN.toString()
	).format('0,000.00%');

	return (
		<div className={classes.assetDollarSummaryContainer}>
			<Grid
				container
				direction="row"
				justify="flex-start"
				alignItems="flex-start"
				spacing={3}
			>
				<Grid item xs>
					<DollarSummary
						title="Fiat Deposited"
						amount={totalDepositsFormatted}
					/>
				</Grid>
				<Grid item xs>
					<DollarSummary
						title="Crypto Assets"
						deltaValuePositive={deltaValuePositive}
						deltaValue={cryptoAssetDeltaValue}
						amount={totalValue?.formatted}
					/>
				</Grid>
				<Grid item xs>
					<DollarSummary title="Fiat Withdrawn" amount={'$0.00'} />
				</Grid>
			</Grid>
		</div>
	);
};

export default AssetDollarSummary;
