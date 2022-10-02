interface IValue {
	value: string;
	formatted: string;
}

interface IFiatTransfersTotals {
	totalWorking: IValue;
	totalDeposited: IValue;
	totalWithdrawn: IValue;
}

export default IFiatTransfersTotals;
