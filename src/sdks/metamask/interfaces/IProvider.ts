interface IProvider {
	isMetaMask?: boolean;
	isStatus?: boolean;
	host?: string;
	path?: string;
	chainId?: string;
	selectedAddress?: string;
	sendAsync?: (
		request: { method: string; params?: Array<any> },
		callback: (error: any, response: any) => void
	) => void;
	send?: (
		request: { method: string; params?: Array<any> },
		callback: (error: any, response: any) => void
	) => void;
	request?: (request: {
		method: string;
		params?: Array<any>;
	}) => Promise<any>;
	on?: (event: string, callback?: CallableFunction) => void;
}

export default IProvider;
