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
		query Query(
			$skip: Int
			$take: Int
			$cursor: UserWhereUniqueInput
			$orderBy: UserOrderByInput
			$where: UserWhereInput
		) {
			users(
				skip: $skip
				take: $take
				cursor: $cursor
				orderBy: $orderBy
				where: $where
			) {
				id
				email
				role
				createdAt
				updatedAt
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_USERS, {
		variables: {
			skip: 20,
			take: 10
		},
	});

	if (loading) return <>Loading...</>;
	if (error) return <>`Error! ${error.message}`</>;

	return (
		<div className={classes.root}>
			{data.users.map((user: User) => (
				<div key={user.id} id={`${user.id}`}>
					<Typography>
						{user.id}: {user.email}
					</Typography>
				</div>
			))}
		</div>
	);
};

export default Users;
