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

class Labelline extends React.Component {
    render() {
        const { DataView } = DataSet;
        const { data } = this.props;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "pay_amount",
            dimension: "pay_method",
            as: "percent"
        });
        return (
            <div>
                <Chart
                    height={400}
                    data={dv}
                    padding={[80, 100, 80, 0]}
                    forceFit
                >
                    <Coord type="theta" />
                    <Axis name="percent" />
                    <Legend
                        position="right"
                        offsetY={20}
                        offsetX={-80}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="pay_method"
                        tooltip={[
                            "pay_method*percent",
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
                            content="pay_amount"
                            formatter={(val, item) => {
                                return item.point.pay_method + ": " + `￥${numeral(val).format("0,0.00")}`;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default Labelline;
