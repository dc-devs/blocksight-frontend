import { useSelector } from 'react-redux';
import FindExchange from './FindExchange';
import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import { Status } from '../../../redux/enums';
import { IExchange } from '../../../interfaces';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../../hooks';
import ImportedExchanges from './ImportedExchanges';
import ImportExchangeData from './ImportExchangeData';
import { selectAuthentication } from '../../../redux/slices/authenticationSlice';
import {
	fetchExchanges,
	selectExchanges,
	selectExchangesStatus,
} from '../../../redux/slices/exchangesSlice';
import {
	fetchUsersExchanges,
	selectUsersExchanges,
	selectUsersExchangesStatus,
} from '../../../redux/slices/usersExchangesSlice';
import ImportExchangeApi from './contexts/ImportExchangeContext';

const useStyles = makeStyles()((theme) => ({
	root: {},
}));

const Exchanges = () => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();

	const [selectedExchange, setSelectedExchange] = useState<IExchange | null>(
		null
	);
	const importExchangeApi = { setSelectedExchange };

	const exchanges = useSelector(selectExchanges);
	const exchangesStatus = useSelector(selectExchangesStatus);

	const usersExchanges = useSelector(selectUsersExchanges);
	const usersExchangesStatus = useSelector(selectUsersExchangesStatus);

	const authentication = useSelector(selectAuthentication);
	const { user } = authentication;

	useEffect(() => {
		if (exchanges && exchangesStatus === Status.IDLE) {
			dispatch(fetchExchanges());
		}
	}, [exchangesStatus, exchanges, dispatch]);

	useEffect(() => {
		if (
			user?.id &&
			usersExchanges &&
			usersExchangesStatus === Status.IDLE
		) {
			dispatch(fetchUsersExchanges({ userId: user.id }));
		}
	}, [user, usersExchangesStatus, usersExchanges, dispatch]);

	return (
		<>
			<ImportExchangeApi.Provider value={importExchangeApi}>
				<Container maxWidth="xl">
					<FindExchange exchanges={exchanges} />
					{selectedExchange ? (
						<ImportExchangeData
							user={user}
							exchange={selectedExchange}
						/>
					) : (
						<ImportedExchanges usersExchanges={usersExchanges} />
					)}
				</Container>
			</ImportExchangeApi.Provider>
		</>
	);
};

export default Exchanges;
