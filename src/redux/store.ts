import { configureStore } from '@reduxjs/toolkit';
import metaMaskReducer from './slices/metamaskSlice';
import transactionsReducer from './slices/transactionsSlice';
import totalDepositsReducer from './slices/totalDepositsSlice';
import tokenBalancesReducer from './slices/tokenBalancesSlice';
import totalWithdrawlsReducer from './slices/totalWithdrawlsSlice';
import metaMaskConnectedReducer from './slices/metamaskConnectedSlice';
import metaMaskInstalledReducer from './slices/metamaskInstalledSlice';

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
