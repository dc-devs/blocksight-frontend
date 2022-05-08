import TokenBalance from '../../../../../../../../interfaces/tokenBalanceInterface';
import RechartPieDataPoint from '../../../../../../../../interfaces/rechartPieDataPointInterface';

interface Props {
	tokenBalances: TokenBalance[];
}

const generateSeriesData = ({
	tokenBalances = [],
}: Props): RechartPieDataPoint[] => {
	const seriesData = tokenBalances.map((token) => {
		const { totalValue, symbol } = token;
		const name = symbol;
		const value = Math.floor(totalValue.number);

		return { name, value };
	});

	return seriesData;
};

export default generateSeriesData;
