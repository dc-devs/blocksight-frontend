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

const useStyles = makeStyles()((theme) => ({
	assetDollarSummaryContainer: {},
	secondRow: {
		marginTop: theme.spacing(2),
	},
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

	const cryptAssetValue = totalValue?.formatted
		? `$${totalValue?.formatted}`
		: '';

	return (
		<div className={classes.assetDollarSummaryContainer}>
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
				spacing={3}
			>
				<Grid item xs>
					<DollarSummary
						title="Fiat Deposited"
						amount={totalDeposited?.formatted || ''}
					/>
				</Grid>
				<Grid item xs>
					<DollarSummary
						title="Working Fiat"
						amount={totalWorking?.formatted || ''}
					/>
				</Grid>
				<Grid item xs>
					<DollarSummary
						title="Fiat Withdrawn"
						amount={totalWithdrawn?.formatted || ''}
					/>
				</Grid>
			</Grid>
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
				spacing={3}
				className={classes.secondRow}
			>
				<Grid item xs>
					<DollarSummary
						title="Crypto Assets"
						amount={cryptAssetValue}
					/>
				</Grid>
				<Grid item xs>
					<DollarSummary title="Cost Basis" amount={`$00.00`} />
				</Grid>
				<Grid item xs>
					<DollarSummary title="Unrealized Gains" amount={`$00.00`} />
				</Grid>
				<Grid item xs>
					<DollarSummary title="Realized Gains" amount={`$00.00`} />
				</Grid>
			</Grid>
		</div>
	);
};

export default AssetDollarSummary;
