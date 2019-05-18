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

class CustomerFlowChart extends React.Component {
	render() {
		const { data } = this.props;
		const ds = new DataSet();
		const dv = ds.createView().source(data);
		dv.transform({
			type: 'map',
			callback(row) { // 加工数据后返回新的一行，默认返回行数据本身
				// row.md = row.date.substring(5);
				row.md = row.date;
				row.客流量 = row.customer_flow;
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
					<Axis name="客流量" />
					<Tooltip
						crosshairs={{
							type: "y"
						}}
					/>
					<Geom
						type="point"
						position="md*客流量"
						size={4}
						shape={"circle"}
						color={"客流量"}
						style={{
							stroke: "#fff",
							lineWidth: 1
						}}
						tooltip={null}
					/>
					<Geom type="line" position="md*客流量" size={2} shape={"smooth"}
						tooltip={['md*客流量', (md, customer_flow) => {
							return {
								//自定义 tooltip 上显示的 title 显示内容等。
								name: '客流量',
								value: `${numeral(customer_flow).format("0,0")}人`,
							};
						}]}
					/>
				</Chart>
			</div>
		);
	}
}

export default CustomerFlowChart;
