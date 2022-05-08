import numeral from 'numeral';
import pieChartColors from '../../pieChartColors';
import TokenPayload from '../interfaces/tokenPayload';
import LegendPayload from '../interfaces/legendPayload';
import TokenSymbolPercents from '../interfaces/tokenPercents';

const getLegendItemsData = (legendPayload: LegendPayload) => {
	const { payload } = legendPayload;
	let tokenSymbolsPercents = {} as TokenSymbolPercents;

	payload.forEach((token: TokenPayload) => {
		const tokenData = token.payload;
		tokenSymbolsPercents[tokenData.name] = tokenData.percent;
	});

	const legendItemsData = payload.map((entry: any, index: number) => {
		let colorHex;

		if (index < 12) {
			colorHex = pieChartColors[index];
		} else if (index >= 12) {
			colorHex = pieChartColors[index - 12];
		} else if (index >= 24) {
			colorHex = pieChartColors[index - 24];
		} else if (index >= 36) {
			colorHex = pieChartColors[index - 36];
		} else if (index >= 48) {
			colorHex = pieChartColors[index - 48];
		} else if (index >= 60) {
			colorHex = pieChartColors[index - 60];
		}

		const tokeSymbol = entry.value;
		const percent = tokenSymbolsPercents[tokeSymbol] * 100;
		const percentFormatted = numeral(percent).format('0.0');

		return {
			percent,
			colorHex,
			tokeSymbol,
			percentFormatted,
		};
	});

	return legendItemsData;
};

export default getLegendItemsData;
