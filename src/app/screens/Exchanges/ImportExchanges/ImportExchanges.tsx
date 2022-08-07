import { Search } from 'react-feather';
import Exchange from '../Exchange';
import { makeStyles } from 'tss-react/mui';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { IUser, IExchange, IUsersExchanges } from '../../../../interfaces';

const useStyles = makeStyles()((theme) => ({
	importExchangesContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'start',
		marginTop: '50px',
	},
	importExchangesAutocomplete: {
		marginTop: theme.spacing(3),
	},
	autoCompleteListBox: {
		padding: '0',
	},
	importExchangesTypography: {
		fontSize: '2rem',
	},
}));

interface IProps {
	user: IUser | undefined;
	exchanges: IUsersExchanges[];
}

const ImportExchanges = ({ user, exchanges }: IProps) => {
	const { classes } = useStyles();

	const options = exchanges.map((usersExchanges) => {
		const { exchange } = usersExchanges;
		const { name } = exchange;

		return { label: name, ...exchange };
	});

	return (
		<>
			<div className={classes.importExchangesContainer}>
				<Typography className={classes.importExchangesTypography}>
					Add an Exchange
				</Typography>

				<Autocomplete
					className={classes.importExchangesAutocomplete}
					id="import-exchanges-autocomplete"
					disableClearable
					options={options}
					classes={{
						listbox: `${classes.autoCompleteListBox}`,
					}}
					renderOption={(props, option) => (
						<div key={option.id}>
							<Exchange exchange={option} elevation={0} />
							<Divider />
						</div>
					)}
					renderInput={(params) => {
						return (
							<TextField
								{...params}
								placeholder="E.g. Coinbase, Binance"
								label="Select Exchange"
								InputProps={{
									...params.InputProps,
									type: 'search',
									startAdornment: (
										<InputAdornment position="start">
											<Search />
										</InputAdornment>
									),
								}}
							/>
						);
					}}
				/>
			</div>
		</>
	);
};

export default ImportExchanges;
