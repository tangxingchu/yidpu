import React from "react";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import up from './up.png';
import down from './down.png';
import styles from './index.less';

class TableRateChartAnalysis extends React.Component {
    render() {
		const { tableRates, type } = this.props;
		const { tableRateList, percent } = tableRates;
		const cols = {
			sales: {
				tickInterval: 20
			}
		};
		return (
			<div>
				<div className={styles.percent}>{percent ? percent > 0  ? <div><img src={up}/>{type == "3" ? "同比" : "环比"}上涨:<span>{`${(percent * 100).toFixed(2)}%`}</span></div> 
					: <div><img src={down}/>{type == "3" ? "同比" : "环比"}下跌:<span>{`${(percent * 100).toFixed(2)}%`}</span></div> : null}</div>
				<Chart height={400} data={tableRateList} scale={cols} forceFit>
					<Axis name="name" />
                    <Axis name="table_rate" label={{
                        formatter: val => {
                            return `${(val * 100).toFixed(2)}%`; // 格式化坐标轴显示文本
                        }
                    }}/>
					<Tooltip
						crosshairs={{
							type: "y"
						}}
					/>
					<Geom type="interval" position="name*table_rate" 
						color={['name', ['#4FAAEB', '#9AD681']]}
						tooltip={['name*table_rate', (name, table_rate) => {
						return {
							//自定义 tooltip 上显示的 title 显示内容等。
							// title: "ddadad",
							name: '平均翻台率',
							value: `${(table_rate * 100).toFixed(2)}%`,
						};
					}]}/>
				</Chart>
			</div>
		);
	}
}

export default TableRateChartAnalysis;
