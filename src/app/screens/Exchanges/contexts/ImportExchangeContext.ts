import { createContext } from 'react';

interface IImportExchangeApi {
	setSelectedUsersExchanges?: CallableFunction;
}

const importExchangeApi: IImportExchangeApi = {};

const ImportExchangeApi = createContext(importExchangeApi);

export default ImportExchangeApi;
