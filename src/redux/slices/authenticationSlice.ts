import { Status } from '../../redux';
import { IAuthentication } from '../../interfaces';
import { apolloClient } from '../../services/apollo';
import { CURRENT_USER } from '../../queries/sessions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const enum Model {
	AUTHENTICATION = 'authentication',
}

interface Transaction {
	authentication: IAuthentication;
	status: string;
	error: null | string;
}

interface State {
	authentication: Transaction;
}

// Export Thunks
// ---------------
export const fetchAuthentication = createAsyncThunk(
	'authentication/fetchAuthentication',
	async (): Promise<IAuthentication> => {
		const localAuthentication = localStorage.getItem(Model.AUTHENTICATION);

		let authentication: IAuthentication = {
			isAuthenticated: false,
		};

		try {
			if (
				localAuthentication &&
				typeof localAuthentication === 'string'
			) {
				authentication = JSON.parse(localAuthentication);
			} else {
				const result = await apolloClient.query({
					query: CURRENT_USER,
				});

				const { data } = result;
				const { currentUser } = data;

				authentication = currentUser;

				localStorage.setItem(
					Model.AUTHENTICATION,
					JSON.stringify(authentication)
				);
			}
		} catch (error) {
			localStorage.removeItem(Model.AUTHENTICATION);
		}

		return authentication;
	}
);

export const authenticationSlice = createSlice({
	name: Model.AUTHENTICATION,
	initialState: {
		authentication: {},
		status: 'idle',
		error: null,
	},
	reducers: {
		setAuthentication: (state: any, { payload }: any) => {
			const authentication = { ...payload } as IAuthentication;

			state.authentication = authentication;
			state.status = Status.Succeeded;

			localStorage.setItem(
				Model.AUTHENTICATION,
				JSON.stringify(authentication)
			);
		},
		revokeAuthentication: (state: any) => {
			const authentication = {
				isAuthenticated: false,
			};

			state.authentication = authentication;
			state.status = Status.Succeeded;

			localStorage.removeItem(Model.AUTHENTICATION);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthentication.pending, (state, action) => {
			state.status = Status.Loading;
		});

		builder.addCase(fetchAuthentication.fulfilled, (state, action) => {
			state.status = Status.Succeeded;
			state.authentication = action.payload;
		});

		builder.addCase(fetchAuthentication.rejected, (state, action) => {
			state.status = Status.Failed;
		});
	},
});

const { reducer, actions } = authenticationSlice;

// Export Actions
// ------------------
export const { setAuthentication, revokeAuthentication } = actions;

// // Export Selectors
// // ------------------
const selectAuthentication = (state: State) => {
	return state.authentication.authentication;
};

const selectAuthenticationStatus = (state: State) => {
	return state.authentication.status;
};

const selectAuthenticationError = (state: State) => {
	return state.authentication.error;
};

export {
	selectAuthentication,
	selectAuthenticationStatus,
	selectAuthenticationError,
};

// Export Reducer
// ------------------
export default reducer;
