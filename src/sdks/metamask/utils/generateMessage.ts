import { v4 as uuidv4 } from 'uuid';

const generateMessage = () => {
	const messageParams = {
		domain: {
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
				{ name: 'verifyingContract', type: 'address' },
			],
			// Refer to PrimaryType
			Message: [{ name: 'Sign', type: 'string' }],
		},
	};
	const message = JSON.stringify(messageParams);

	return { messageParams, message };
};

export default generateMessage;
