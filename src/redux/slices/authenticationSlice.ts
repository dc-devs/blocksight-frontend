import { Status } from '../../redux';
import { IUser } from '../../interfaces';
import { apolloClient } from '../../services/apollo';
import { CURRENT_USER } from '../../queries/sessions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const enum Model {
	AUTHENTICATION = 'authentication',
	AUTHENTICATED_USER = 'authenticatedUser',
}

interface IAuthenticatedUser {
	user?: IUser;
	isAuthenticated: boolean;
}

interface Transaction {
	authentication: IAuthenticatedUser;
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
	async (): Promise<IAuthenticatedUser> => {
		const localAuthenticatedUser = localStorage.getItem(
			Model.AUTHENTICATED_USER
		);
		let authenticatedUser: IAuthenticatedUser = {
			isAuthenticated: false,
		};

		try {
			if (
				localAuthenticatedUser &&
				typeof localAuthenticatedUser === 'string'
			) {
				authenticatedUser = JSON.parse(localAuthenticatedUser);
			} else {
				const result = await apolloClient.query({
					query: CURRENT_USER,
				});

				const { data } = result;
				const { currentUser } = data;

				authenticatedUser = {
					...currentUser,
					isAuthenticated: true,
				};

				localStorage.setItem(
					Model.AUTHENTICATED_USER,
					JSON.stringify(authenticatedUser)
				);
			}
		} catch (error) {
			localStorage.removeItem(Model.AUTHENTICATED_USER);
		}

		return authenticatedUser;
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
			const authenticatedUser = {
				...payload,
				isAuthenticated: true,
			};

			state.authentication = authenticatedUser;
			state.status = Status.SUCCEEDED;

			localStorage.setItem(
				Model.AUTHENTICATED_USER,
				JSON.stringify(authenticatedUser)
			);
		},
		revokeAuthentication: (state: any) => {
			const authenticatedUser = {
				isAuthenticated: false,
			};

			state.authentication = authenticatedUser;
			state.status = Status.SUCCEEDED;
			localStorage.removeItem(Model.AUTHENTICATED_USER);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthentication.pending, (state, action) => {
			state.status = Status.LOADING;
		});

		builder.addCase(fetchAuthentication.fulfilled, (state, action) => {
			state.status = Status.SUCCEEDED;
			state.authentication = action.payload;
		});

		builder.addCase(fetchAuthentication.rejected, (state, action) => {
			state.status = Status.FAILED;
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
