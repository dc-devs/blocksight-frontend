const getWalletFromProvider = (provider: any) => {
	const { chainId: rawChainId, selectedAddress } = provider;
	const chainId = rawChainId.substring(2, 3);

	return { chainId, selectedAddress };
};

export default getWalletFromProvider;
