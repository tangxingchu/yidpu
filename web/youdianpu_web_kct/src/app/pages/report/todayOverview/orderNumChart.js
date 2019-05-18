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
import DataSet from "@antv/data-set";

class TodayOrderNumChart extends React.Component {
	render() {
		const { data } = this.props;
		const ds = new DataSet();
		const dv = ds.createView().source(data);
		dv.transform({
			type: "fold",
			fields: ["num"],
			// 展开字段集
			key: "订单",
			// key字段
			value: "数量" // value字段
		});
		return (
			<div>
				<Chart height={400} data={dv} forceFit /* padding={[80, 80, 80, 80]} */>
					<Legend />
					<Axis name="订单" label={{ "formatter": () => "合计用餐订单" }} />
					<Axis name="数量" />
					<Tooltip showTitle={false} />
					<Geom
						type="intervalStack"
						position="订单*数量"
						color={['name', ['#87d068', '#ff4242', '#FACC14']]}
						style={{
							stroke: "#fff",
							lineWidth: 1
						}}
					/>
				</Chart>
			</div>
		);
	}
}

export default TodayOrderNumChart;
