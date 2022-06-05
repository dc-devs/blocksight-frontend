import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
	credentials: 'include',
	uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
	link,
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache(),
});

export default client;
