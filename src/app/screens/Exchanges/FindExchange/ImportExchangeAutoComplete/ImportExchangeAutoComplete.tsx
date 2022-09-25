import { Search } from 'react-feather';
import { makeStyles } from 'tss-react/mui';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IExchange } from '../../../../../interfaces';
import InputAdornment from '@mui/material/InputAdornment';
import ImportExchangeSummary from '../../ImportExchange/ImportExchangeSummary';

import { useContext } from 'react';
import ImportExchangeApi from '../../contexts/ImportExchangeContext';

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
	renderOptionLi: {
		background: 'transparent',
		'&:hover': {
			background: 'transparent',
		},
	},
}));

interface IProps {
	options: IExchange[];
}

const ImportExchangeAutoComplete = ({ options }: IProps) => {
	const { classes } = useStyles();
	const importExchangeApi = useContext(ImportExchangeApi);
	const { setSelectedExchange } = importExchangeApi;

	return (
		<Autocomplete
			id="import-exchanges-autocomplete"
			options={options}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			getOptionLabel={(option) => option.name}
			className={classes.importExchangesAutocomplete}
			classes={{
				listbox: `${classes.autoCompleteListBox}`,
			}}
			onChange={(event: any, selectedExchange: IExchange | null) => {
				if (setSelectedExchange) {
					setSelectedExchange(selectedExchange);
				}
			}}
			renderOption={(props, option) => (
				<li
					{...props}
					key={option.id}
					className={classes.renderOptionLi}
				>
					<ImportExchangeSummary
						exchange={option}
						isAccordianMode={false}
					/>
					<Divider />
				</li>
			)}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						placeholder="E.g. Coinbase, Binance"
						label="Select Exchange"
						InputProps={{
							...params.InputProps,
							type: 'text',
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
	);
};

export default ImportExchangeAutoComplete;
