import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { MdMoreVert } from 'react-icons/md';
import { useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '../../../../../../hooks';
import { IUsersExchange } from '../../../../../../interfaces';
import { deleteUsersExchanges } from '../../../../../../redux/slices/usersExchangesSlice';

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

const ImportExchangeSummaryMenu = ({ usersExchange }: IProps) => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
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

	const handleClickDelete = (event: MouseEvent<HTMLElement>) => {
		if (usersExchange) {
			dispatch(
				deleteUsersExchanges({ usersExchangeId: usersExchange.id })
			);
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
