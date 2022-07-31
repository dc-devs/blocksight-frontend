import Paper from '@mui/material/Paper';
import { INetwork } from '../../../../../../../../interfaces';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { themeColors } from '../../../../../../../../theme/colors';
const { coinbaseBorderColor } = themeColors;

const useStyles = makeStyles()((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'start',
		alignContent: 'center',
		alignItems: 'center',
		borderRadius: '10px',
		border: `1px solid ${coinbaseBorderColor}`,
		padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
		marginRight: theme.spacing(1),
	},
	image: {
		width: '20px',
		height: '20px',
		marginRight: theme.spacing(1),
	},
}));

interface IProps {
	network: INetwork;
}

const Network = ({ network }: IProps) => {
	const { classes } = useStyles();
	const { name, logoUrl, chainId } = network;

	return (
		<div className={classes.root} key={chainId}>
			<img className={classes.image} src={logoUrl} alt="" />
			<Typography>{name}</Typography>
		</div>
	);
};

export default Network;
