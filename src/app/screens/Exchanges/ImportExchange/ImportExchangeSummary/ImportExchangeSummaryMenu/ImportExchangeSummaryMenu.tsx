import { IUsersExchange } from '../../../../../../interfaces';
import { useState, MouseEvent } from 'react';
import { MdMoreVert } from 'react-icons/md';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DELETE_USERS_EXCHANGES } from '../../../../../../queries/usersExchanges';
import { useMutation } from '@apollo/client';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
	menuButton: {
		minWidth: '0px',
	},
	menuIcon: {
		fontSize: '1.5rem',
		color: theme.palette.text.primary,
	},
}));

interface IProps {
	usersExchange: IUsersExchange | undefined;
}

// TODO: LEFT OFF
// Move to own component
// Add delete functionality when clicked
const ImportExchangeSummaryMenu = ({ usersExchange }: IProps) => {
	const { classes } = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();

		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();

		setAnchorEl(null);
	};

	const [deleteUsersExchanges] = useMutation(DELETE_USERS_EXCHANGES, {
		onError: (error) => {
			const { graphQLErrors } = error;

			if (graphQLErrors) {
				console.error(graphQLErrors);
			}
		},
		onCompleted: (data) => {
			console.log('Deleted UsersExchanges', data);
		},
	});

	const handleClickDelete = (event: MouseEvent<HTMLElement>) => {
		if (usersExchange) {
			deleteUsersExchanges({
				variables: {
					deleteUsersExchangesId: usersExchange.id,
				},
			});
		}

		handleClose(event);
	};

	return (
		<div>
			<Button
				className={classes.menuButton}
				id="demo-positioned-button"
				aria-controls={open ? 'demo-positioned-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<MdMoreVert className={classes.menuIcon} />
			</Button>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<MenuItem onClick={handleClose}>Hard Sync</MenuItem>
				<MenuItem onClick={handleClickDelete}>Delete</MenuItem>
			</Menu>
		</div>
	);
};

export default ImportExchangeSummaryMenu;
