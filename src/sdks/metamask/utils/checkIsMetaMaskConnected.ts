import getProvider from './getProvider';

const checkIsMetaMaskConnected = (): Promise<boolean> => {
	return new Promise(async (resolve) => {
		const provider: any = await getProvider();
		let count = 0;
		let maxCount = 20;

		const interval = setInterval(() => {
			if (count > maxCount) {
				resolve(false);
			}

			if (provider && provider.selectedAddress) {
				clearInterval(interval);
				resolve(true);
			}

			count += 1;
		}, 100);
	});
};

export default checkIsMetaMaskConnected;
