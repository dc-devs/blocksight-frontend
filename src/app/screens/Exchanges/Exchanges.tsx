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
	const [selectedExchange, setSelectedExchange] = useState<IExchange | null>(
		null
	);
	console.log('selectedExchange', selectedExchange);
	const dispatch = useAppDispatch();
	const exchanges = useSelector(selectExchanges);
	const exchangesStatus = useSelector(selectExchangesStatus);
	const authentication = useSelector(selectAuthentication);
	const { user } = authentication;
	const importExchangeApi = { setSelectedExchange };

	useEffect(() => {
		if (exchanges && exchangesStatus === Status.IDLE) {
			dispatch(fetchExchanges());
		}
	}, [exchangesStatus, exchanges, dispatch]);

	// Need to Update Queries,
	// ImportExchanges should actually import Exchanges
	// ImportedExchanges should actually import UsersExchanges
	//
	// Once a user selects an actual exchange, display the setup steps for that exhange

	// interface IP {
	// 	exchange: IExchange;
	// }

	// const ImportExchangeScreen = () => {
	// 	return (
	// 		<>
	// 			<div>Exchange Selected!!</div>
	// 		</>
	// 	);
	// };

	// const selectedScreenComponent = selectedExchange ? (
	// 	<ImportExchangeScreen />
	// ) : (
	// 	<ImportedExchanges user={user} exchanges={exchanges} />
	// );

	return (
		<>
			<ImportExchangeApi.Provider value={importExchangeApi}>
				<Container maxWidth="xl">
					<ImportExchanges exchanges={exchanges} />
					{/* {selectedScreenComponent} */}
				</Container>
			</ImportExchangeApi.Provider>
		</>
	);
};

export default Exchanges;
