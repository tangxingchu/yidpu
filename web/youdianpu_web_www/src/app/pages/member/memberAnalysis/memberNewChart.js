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

class MemberNewChart extends React.Component {
    render() {
        const { data } = this.props;
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: 'rename',
            map: {
                y: 'amount' // row.xxx 会被替换成 row.yyy
            }
        });
        dv.transform({
            type: 'map',
            callback(row) { // 加工数据后返回新的一行，默认返回行数据本身
                row.md = row.x.substring(5);
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
                    <Axis name="amount" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="interval" position="md*amount" tooltip={['md*amount', (md, amount) => {
                        return {
                            //自定义 tooltip 上显示的 title 显示内容等。
                            name: '新入会员',
                            value: `${amount}人`,
                        };
                    }]}
                    />
                </Chart>
            </div>
        );
    }
}

export default MemberNewChart;
