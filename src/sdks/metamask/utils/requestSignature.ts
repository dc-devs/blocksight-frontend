import { IProvider } from '../interfaces';
import MetaMaskMethod from '../enums/MetaMaskMethod';
import { generateMessage } from '../utils';

interface IProps {
	provider: IProvider;
	selectedAddress: string;
}

interface ISignatureResponse {
	signature: string | undefined;
	message: string;
}

const requestSignature = async ({
	provider,
	selectedAddress,
}: IProps): Promise<ISignatureResponse> => {
	let signature: string | undefined;
	const { message } = generateMessage();

	if (provider.request) {
		signature = await provider.request({
			method: MetaMaskMethod.SIGN_TYPED_DATA_V4,
			params: [selectedAddress, message],
		});
	}

	return { signature, message };
};

export default requestSignature;
