const shortenWalletAddress = (walletAddress: string) => {
	let shortendWalletAddress;

	if (walletAddress) {
		const firstSlice = walletAddress.slice(0, 6);
		const lastSlice = walletAddress.slice(-4);

		shortendWalletAddress = `${firstSlice}...${lastSlice}`.toUpperCase();
	}

	return shortendWalletAddress;
};

export default shortenWalletAddress;
