import { Status } from '../enums';
import { apolloClient } from '../../services/apollo';
import { IFiatTransfersTotals } from '../../interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_FIAT_TRANSFERS_TOTALS } from '../../queries/fiatTansfers';

const enum Model {
	FiatTransfersTotals = 'fiatTransfersTotals',
}

interface Transaction {
	status: string;
	error: null | string;
	fiatTransfersTotals: IFiatTransfersTotals;
}

interface State {
	fiatTransfersTotals: Transaction;
}

// Export Thunks
// ---------------
interface IFetchFiatTransfersTotalsOptions {
	userId: number;
}

export const fetchFiatTransfersTotals = createAsyncThunk(
	`${Model.FiatTransfersTotals}/fetchFiatTransfersTotals`,
	async ({ userId }: IFetchFiatTransfersTotalsOptions) => {
		const { data } = await apolloClient.query({
			query: GET_FIAT_TRANSFERS_TOTALS,
			variables: {
				userId,
			},
		});

		const { getFiatTransferTotals } = data;

		return getFiatTransferTotals;
	}
);

export const fiatTransfersSlice = createSlice({
	name: Model.FiatTransfersTotals,
	initialState: {
		fiatTransfersTotals: {} as IFiatTransfersTotals,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFiatTransfersTotals.pending, (state) => {
			state.status = Status.Loading;
		});

		builder.addCase(
			fetchFiatTransfersTotals.fulfilled,
			(state, { payload }) => {
				state.status = Status.Succeeded;
				state.fiatTransfersTotals = payload;
			}
		);

		builder.addCase(fetchFiatTransfersTotals.rejected, (state) => {
			state.status = Status.Failed;
		});
	},
});

const { reducer } = fiatTransfersSlice;

// // Export Selectors
// // ------------------
const selectFiatTransfersTotals = (state: State) => {
	return state.fiatTransfersTotals.fiatTransfersTotals;
};

const selectFiatTransfersTotalsStatus = (state: State) => {
	return state.fiatTransfersTotals.status;
};

const selectFiatTransfersTotalsError = (state: State) => {
	return state.fiatTransfersTotals.error;
};

export {
	selectFiatTransfersTotals,
	selectFiatTransfersTotalsStatus,
	selectFiatTransfersTotalsError,
};

// Export Reducer
// ------------------
export default reducer;
