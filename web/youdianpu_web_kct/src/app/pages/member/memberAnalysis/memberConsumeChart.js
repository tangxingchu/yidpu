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

class MemberConsumeChart extends React.Component {
    render() {
        const { DataView } = DataSet;
        const { Html, Text } = Guide;
        const { data, turnoverTotal } = this.props;
        const dv = new DataView();
        dv.transform({
            type: 'rename',
            map: {
              x: 'category_name', // row.xxx 会被替换成 row.yyy
              y: 'total_price',
            }
        });
        dv.source(data).transform({
            type: "percent",
            field: "total_price",
            dimension: "category_name",
            as: "percent"
        });
        return (
            <div>
                <Chart
                    height={380}
                    data={dv}
                    padding={[80, 20, 80, 0]}
                    forceFit
                >
                    <Coord type={"theta"} radius={1} innerRadius={0.6} />
                    <Axis name="total_price" />
                    <Legend
                        position="right"
                        offsetY={-80}
                        offsetX={-100}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Guide>
                        <Html
                            position={["50%", "50%"]}
                            html={`<div style="color:#8c8c8c;text-align: center;width: 10em;">总营业额<br>￥<span style="color:#262626;font-size:30px;">${numeral(turnoverTotal).format("0,0.00")}</span></div>`}
                            alignX="middle"
                            alignY="middle"
                        />
                    </Guide>
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="category_name"
                        tooltip={[
                            "category_name*percent",
                            (item, percent) => {
                                percent = `${(percent * 100).toFixed(2)}%`;
                                return {
                                    name: item,
                                    value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="total_price"
                            formatter={(val, item) => {
                                return item.point.category_name  + ": " + `￥${numeral(val).format("0,0.00")}`;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default MemberConsumeChart;
