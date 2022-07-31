import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTokenBalances from '../../services/backend/getTokenBalances';
import TokenBalancesResponse from '../../interfaces/ITokenBalancesResponse';
import GetTokenBalancesProps from '../../interfaces/getTokenBalancePropsInterface';

interface Transaction {
	tokenBalances: TokenBalancesResponse;
	status: string;
	error: null | string;
}

interface State {
	tokenBalances: Transaction;
}

// Export Thunks
// ---------------
export const fetchTokenBalances = createAsyncThunk(
	'tokenBalances/fetchTokenBalances',
	async ({ address, filter }: GetTokenBalancesProps) => {
		const tokenBalances = await getTokenBalances({ address, filter });

		return tokenBalances;
	}
);

export const tokenBalancesSlice = createSlice({
	name: 'tokenBalances',
	initialState: {
		tokenBalances: {},
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTokenBalances.pending, (state, action) => {
			state.status = 'loading';
		});

		builder.addCase(fetchTokenBalances.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.tokenBalances = action.payload;
		});

		builder.addCase(fetchTokenBalances.rejected, (state, action) => {
			state.status = 'failed';
		});
	},
});

const { reducer } = tokenBalancesSlice;

// Export Selectors
// ------------------
const selectTokenBalances = (state: State) => {
	return state.tokenBalances.tokenBalances;
};

const selectTokenBalancesStatus = (state: State) => {
	return state.tokenBalances.status;
};

const selectTokenBalancesError = (state: State) => {
	return state.tokenBalances.error;
};

export {
	selectTokenBalances,
	selectTokenBalancesStatus,
	selectTokenBalancesError,
};

// Export Reducer
// ------------------
export default reducer;
