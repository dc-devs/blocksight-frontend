import { configureStore } from '@reduxjs/toolkit';
import metaMaskReducer from './slices/metamask-slice';
import transactionsReducer from './slices/transactions-slice';
import totalDepositsReducer from './slices/total-deposits-slice';
import tokenBalancesReducer from './slices/token-balances-slice';
import totalWithdrawlsReducer from './slices/total-withdrawls-slice';
import metaMaskConnectedReducer from './slices/metamask-connected-slice';
import metaMaskInstalledReducer from './slices/metamask-installed-slice';

const store = configureStore({
	reducer: {
		metaMask: metaMaskReducer,
		transactions: transactionsReducer,
		tokenBalances: tokenBalancesReducer,
		totalDeposits: totalDepositsReducer,
		totalWithdrawls: totalWithdrawlsReducer,
		metaMaskConnected: metaMaskConnectedReducer,
		metaMaskInstalled: metaMaskInstalledReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
