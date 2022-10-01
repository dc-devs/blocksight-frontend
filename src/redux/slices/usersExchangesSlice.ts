import { Status } from '../enums';
import { IUsersExchange } from '../../interfaces';
import { apolloClient } from '../../services/apollo';
import { FIND_ALL, DELETE } from '../../queries/usersExchanges';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// TODO: LEFT OFF
// Create new Exchange should be a thunk
// Ensure that after create new exhchange it clears form a displays
// list of exchanges
//
// Perhaps moving forward, hard sync only hard syncs userExchange/User combo,
// and not all
//

const enum Model {
	USERS_EXCHANGES = 'usersExchanges',
}

interface Transaction {
	usersExchanges: IUsersExchange[];
	status: string;
	error: null | string;
}

interface State {
	usersExchanges: Transaction;
}

interface IFetchProps {
	userId: number;
}

// Export Thunks
// ---------------
export const fetchUsersExchanges = createAsyncThunk(
	'usersExchanges/fetchUsersExchanges',
	async ({ userId }: IFetchProps) => {
		const { data } = await apolloClient.query({
			query: FIND_ALL,
			variables: {
				findAllUsersExchangesInput: {
					where: {
						userId,
					},
				},
			},
		});

		const { findAllUsersExchanges } = data;

		return findAllUsersExchanges;
	}
);

interface IDeleteProps {
	usersExchangeId: number;
}

export const deleteUsersExchanges = createAsyncThunk(
	'usersExchanges/deleteUsersExchange',
	async ({ usersExchangeId }: IDeleteProps) => {
		const { data } = await apolloClient.mutate({
			mutation: DELETE,
			variables: {
				deleteUsersExchangesId: usersExchangeId,
			},
		});

		const { deleteUsersExchanges } = data;

		return { id: deleteUsersExchanges.id };
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

		builder.addCase(deleteUsersExchanges.pending, (state) => {
			console.log('deleteUsersExchanges', Status.LOADING);
			state.status = Status.LOADING;
		});

		builder.addCase(
			deleteUsersExchanges.fulfilled,
			(state, { payload }) => {
				console.log('deleteUsersExchanges', Status.SUCCEEDED);
				state.status = Status.SUCCEEDED;
				const { id } = payload;

				const filteredUsersExchanges = state.usersExchanges.filter(
					(usersExchange) => {
						return id !== usersExchange['id'];
					}
				);

				state.usersExchanges = filteredUsersExchanges;
			}
		);

		builder.addCase(deleteUsersExchanges.rejected, (state) => {
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
