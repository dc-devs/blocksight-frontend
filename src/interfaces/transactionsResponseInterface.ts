import Transaction from './transactionInterface';

interface TransactionsResponse {
	percentSupported: number;
	supportedTransactions: Transaction[];
	nonSupportedTransactions: any[];
}

export default TransactionsResponse;
