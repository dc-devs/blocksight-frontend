import { Status } from '../enums';
import { IUsersExchange } from '../../interfaces';
import { apolloClient } from '../../services/apollo';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FIND_ALL, DELETE, CREATE } from '../../queries/usersExchanges';

// TODO: LEFT OFF
// Perhaps moving forward, hard sync only hard syncs userExchange/User combo,
// and not all
//

const enum Model {
	USERS_EXCHANGES = 'usersExchanges',
}

interface Transaction {
	usersExchanges: IUsersExchange[];
	status: string;
	type: string;
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

export const createUsersExchanges = createAsyncThunk(
	'usersExchanges/createUsersExchange',
	async ({ createUsersExchangesInput }: any) => {
		const { data } = await apolloClient.mutate({
			mutation: CREATE,
			variables: {
				createUsersExchangesInput,
			},
		});

		const { createUsersExchanges } = data;

		return createUsersExchanges;
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
		usersExchanges: [] as IUsersExchange[],
		status: 'idle',
		type: '',
		error: null,
	},
	reducers: {
		resetType: (state) => {
			state.type = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsersExchanges.pending, (state, { type }) => {
			state.type = type;
			state.status = Status.Loading;
		});

		builder.addCase(
			fetchUsersExchanges.fulfilled,
			(state, { payload, type }) => {
				state.type = type;
				state.status = Status.Succeeded;
				state.usersExchanges = payload;
			}
		);

		builder.addCase(fetchUsersExchanges.rejected, (state, { type }) => {
			state.type = type;
			state.status = Status.Failed;
		});

		builder.addCase(deleteUsersExchanges.pending, (state, { type }) => {
			state.type = type;
			state.status = Status.Loading;
		});

		builder.addCase(
			deleteUsersExchanges.fulfilled,
			(state, { payload, type }) => {
				const { id } = payload;

				const filteredUsersExchanges = state.usersExchanges.filter(
					(usersExchange) => {
						return id !== usersExchange['id'];
					}
				);

				state.type = type;
				state.status = Status.Succeeded;
				state.usersExchanges = filteredUsersExchanges;
			}
		);

		builder.addCase(deleteUsersExchanges.rejected, (state, { type }) => {
			state.type = type;
			state.status = Status.Failed;
		});

		builder.addCase(createUsersExchanges.pending, (state, { type }) => {
			state.type = type;
			state.status = Status.Loading;
		});

		builder.addCase(createUsersExchanges.fulfilled, (state, action) => {
			const { payload, type } = action;
			const createdUsersExchange = payload as IUsersExchange;

			state.type = type;
			state.status = Status.Succeeded;
			state.usersExchanges = [
				...state.usersExchanges,
				createdUsersExchange,
			];
		});

		builder.addCase(createUsersExchanges.rejected, (state, { type }) => {
			state.type = type;
			state.status = Status.Failed;
		});
	},
});

const { reducer, actions } = usersExchangesSlice;

export const { resetType } = actions;

// // Export Selectors
// // ------------------
const selectUsersExchanges = (state: State) => {
	return state.usersExchanges.usersExchanges;
};

const selectUsersExchangesStatus = (state: State) => {
	return state.usersExchanges.status;
};

const selectUsersExchangesType = (state: State) => {
	return state.usersExchanges.type;
};

const selectUsersExchangesError = (state: State) => {
	return state.usersExchanges.error;
};

export {
	selectUsersExchanges,
	selectUsersExchangesType,
	selectUsersExchangesStatus,
	selectUsersExchangesError,
};

// Export Reducer
// ------------------
export default reducer;
