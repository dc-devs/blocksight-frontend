interface ConfigData {
	serverBaseUrl: string;
}

interface Environment {
	test: ConfigData;
	development: ConfigData;
	production: ConfigData;
	[key: string]: ConfigData | Headers;
}

const environment: Environment = {
	test: {
		serverBaseUrl: 'http://localhost:3001',
	},
	development: {
		serverBaseUrl: 'http://localhost:3001',
	},
	production: {
		serverBaseUrl: 'http://localhost:3001',
	},
};

export default environment;
