import { gql } from '@apollo/client';

const TOKEN_BALANCES = gql`
	query Query($getTokenBalancesInput: GetTokenBalancesInput!) {
		getTokenBalances(getTokenBalancesInput: $getTokenBalancesInput) {
			totalValue {
				number
				formatted
			}
			balances {
				name
				symbol
				logoUrl
				contractAddress
				balance
				totalValue {
					number
					formatted
				}
				price {
					number
					formatted
				}
			}
		}
	}
`;

export default TOKEN_BALANCES;