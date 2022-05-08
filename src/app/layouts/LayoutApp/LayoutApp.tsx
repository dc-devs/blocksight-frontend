import SideBar from './Sidebar';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
	layoutContainer: {
		display: 'flex',
		width: '100vw',
	},
	sidebarContainer: {
		'flex-grow': '0',
	},
	pageContainer: {
		'flex-grow': '1',
		// backgroundColor: 'rgba(228, 230, 246, .1)',
	},
}));

interface Props {
	children: JSX.Element;
}

const LayoutApp = ({ children }: Props) => {
	const { classes } = useStyles();

	return (
		<div data-testid="layoutApp" className={classes.layoutContainer}>
			<div className={classes.sidebarContainer}>
				<SideBar logoText="blocksight"></SideBar>
			</div>
			<div className={classes.pageContainer}>{children}</div>
		</div>
	);
};

export default LayoutApp;
