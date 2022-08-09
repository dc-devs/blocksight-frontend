import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import ImportExchangeAutoComplete from './ImportExchangeAutoComplete';
import { IExchange } from '../../../../interfaces';
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
	exchanges: IExchange[];
}

const ImportExchanges = ({ exchanges }: IProps) => {
	const { classes } = useStyles();
	const options = exchanges.map((exchange) => {
		return { ...exchange };
	});

	return (
		<>
			<div className={classes.importExchangesContainer}>
				<Typography className={classes.importExchangesTypography}>
					Add an Exchange
				</Typography>
				<ImportExchangeAutoComplete options={options} />
			</div>
		</>
	);
};

export default ImportExchanges;
