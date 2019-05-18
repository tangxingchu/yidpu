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

export default class MemberRechargeChart extends React.Component {
  render() {
    const rechargeData = this.props.rechargeData;
    const consumeData = this.props.consumeData;
    const new_rechargeData = rechargeData.map(item => {
        item.name = "会员充值";
        return item;
    });
    const new_consumeData = consumeData.map(item => {
        item.name = "会员消费";
        return item;
    });
    const new_data = [...new_rechargeData, ...new_consumeData];
    const ds = new DataSet();
    const dv = ds.createView().source(new_data);
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Axis name="x" />
          <Axis name="y" />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="x*y"
            color={"name"}
          />
        </Chart>
      </div>
    );
  }
}

