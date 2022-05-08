import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DollarSummary from '../DollarSummary';
import { useAppDispatch } from '../../../../../../hooks';
import {
	fetchTotalWithdrawls,
	selectTotalWithdrawls,
	selectTotalWithdrawlsStatus,
	// selectTotalWithdrawlsError,
} from '../../../../../../redux/slices/totalWithdrawlsSlice';

const DollarSummaryDeposits = () => {
	const appDispatch = useAppDispatch();
	const totalWithdrawls = useSelector(selectTotalWithdrawls);
	const totalWithdrawlsStatus = useSelector(selectTotalWithdrawlsStatus);
	// const totalWithdrawlsError = useSelector(selectTotalWithdrawlsError);

	// GET Token Balances
	useEffect(() => {
		if (totalWithdrawlsStatus === 'idle') {
			appDispatch(fetchTotalWithdrawls());
		}
	}, [totalWithdrawlsStatus, appDispatch]);

	const { formatted } = totalWithdrawls;

	return (
		<DollarSummary title="Fiat Withdrawn" amount={formatted || '$0.00'} />
	);
};

export default DollarSummaryDeposits;
