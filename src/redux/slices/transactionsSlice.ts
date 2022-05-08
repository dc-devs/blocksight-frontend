import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTransactions from '../../services/backend/getTransactions';
import TransactionsResponse from '../../interfaces/transactionsResponseInterface';
import GetTransactionsProps from '../../interfaces/getTransactionsPropsInterface';

interface Transaction {
	transactions: TransactionsResponse;
	status: string;
	error: null | string;
}

interface State {
	transactions: Transaction;
}

// Export Thunks
// ---------------
export const fetchTransactions = createAsyncThunk(
	'transactions/fetchTransactions',
	async ({ address, filter }: GetTransactionsProps) => {
		const transactions = await getTransactions({ address, filter });

		return transactions;
	}
);

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState: {
		transactions: {},
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTransactions.pending, (state, action) => {
			state.status = 'loading';
		});

		builder.addCase(fetchTransactions.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.transactions = action.payload;
		});

		builder.addCase(fetchTransactions.rejected, (state, action) => {
			state.status = 'failed';
		});
	},
});

const { reducer } = transactionsSlice;

// Export Selectors
// ------------------
const selectTransactions = (state: State) => {
	return state.transactions.transactions;
};

const selectTransactionsStatus = (state: State) => {
	return state.transactions.status;
};

const selectTransactionsError = (state: State) => {
	return state.transactions.error;
};

export {
	selectTransactions,
	selectTransactionsStatus,
	selectTransactionsError,
};

// Export Reducer
// ------------------
export default reducer;
