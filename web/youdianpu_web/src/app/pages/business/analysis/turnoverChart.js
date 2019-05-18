import React from "react";
import numeral from 'numeral';
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

class TurnoverChartAnalysis extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// window.fireEvent("onresize")
	}

	render() {
		const { turnovers, type } = this.props;
		const { turnoverList, percent } = turnovers;
		const cols = {
			sales: {
				tickInterval: 20
			}
		};
		return (
			<div>
				<div className={styles.percent}>{percent ? percent > 0  ? <div><img src={up}/>
					{type == "3" ? "同比" : "环比"}上涨:<span>{`${numeral(percent * 100).format("0,0.00")}%`}</span></div> 
					: <div><img src={down}/>{type == "3" ? "同比" : "环比"}下跌:<span>{`${numeral(percent * 100).format("0,0.00")}%`}</span></div> : null}</div>
				<Chart height={400} data={turnoverList} scale={cols} forceFit>
					<Axis name="name" />
					<Axis name="turnover" />
					<Tooltip
						crosshairs={{
							type: "y"
						}}
					/>
					<Geom type="interval" position="name*turnover" 
						color={['name', ['#4FAAEB', '#9AD681']]}
						tooltip={['name*turnover', (name, turnover) => {
						return {
							//自定义 tooltip 上显示的 title 显示内容等。
							// title: "ddadad",
							name: '营业额',
							value: `￥${numeral(turnover).format("0,0.00")}`,
						};
					}]}/>
				</Chart>
			</div>
		);
	}
}

export default TurnoverChartAnalysis;
