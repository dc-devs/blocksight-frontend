import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { Link as ReactLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Box } from 'react-feather';

const useStyles = makeStyles()(() => ({
	logoContainer: {
		display: 'flex',
		flexGrow: 1,
		alignItems: 'center',
		justifyItems: 'center',
	},
	logo: {
		marginRight: '10px',
	},
	logoImage: {
		marginRight: '10px',
	},
}));

const Logo = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.logoContainer}>
			{/* <LogoSvg dataTestId="LogoSvg" className={classes.logo} /> */}
			<Link
				to="/"
				color="primary"
				underline="none"
				component={ReactLink}
				className={classes.logoContainer}
				data-testid="LogoLink"
			>
				<Typography
					data-testid="LogoImage"
					variant="h5"
					className={classes.logoImage}
				>
					<Box width={17} height={17} />
				</Typography>
				<Typography data-testid="LogoText" variant="h6">
					blocksight
				</Typography>
			</Link>
		</div>
	);
};

export default Logo;
