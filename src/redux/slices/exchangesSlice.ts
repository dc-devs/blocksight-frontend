import { Status } from '../enums';
import { apolloClient } from '../../services/apollo';
import { IUsersExchanges } from '../../interfaces';
import { FIND_ALL } from '../../queries/usersExchanges';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const enum Model {
	EXCHANGES = 'exchanges',
}

interface Transaction {
	exchanges: IUsersExchanges[];
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
				findAllUsersExchangesInput: {},
			},
		});

		const { findAllUsersExchanges } = data;

		return findAllUsersExchanges;
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
			state.status = Status.LOADING;
		});

		builder.addCase(fetchExchanges.fulfilled, (state, { payload }) => {
			state.status = Status.SUCCEEDED;
			state.exchanges = payload;
		});

		builder.addCase(fetchExchanges.rejected, (state) => {
			state.status = Status.FAILED;
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
