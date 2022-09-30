import { makeStyles } from 'tss-react/mui';
import Accordion from '@mui/material/Accordion';
import { useState, SyntheticEvent } from 'react';
import ImportExchangeSummary from './ImportExchangeSummary';
import ImportExchangeAccordianDetails from './ImportExchangeDetails';
import { IUser, IExchange, IUsersExchange } from '../../../../interfaces';

// LEFT OFF:
// Add Delete Button (ensure Deletion's cascade)
// Add Clear button
//
// After Deletion is cleared, update search to bring UserExchange to top if already imported
// update chips to be dynamic
// Update Instructions
//
// Eventually Update UsersExchanges to have mulitple APIs (apiConnection becomes its own model)
// Once you've already added a UserExchange, Submit button should be to add a new API, or update existing?

const useStyles = makeStyles()((theme) => ({
	importExchangeDataContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
}));

interface IProps {
	user: IUser | undefined;
	exchange: IExchange;
	fixedExpansion?: boolean;
	usersExchange?: IUsersExchange;
}

const ImportExchange = ({ user, exchange, usersExchange, fixedExpansion = false }: IProps) => {
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
					usersExchange={usersExchange}
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
