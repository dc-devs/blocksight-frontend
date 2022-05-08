import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTotalWithdrawls from '../../services/backend/getTotalWithdrawls';
import TokenWithdrawlsResponse from '../../interfaces/totalWithdrawlsResponseInterface';

interface Transaction {
	totalWithdrawls: TokenWithdrawlsResponse;
	status: string;
	error: null | string;
}

interface State {
	totalWithdrawls: Transaction;
}

// Export Thunks
// ---------------
export const fetchTotalWithdrawls = createAsyncThunk(
	'totalWithdrawls/fetchTotalWithdrawls',
	async () => {
		const totalWithdrawls = await getTotalWithdrawls();

		return totalWithdrawls;
	}
);

export const totalWithdrawlsSlice = createSlice({
	name: 'totalWithdrawls',
	initialState: {
		totalWithdrawls: {},
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTotalWithdrawls.pending, (state, action) => {
			state.status = 'loading';
		});

		builder.addCase(fetchTotalWithdrawls.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.totalWithdrawls = action.payload;
		});

		builder.addCase(fetchTotalWithdrawls.rejected, (state, action) => {
			state.status = 'failed';
		});
	},
});

const { reducer } = totalWithdrawlsSlice;

// Export Selectors
// ------------------
const selectTotalWithdrawls = (state: State) => {
	return state.totalWithdrawls.totalWithdrawls;
};

const selectTotalWithdrawlsStatus = (state: State) => {
	return state.totalWithdrawls.status;
};

const selectTotalWithdrawlsError = (state: State) => {
	return state.totalWithdrawls.error;
};

export {
	selectTotalWithdrawls,
	selectTotalWithdrawlsStatus,
	selectTotalWithdrawlsError,
};

// Export Reducer
// ------------------
export default reducer;
