import { configureStore } from '@reduxjs/toolkit';
import metaMaskReducer from './slices/metamaskSlice';
import exchangesReducer from './slices/exchangesSlice';
import transactionsReducer from './slices/transactionsSlice';
import totalDepositsReducer from './slices/totalDepositsSlice';
import tokenBalancesReducer from './slices/tokenBalancesSlice';
import fiatTransfersReducer from './slices/fiatTransfersSlice';
import authenticationReducer from './slices/authenticationSlice';
import usersExchangesReducer from './slices/usersExchangesSlice';
import totalWithdrawlsReducer from './slices/totalWithdrawlsSlice';
import metaMaskConnectedReducer from './slices/metamaskConnectedSlice';
import metaMaskInstalledReducer from './slices/metamaskInstalledSlice';
import fiatTransfersTotalsReducer from './slices/fiatTransfersTotalsSlice';

const store = configureStore({
	reducer: {
		metaMask: metaMaskReducer,
		exchanges: exchangesReducer,
		transactions: transactionsReducer,
		fiatTransfers: fiatTransfersReducer,
		tokenBalances: tokenBalancesReducer,
		totalDeposits: totalDepositsReducer,
		usersExchanges: usersExchangesReducer,
		authentication: authenticationReducer,
		totalWithdrawls: totalWithdrawlsReducer,
		metaMaskConnected: metaMaskConnectedReducer,
		metaMaskInstalled: metaMaskInstalledReducer,
		fiatTransfersTotals: fiatTransfersTotalsReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
