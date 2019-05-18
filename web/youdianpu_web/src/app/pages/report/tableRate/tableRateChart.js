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
import numeral from 'numeral';
import DataSet from "@antv/data-set";

class TableRateChart extends React.Component {
	render() {
		const { data } = this.props;
		const ds = new DataSet();
		const dv = ds.createView().source(data);
		dv.transform({
			type: 'map',
            callback(row) { // 加工数据后返回新的一行，默认返回行数据本身
				// row.md = row.data_date.substring(5);
				row.md = row.data_date;
				return row;
			}
		});
		const cols = {
			sales: {
				tickInterval: 20
			}
		};
		return (
			<div>
				<Chart height={400} data={dv} scale={cols} forceFit /* padding={[80, 200, 80, 80]} */>
					<Axis name="md" />
					<Axis name="table_turnover" label={{
                        formatter: val => {
                            return `${(val * 100).toFixed(2)}%`; // 格式化坐标轴显示文本
                        }
                    }}/>
					<Tooltip
						crosshairs={{
							type: "y"
						}}
					/>
					<Geom
						type="point"
						position="md*table_turnover"
						size={4}
						shape={"circle"}
						color={"table_turnover"}
						style={{
							stroke: "#fff",
							lineWidth: 1
						}}
						tooltip={null}
					/>
					<Geom type="line" position="md*table_turnover" size={2} shape={"smooth"}
						tooltip={['md*table_turnover', (md, table_turnover) => {
							return {
								//自定义 tooltip 上显示的 title 显示内容等。
								name: '翻台率',
								value: `${(table_turnover * 100).toFixed(2)}%`,
							};
						}]}
					/>
				</Chart>
			</div>
		);
	}
}

export default TableRateChart;
