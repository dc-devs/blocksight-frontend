import numeral from 'numeral';
import { useEffect } from 'react';
import BigNumber from 'bignumber.js';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import DollarSummary from './DollarSummary';
import { Status } from '../../../../../redux/enums';
import { useAppDispatch } from '../../../../../hooks';
// import {
// 	fetchTotalDeposits,
// 	selectTotalDeposits,
// 	selectTotalDepositsStatus,
// 	selectTotalDepositsError,
// } from '../../../../../redux/slices/totalDepositsSlice';
import {
	fetchFiatTransfersTotals,
	selectFiatTransfersTotals,
	selectFiatTransfersTotalsStatus,
} from '../../../../../redux/slices/fiatTransfersTotalsSlice';

const useStyles = makeStyles()(() => ({
	assetDollarSummaryContainer: {},
}));

interface IValue {
	value: string;
	formatted: string;
}

interface IProps {
	totalValue: IValue;
}

const AssetDollarSummary = ({ totalValue }: IProps) => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
	// const totalDeposits = useSelector(selectTotalDeposits);
	// const totalDepositsStatus = useSelector(selectTotalDepositsStatus);
	// const totalDepositsError = useSelector(selectTotalDepositsError);

	// GET Token Balances
	// useEffect(() => {
	// 	if (totalDepositsStatus === 'idle') {
	// 		appDispatch(fetchTotalDeposits());
	// 	}
	// }, [totalDepositsStatus, appDispatch]);

	// const totalDepositsString = totalDeposits.string;
	// const totalDepositsFormatted = totalDeposits.formatted;

	// const totalDepositsBN = new BigNumber(totalDepositsString);
	// const cryptoAssetValueBN = new BigNumber(totalValue?.value);

	// const deltaValuePositive =
	// 	totalDepositsStatus === 'idle' || !totalDepositsFormatted
	// 		? true
	// 		: cryptoAssetValueBN.isGreaterThan(totalDepositsBN);

	// const cryptoAssetDeltaValueBN =
	// 	cryptoAssetValueBN.dividedBy(totalDepositsBN);
	// const cryptoAssetDeltaValue = numeral(
	// 	cryptoAssetDeltaValueBN.toString()
	// ).format('0,000.00%');

	const userId = 58;
	const fiatTransfersTotals = useSelector(selectFiatTransfersTotals);
	const fiatTransfersTotalsStatus = useSelector(
		selectFiatTransfersTotalsStatus
	);

	const { totalDeposited, totalWithdrawn, totalWorking } =
		fiatTransfersTotals;

	console.log('fiatTransfersTotals', fiatTransfersTotals);
	console.log('fiatTransfersTotalsStatus', fiatTransfersTotalsStatus);

	// GET FiatTransfersTotals
	useEffect(() => {
		if (userId && fiatTransfersTotalsStatus === Status.Idle) {
			dispatch(fetchFiatTransfersTotals({ userId }));
		}
	}, [userId, fiatTransfersTotalsStatus, dispatch]);

	return (
		<div className={classes.assetDollarSummaryContainer}>
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
				spacing={3}
			>
				{/* <Grid item xs>
					<DollarSummary
						title="Crypto Assets"
						amount={totalDeposited}
					/>
				</Grid> */}
				<Grid item xs>
					<DollarSummary
						title="Fiat Deposited"
						amount={totalDeposited}
					/>
				</Grid>
				<Grid item xs>
					<DollarSummary title="Working Fiat" amount={totalWorking} />
				</Grid>
				<Grid item xs>
					<DollarSummary
						title="Fiat Withdrawn"
						amount={totalWithdrawn}
					/>
				</Grid>
				{/* <Grid item xs>
					<DollarSummary
						title="Crypto Assets"
						deltaValuePositive={deltaValuePositive}
						deltaValue={cryptoAssetDeltaValue}
						amount={totalValue?.formatted}
					/>
				</Grid>
				<Grid item xs>
					<DollarSummary title="Fiat Withdrawn" amount={'$0.00'} />
				</Grid> */}
			</Grid>
		</div>
	);
};

export default AssetDollarSummary;
