import { gql } from '@apollo/client';

const TOKEN_BALANCES = gql`
	query Query($getTokenBalancesInput: GetTokenBalancesInput!) {
		getTokenBalances(getTokenBalancesInput: $getTokenBalancesInput) {
			totalValue {
				value
				formatted
			}
			networks {
				chainId
				chainName
				name
				rpcUrl
				symbol
				blockExplorerUrl
				logoUrl
			}
			tokens {
				totalValue {
					value
					formatted
				}
				balances {
					name
					symbol
					logoUrl
					contractAddress
					balance
					totalValue {
						value
						formatted
					}
					price {
						value
						formatted
					}
					type
					isNft
					chainId
					decimals
					supportsErc
				}
			}
			nfts {
				totalValue {
					value
					formatted
				}
				balances {
					type
					name
					price {
						value
						formatted
					}
					symbol
					isNft
					chainId
					balance
					logoUrl
					decimals
					totalValue {
						value
						formatted
					}
					supportsErc
					contractAddress
				}
			}
			scam {
				totalValue {
					value
					formatted
				}
				balances {
					name
					symbol
					logoUrl
					contractAddress
					balance
					totalValue {
						value
						formatted
					}
					price {
						value
						formatted
					}
					type
					isNft
					chainId
					decimals
					supportsErc
				}
			}
			hidden {
				totalValue {
					value
					formatted
				}
				balances {
					name
					symbol
					logoUrl
					contractAddress
					balance
					totalValue {
						value
						formatted
					}
					price {
						value
						formatted
					}
					type
					isNft
					chainId
					decimals
					supportsErc
				}
			}
		}
	}
`;

export default TOKEN_BALANCES;
