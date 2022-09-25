import { makeStyles } from 'tss-react/mui';
import Accordion from '@mui/material/Accordion';
import { useState, SyntheticEvent } from 'react';
import { IUser, IExchange } from '../../../../interfaces';
import ImportExchangeSummary from './ImportExchangeSummary';
import ImportExchangeAccordianDetails from './ImportExchangeDetails';

// LEFT OFF:
// Add Accordian
// Add this module to load on imported exchanges
// Add Delete Button (ensure Deletion's cascade)

const useStyles = makeStyles()((theme) => ({
	importExchangeDataContainer: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'start',
		marginTop: '100px',
	},
}));

interface IProps {
	user: IUser | undefined;
	exchange: IExchange;
}

const ImportExchange = ({ user, exchange }: IProps) => {
	const { classes } = useStyles();
	const [expanded, setExpanded] = useState<string | false>(false);
	const handleAccordianChange =
		(panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	return (
		<div className={classes.importExchangeDataContainer}>
			<Accordion
				expanded={expanded === 'panel1'}
				onChange={handleAccordianChange('panel1')}
				disableGutters
				elevation={1}
			>
				<ImportExchangeSummary exchange={exchange} />
				<ImportExchangeAccordianDetails
					user={user}
					exchange={exchange}
				/>
			</Accordion>
		</div>
	);
};

export default ImportExchange;
