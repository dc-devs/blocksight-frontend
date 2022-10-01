import { Status } from '../enums';
import { apolloClient } from '../../services/apollo';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IFiatTransfer } from '../../interfaces';
import { FIND_ALL_FIAT_TRANSFERS } from '../../queries/fiatTansfers';

const enum Model {
	FiatTransfers = 'fiatTransfers',
}

interface Transaction {
	status: string;
	error: null | string;
	fiatTransfers: IFiatTransfer[];
}

interface State {
	fiatTransfers: Transaction;
}

// Export Thunks
// ---------------
export const fetchFiatTransfers = createAsyncThunk(
	`${Model.FiatTransfers}/fetchFiatTransfers`,
	async () => {
		const { data } = await apolloClient.query({
			query: FIND_ALL_FIAT_TRANSFERS,
			variables: {
				findAllFiatTransfersInput: {},
			},
		});

		const { findAllFiatTransfers } = data;

		return findAllFiatTransfers;
	}
);

export const fiatTransfersSlice = createSlice({
	name: Model.FiatTransfers,
	initialState: {
		fiatTransfers: [] as IFiatTransfer[],
		fiatTransfersTotals: {},
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFiatTransfers.pending, (state) => {
			state.status = Status.Loading;
		});

		builder.addCase(fetchFiatTransfers.fulfilled, (state, { payload }) => {
			state.status = Status.Succeeded;
			state.fiatTransfers = payload;
		});

		builder.addCase(fetchFiatTransfers.rejected, (state) => {
			state.status = Status.Failed;
		});
	},
});

const { reducer } = fiatTransfersSlice;

// // Export Selectors
// // ------------------
const selectFiatTransfers = (state: State) => {
	return state.fiatTransfers.fiatTransfers;
};

const selectFiatTransfersStatus = (state: State) => {
	return state.fiatTransfers.status;
};

const selectFiatTransfersError = (state: State) => {
	return state.fiatTransfers.error;
};

export {
	selectFiatTransfers,
	selectFiatTransfersStatus,
	selectFiatTransfersError,
};

// Export Reducer
// ------------------
export default reducer;
