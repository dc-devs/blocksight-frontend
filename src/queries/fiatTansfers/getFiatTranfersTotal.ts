import { gql } from '@apollo/client';

const GET_FIAT_TRANSFERS_TOTALS = gql`
	query Query($userId: Int!) {
		getFiatTransferTotals(userId: $userId) {
			totalDeposited
			totalWorking
			totalWithdrawn
		}
	}
`;

export default GET_FIAT_TRANSFERS_TOTALS;
