import { Status } from '../enums';
import { apolloClient } from '../../services/apollo';
import { IExchange } from '../../interfaces';
import { FIND_ALL } from '../../queries/exchanges';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const enum Model {
	EXCHANGES = 'exchanges',
}

interface Transaction {
	exchanges: IExchange[];
	status: string;
	error: null | string;
}

interface State {
	exchanges: Transaction;
}

// Export Thunks
// ---------------
export const fetchExchanges = createAsyncThunk(
	'exchanges/fetchExchanges',
	async () => {
		const { data } = await apolloClient.query({
			query: FIND_ALL,
			variables: {
				findAllExchangesInput: {},
			},
		});

		const { findAllExchanges } = data;

		return findAllExchanges;
	}
);

export const exchangesSlice = createSlice({
	name: Model.EXCHANGES,
	initialState: {
		exchanges: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchExchanges.pending, (state) => {
			state.status = Status.Loading;
		});

		builder.addCase(fetchExchanges.fulfilled, (state, { payload }) => {
			state.status = Status.Succeeded;
			state.exchanges = payload;
		});

		builder.addCase(fetchExchanges.rejected, (state) => {
			state.status = Status.Failed;
		});
	},
});

const { reducer } = exchangesSlice;

// // Export Selectors
// // ------------------
const selectExchanges = (state: State) => {
	return state.exchanges.exchanges;
};

const selectExchangesStatus = (state: State) => {
	return state.exchanges.status;
};

const selectExchangesError = (state: State) => {
	return state.exchanges.error;
};

export { selectExchanges, selectExchangesStatus, selectExchangesError };

// Export Reducer
// ------------------
export default reducer;
