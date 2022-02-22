import Dialog from '@mui/material/Dialog';
import { makeStyles } from 'tss-react/mui';

interface Props {
	isOpen: boolean;
	children: JSX.Element;
	className?: string;
}

const useStyles = makeStyles()(() => ({
	dialogRoot: {},
	paper: {
		borderRadius: '10px',
	},
}));

const ModalBase = ({ isOpen, children, className }: Props) => {
	const { classes } = useStyles();

	return (
		<Dialog
			open={isOpen}
			maxWidth="xl"
			classes={{
				paper: classes.paper,
			}}
			className={`${classes.dialogRoot} ${className}`}
		>
			{children}
		</Dialog>
	);
};

export default ModalBase;
