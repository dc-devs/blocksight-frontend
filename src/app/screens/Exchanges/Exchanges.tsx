import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch } from '../../../hooks';
import { Status } from '../../../redux/enums';
import Container from '@mui/material/Container';
import ImportExchanges from './ImportExchanges';
import ImportedExchanges from './ImportedExchanges';
import { IUsersExchanges } from '../../../interfaces';
import { selectAuthentication } from '../../../redux/slices/authenticationSlice';
import {
	fetchExchanges,
	selectExchanges,
	selectExchangesStatus,
} from '../../../redux/slices/exchangesSlice';

const useStyles = makeStyles()((theme) => ({
	root: {},
}));

const Exchanges = () => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
	const exchanges = useSelector(selectExchanges);
	const exchangesStatus = useSelector(selectExchangesStatus);
	const authentication = useSelector(selectAuthentication);
	const { user } = authentication;

	useEffect(() => {
		if (exchanges && exchangesStatus === Status.IDLE) {
			dispatch(fetchExchanges());
		}
	}, [exchangesStatus, exchanges, dispatch]);

	const importedExchanges = exchanges.filter(
		(usersExchanges: IUsersExchanges) => {
			return true; //usersExchanges.userId === (user && user?.id);
		}
	);
	const userHasImportedExchanges = importedExchanges.length > 0;

	return (
		<>
			<Container maxWidth="xl">
				<ImportExchanges user={user} exchanges={exchanges} />

				{userHasImportedExchanges && (
					<ImportedExchanges
						user={user}
						exchanges={importedExchanges}
					/>
				)}
			</Container>
		</>
	);
};

export default Exchanges;
