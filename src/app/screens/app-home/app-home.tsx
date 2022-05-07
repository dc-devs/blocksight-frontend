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
	testFooter: {
		position: 'relative',
		padding: '9em 0 16em',
		margin: '0 0 4.5em',
		background: 'linear-gradient(to top, #443ec2 0%, #5951ff 100%)',
	},
}));

const Home = () => {
	const { classes } = useStyles();

	return (
		<>
			<div className={classes.root}>
				<Typography className={classes.homeTitle}>
					Crypto asset tracking made easy.
				</Typography>
			</div>
			<div className={classes.testFooter} />
		</>
	);
};

export default Home;
