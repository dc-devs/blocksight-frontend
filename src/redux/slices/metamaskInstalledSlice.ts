import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIsMetaMaskInstalled } from '../../services/metamask';

interface MetaMask {
	status: string;
	error: null | string;
	isInstalled: boolean;
}

interface State {
	metaMaskInstalled: MetaMask;
}

// Export Thunks
// ---------------
export const fetchIsMetaMaskInstalled = createAsyncThunk(
	'metaMaskInstalled/fetchIsMetaMaskInstalled',
	async () => {
		return await getIsMetaMaskInstalled();
	}
);

export const metaMaskInstalled = createSlice({
	name: 'metaMaskInstalled',
	initialState: {
		isInstalled: false,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchIsMetaMaskInstalled.pending, (state) => {
			state.status = 'loading';
		});

		builder.addCase(fetchIsMetaMaskInstalled.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.isInstalled = action.payload;
		});

		builder.addCase(fetchIsMetaMaskInstalled.rejected, (state) => {
			state.status = 'failed';
		});
	},
});

const { reducer } = metaMaskInstalled;

// Export Selectors
// ------------------
const selectIsMetaMaskInstalled = (state: State) => {
	return state.metaMaskInstalled.isInstalled;
};

const selectIsMetaMaskInstalledStatus = (state: State) => {
	return state.metaMaskInstalled.status;
};

const selectIsMetaMaskInstalledError = (state: State) => {
	return state.metaMaskInstalled.error;
};

export {
	selectIsMetaMaskInstalled,
	selectIsMetaMaskInstalledError,
	selectIsMetaMaskInstalledStatus,
};

// Export Reducer
// ------------------
export default reducer;
