import { Status } from '../enums';
import { apolloClient } from '../../services/apollo';
import { IUsersExchanges } from '../../interfaces';
import { FIND_ALL } from '../../queries/usersExchanges';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const enum Model {
	USERS_EXCHANGES = 'usersExchanges',
}

interface Transaction {
	usersExchanges: IUsersExchanges[];
	status: string;
	error: null | string;
}

interface State {
	usersExchanges: Transaction;
}

// Export Thunks
// ---------------
export const fetchUsersExchanges = createAsyncThunk(
	'usersExchanges/fetchUsersExchanges',
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

export const usersExchangesSlice = createSlice({
	name: Model.USERS_EXCHANGES,
	initialState: {
		usersExchanges: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsersExchanges.pending, (state) => {
			state.status = Status.LOADING;
		});

		builder.addCase(fetchUsersExchanges.fulfilled, (state, { payload }) => {
			state.status = Status.SUCCEEDED;
			state.usersExchanges = payload;
		});

		builder.addCase(fetchUsersExchanges.rejected, (state) => {
			state.status = Status.FAILED;
		});
	},
});

const { reducer } = usersExchangesSlice;

// // Export Selectors
// // ------------------
const selectUsersExchanges = (state: State) => {
	return state.usersExchanges.usersExchanges;
};

const selectUsersExchangesStatus = (state: State) => {
	return state.usersExchanges.status;
};

const selectUsersExchangesError = (state: State) => {
	return state.usersExchanges.error;
};

export {
	selectUsersExchanges,
	selectUsersExchangesStatus,
	selectUsersExchangesError,
};

// Export Reducer
// ------------------
export default reducer;
