import { IWallet } from '../../interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getMetaMaskWallet from '../../sdks/metamask/getMetamaskWallet';
interface MetaMask {
	status: string;
	error: null | string;
	wallet: IWallet;
}

interface State {
	metaMask: MetaMask;
}

// Export Thunks
// ---------------
export const fetchMetaMaskWallet = createAsyncThunk(
	'metaMask/fetchMetaMaskWallet',
	async () => {
		return await getMetaMaskWallet();
	}
);

export const metaMaskSlice = createSlice({
	name: 'metaMask',
	initialState: {
		error: null,
		status: 'idle',
		wallet: {},
	},
	reducers: {
		updateMetaMaskWallet: (state: any, { payload }: any) => {
			state.wallet = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMetaMaskWallet.pending, (state) => {
			state.status = 'loading';
		});

		builder.addCase(fetchMetaMaskWallet.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.wallet = action.payload;
		});

		builder.addCase(fetchMetaMaskWallet.rejected, (state) => {
			state.status = 'failed';
		});
	},
});

const { reducer, actions } = metaMaskSlice;

// Export Actions
// ------------------
export const { updateMetaMaskWallet } = actions;

// Export Selectors
// ------------------
const selectMetaMaskWallet = (state: State) => {
	return state.metaMask.wallet;
};

export { selectMetaMaskWallet };

// Export Reducer
// ------------------
export default reducer;
