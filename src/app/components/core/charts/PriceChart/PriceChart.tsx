import numeral from 'numeral';
import {
	Line,
	XAxis,
	YAxis,
	Tooltip,
	LineChart,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts';

interface IDataPoint {
	date: string;
	workingFiat: number;
}

interface IProps {
	data: IDataPoint[];
}

const PriceChart = ({ data }: IProps) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="date" />
				<YAxis
					tickFormatter={(price) => {
						return numeral(price).format('$0,000');
					}}
				/>
				<Tooltip />
				{/* <Tooltip active={true} position={{ x: 0, y: 0 }} /> */}
				<Line
					type="monotone"
					dataKey="workingFiat"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
				<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default PriceChart;
