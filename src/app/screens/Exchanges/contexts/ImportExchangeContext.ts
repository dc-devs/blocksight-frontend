import { createContext } from 'react';

interface IImportExchangeApi {
	setSelectedExchange?: CallableFunction;
}

const importExchangeApi: IImportExchangeApi = {};

const ImportExchangeApi = createContext(importExchangeApi);

export default ImportExchangeApi;
