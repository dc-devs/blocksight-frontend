import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles()((theme) => ({
	root: {},
}));

const Trading = () => {
	const { classes } = useStyles();

	return (
		<Container maxWidth="xl">
			<Typography>Trading</Typography>
		</Container>
	);
};

export default Trading;
