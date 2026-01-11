//@ts-ignore
import { BarChart } from 'react-native-svg-charts';
import { Rect, G } from 'react-native-svg';

type DataObj = {
    value: number;
    color: string;
}
type Props = {
    data: Array<DataObj>,
}

const Chart = ({
    data,
}: Props) => {
    const CustomBar = ({ x, y, bandwidth, data: chartData }: any) => (
        <G>
            {chartData.map((item: any, index: number) => {
                const barHeight = y(0) - y(item.value);
                const barColor = typeof item.color === 'string' ? item.color : '#8b8b8bff';

                return (
                    <Rect
                        key={index}
                        x={x(index)}
                        y={y(item.value)}
                        width={bandwidth}
                        height={barHeight}
                        rx={3}
                        ry={3}
                        fill={barColor}
                    />
                );
            })}
        </G>
    );

    return (
        <>
            <BarChart
                style={{ width: 100, height: 60, marginTop: 12 }}
                data={data}
                yAccessor={({ item }: any) => item.value}
                spacingInner={0.4}
                gridMin={0}
                contentInset={{ top: 0, bottom: 0 }}
                svg={{ fill: '#00000000' }}
            >
                <CustomBar />
            </BarChart>
        </>
    );
}

export default Chart;
