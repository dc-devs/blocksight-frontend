import { IProvider } from '../../sdks/metamask/interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getMetaMaskProvider from '../../sdks/metamask/getMetamaskProvider';
interface MetaMask {
	status: string;
	error: null | string;
	provider: IProvider;
}

interface State {
	metaMask: MetaMask;
}

// Export Thunks
// ---------------
export const fetchMetaMaskProvider = createAsyncThunk(
	'metaMask/fetchMetaMaskProvider',
	async () => {
		return await getMetaMaskProvider();
	}
);

export const metaMaskSlice = createSlice({
	name: 'metaMask',
	initialState: {
		error: null,
		status: 'idle',
		provider: {},
	},
	reducers: {
		updateMetaMaskProvider: (state: any, { payload }: any) => {
			state.provider = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMetaMaskProvider.pending, (state) => {
			state.status = 'loading';
		});

		builder.addCase(fetchMetaMaskProvider.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.provider = action.payload;
		});

		builder.addCase(fetchMetaMaskProvider.rejected, (state) => {
			state.status = 'failed';
		});
	},
});

const { reducer, actions } = metaMaskSlice;

// Export Actions
// ------------------
export const { updateMetaMaskProvider } = actions;

// Export Selectors
// ------------------
const selectMetaMaskProvider = (state: State) => {
	return state.metaMask.provider;
};

export { selectMetaMaskProvider };

// Export Reducer
// ------------------
export default reducer;
