import { v4 as uuidv4 } from 'uuid';

interface IProps {
	chainId: string;
}

const generateMessage = ({ chainId }: IProps) => {
	console.log(chainId);
	return {
		domain: {
			chainId,
			name: 'BlockSight',
			verifyingContract: 'https://blocksight.fi',
			salt: uuidv4(),
			version: '1.0.0',
		},
		message: {
			Sign: `Hello from BlockSight! Sign this message to prove you have access to this wallet and we’ll log you in. This won't cost you any Ether.`,
		},
		// Refers to the keys of the *types* object below.
		primaryType: 'Message',
		types: {
			// TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
			EIP712Domain: [
				{ name: 'name', type: 'string' },
				{ name: 'version', type: 'string' },
				{ name: 'chainId', type: 'uint256' },
				{ name: 'verifyingContract', type: 'address' },
			],
			// Refer to PrimaryType
			Message: [{ name: 'Sign', type: 'string' }],
		},
	};
};

export default generateMessage;
