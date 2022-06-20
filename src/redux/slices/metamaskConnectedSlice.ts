import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIsMetaMaskConnected } from '../../sdks/metamask';

interface IsConnected {
	status: string;
	error: null | string;
	isConnected: boolean;
}

interface State {
	metaMaskConnected: IsConnected;
}

// Export Thunks
// ---------------
export const fetchIsMetaMaskConnected = createAsyncThunk(
	'metaMaskConnected/fetchIsMetaMaskConnected',
	async () => {
		return await getIsMetaMaskConnected();
	}
);

export const metaMaskConnected = createSlice({
	name: 'metaMaskConnected',
	initialState: {
		error: null,
		status: 'idle',
		isConnected: false,
	},
	reducers: {
		updateIsMetaMaskConnected: (state: any, { payload }: any) => {
			state.isConnected = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchIsMetaMaskConnected.pending, (state) => {
			state.status = 'loading';
		});

		builder.addCase(fetchIsMetaMaskConnected.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.isConnected = action.payload;
		});

		builder.addCase(fetchIsMetaMaskConnected.rejected, (state) => {
			state.status = 'failed';
		});
	},
});

const { reducer, actions } = metaMaskConnected;

// Export Actions
// ------------------
export const { updateIsMetaMaskConnected } = actions;

// Export Selectors
// ------------------
const selectIsMetaMaskConnected = (state: State) => {
	return state.metaMaskConnected.isConnected;
};

const selectIsMetaMaskConnectedStatus = (state: State) => {
	return state.metaMaskConnected.status;
};

const selectIsMetaMaskConnectedError = (state: State) => {
	return state.metaMaskConnected.error;
};

export {
	selectIsMetaMaskConnected,
	selectIsMetaMaskConnectedError,
	selectIsMetaMaskConnectedStatus,
};

// Export Reducer
// ------------------
export default reducer;
