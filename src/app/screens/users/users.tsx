import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import { gql, useQuery } from '@apollo/client';

const useStyles = makeStyles()((theme) => ({
	root: {},
}));

interface User {
	id: number;
	email: string;
}

const Users = () => {
	const { classes } = useStyles();
	const GET_USERS = gql`
		query Query {
			gusers {
				id
				email
			}
		}
	`;
	const { loading, error, data } = useQuery(GET_USERS);
	if (loading) return <>Loading...</>;
	if (error) return <>`Error! ${error.message}`</>;

	return (
		<div className={classes.root}>
			{data.gusers.map((user: User) => (
				<option key={user.id}>{user.email}</option>
			))}
		</div>
	);
};

export default Users;
