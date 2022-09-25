import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { IExchange } from '../../../../../interfaces';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportedExchangeHeader from '../ImportedExchangeHeader';

const useStyles = makeStyles()((theme) => ({}));

interface IProps {
	elevation?: number;
	exchange: IExchange;
	noBorderRadius?: boolean;
}

const ImportedExchangeAccordianSummary = ({
	exchange,
	elevation = 1,
	noBorderRadius = false,
}: IProps) => {
	const { classes } = useStyles();

	return (
		<AccordionSummary
			expandIcon={<ExpandMoreIcon />}
			aria-controls="panel1bh-content"
			id="panel1bh-header"
		>
			<ImportedExchangeHeader
				exchange={exchange}
				elevation={elevation}
				noBorderRadius={noBorderRadius}
			/>
		</AccordionSummary>
	);
};

export default ImportedExchangeAccordianSummary;
