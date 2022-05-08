import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTotalDeposits from '../../services/backend/getTotalDeposits';
import TokenDepositsResponse from '../../interfaces/totalDepositsResponseInterface';

interface Transaction {
	totalDeposits: TokenDepositsResponse;
	status: string;
	error: null | string;
}

interface State {
	totalDeposits: Transaction;
}

// Export Thunks
// ---------------
export const fetchTotalDeposits = createAsyncThunk(
	'totalDeposits/fetchTotalDeposits',
	async () => {
		const totalDeposits = await getTotalDeposits();

		return totalDeposits;
	}
);

export const totalDepositsSlice = createSlice({
	name: 'totalDeposits',
	initialState: {
		totalDeposits: {},
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTotalDeposits.pending, (state, action) => {
			state.status = 'loading';
		});

		builder.addCase(fetchTotalDeposits.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.totalDeposits = action.payload;
		});

		builder.addCase(fetchTotalDeposits.rejected, (state, action) => {
			state.status = 'failed';
		});
	},
});

const { reducer } = totalDepositsSlice;

// Export Selectors
// ------------------
const selectTotalDeposits = (state: State) => {
	return state.totalDeposits.totalDeposits;
};

const selectTotalDepositsStatus = (state: State) => {
	return state.totalDeposits.status;
};

const selectTotalDepositsError = (state: State) => {
	return state.totalDeposits.error;
};

export {
	selectTotalDeposits,
	selectTotalDepositsStatus,
	selectTotalDepositsError,
};

// Export Reducer
// ------------------
export default reducer;
