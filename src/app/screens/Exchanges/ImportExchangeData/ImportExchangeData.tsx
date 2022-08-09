import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { IExchange } from '../../../../interfaces';

const useStyles = makeStyles()((theme) => ({
	importedExchangeDataContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
		marginTop: '100px',
		marginBottom: '3px',
	},
}));
interface IProps {
	exchange: IExchange;
}

const ImportExchangeData = ({ exchange }: IProps) => {
	const { classes } = useStyles();

	return (
		<Paper className={classes.importedExchangeDataContainer}>
			<div>{exchange.name} Selected!!</div>
		</Paper>
	);
};

export default ImportExchangeData;
