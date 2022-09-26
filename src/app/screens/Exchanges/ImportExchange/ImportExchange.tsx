import { makeStyles } from 'tss-react/mui';
import Accordion from '@mui/material/Accordion';
import { useState, SyntheticEvent } from 'react';
import { IUser, IExchange } from '../../../../interfaces';
import ImportExchangeSummary from './ImportExchangeSummary';
import ImportExchangeAccordianDetails from './ImportExchangeDetails';

// LEFT OFF:
// Add Delete Button (ensure Deletion's cascade)
const useStyles = makeStyles()((theme) => ({
	importExchangeDataContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
}));

interface IProps {
	exchange: IExchange;
	fixedExpansion?: boolean;
	user: IUser | undefined;
}

const ImportExchange = ({ user, exchange, fixedExpansion = false }: IProps) => {
	const { classes } = useStyles();
	const panelName = 'panel1';
	const [expanded, setExpanded] = useState<string | false>(false);
	const handleAccordianChange =
		(panelName: string) => (event: SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panelName : false);
		};

	const isExpanded = fixedExpansion || expanded === panelName;

	return (
		<div className={classes.importExchangeDataContainer}>
			<Accordion
				expanded={isExpanded}
				onChange={handleAccordianChange(panelName)}
				disableGutters
				elevation={1}
			>
				<ImportExchangeSummary
					exchange={exchange}
					isExpanded={isExpanded}
				/>
				<ImportExchangeAccordianDetails
					user={user}
					exchange={exchange}
				/>
			</Accordion>
		</div>
	);
};

export default ImportExchange;
