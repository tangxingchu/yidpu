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

class Labelline extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Chart
          height={400}
          data={data}
          padding={[80, 80, 80, 40]}
          forceFit
        >
          <Coord type="theta" radius={1} />
          <Axis name="payAmount" />
          <Legend
            position="bottom"
            offsetY={24}
            offsetX={0}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="payAmount"
            color="item"
            tooltip={[
              "item*payAmount",
              (item, payAmount) => {
                return {
                  name: item,
                  value: `￥${numeral(payAmount).format("0,0.00")}`
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="payAmount"
              formatter={(val, item) => {
                return item.point.item + ": " + `￥${numeral(val).format("0,0.00")}`;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Labelline;