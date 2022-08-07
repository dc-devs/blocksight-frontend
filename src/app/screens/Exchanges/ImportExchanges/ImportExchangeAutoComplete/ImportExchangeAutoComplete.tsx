import { useState } from 'react';
import Exchange from '../../Exchange';
import { Search } from 'react-feather';
import { makeStyles } from 'tss-react/mui';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { IExchange } from '../../../../../interfaces';

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
	setValue: CallableFunction;
}

const ImportExchangeAutoComplete = ({ options, setValue }: IProps) => {
	const { classes } = useStyles();

	return (
		<Autocomplete
			clearOnEscape
			id="import-exchanges-autocomplete"
			options={options}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			getOptionLabel={(option) => option.name}
			className={classes.importExchangesAutocomplete}
			classes={{
				listbox: `${classes.autoCompleteListBox}`,
			}}
			onChange={(event: any, newValue: IExchange | null) => {
				setValue(newValue);
			}}
			renderOption={(props, option) => (
				<li
					{...props}
					key={option.id}
					className={classes.renderOptionLi}
				>
					<Exchange exchange={option} elevation={0} />
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
	);
};

export default ImportExchangeAutoComplete;
