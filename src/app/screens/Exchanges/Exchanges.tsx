import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch } from '../../../hooks';
import { Status } from '../../../redux/enums';
import Container from '@mui/material/Container';
import ImportExchanges from './ImportExchanges';
import ImportedExchanges from './ImportedExchanges';
import { IExchange, IUsersExchanges } from '../../../interfaces';
import { selectAuthentication } from '../../../redux/slices/authenticationSlice';
import {
	fetchExchanges,
	selectExchanges,
	selectExchangesStatus,
} from '../../../redux/slices/exchangesSlice';
import ImportExchangeApi from './contexts/ImportExchangeContext';

const useStyles = makeStyles()((theme) => ({
	root: {},
}));

const Exchanges = () => {
	const { classes } = useStyles();
	const [selectedUsersExchanges, setSelectedUsersExchanges] =
		useState<IExchange | null>(null);
	console.log('Value Exchanges Level:', selectedUsersExchanges);
	const dispatch = useAppDispatch();
	const exchanges = useSelector(selectExchanges);
	const exchangesStatus = useSelector(selectExchangesStatus);
	const authentication = useSelector(selectAuthentication);
	const { user } = authentication;
	const importExchangeApi = { setSelectedUsersExchanges };

	useEffect(() => {
		if (exchanges && exchangesStatus === Status.IDLE) {
			dispatch(fetchExchanges());
		}
	}, [exchangesStatus, exchanges, dispatch]);

	// Might need to update passing UsersExchanges so that yuo have that model on hand
	return (
		<>
			<ImportExchangeApi.Provider value={importExchangeApi}>
				<Container maxWidth="xl">
					<ImportExchanges user={user} exchanges={exchanges} />
					<ImportedExchanges user={user} exchanges={exchanges} />
				</Container>
			</ImportExchangeApi.Provider>
		</>
	);
};

export default Exchanges;
