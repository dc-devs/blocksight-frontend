import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles()((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
	},
	homeTitle: {
		fontSize: '2.5rem',
		color: theme.palette.primary.main,
	},
}));

const Home = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<Typography className={classes.homeTitle}>
				Crypto asset tracking made easy.
			</Typography>
		</div>
	);
};

export default Home;
