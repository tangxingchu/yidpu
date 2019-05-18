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

class OrderNumChart extends React.Component {
    render() {
        const { data } = this.props;
        const new_data = [];
        data.forEach(item => {
            new_data.push({ "name": "正常订单", num: item.order_num, data_date: item.data_date });
            new_data.push({ "name": "退款订单", num: item.refund_num, data_date: item.data_date });
            new_data.push({ "name": "异常订单", num: item.exception_num, data_date: item.data_date });
        });
        return (
            <Chart height={400} data={new_data} forceFit /* padding={[80, 200, 80, 80]} */>
                <Legend />
                {/* <Axis name="data_date" label={{ "formatter": (data_date) => data_date.substring(5) }} /> */}
                <Axis name="data_date" label={{ "formatter": (data_date) => data_date }} />
                <Axis name="num" />
                <Tooltip showTitle={true} />
                <Geom
                    type="intervalStack"
                    position="data_date*num"
                    color={['name', ['#87d068', '#ff4242', '#FACC14']]}
                    adjust= {[
                        {
                          type: 'dodge',
                          marginRatio: 0, // 数值范围为 0 至 1，用于调整分组中各个柱子的间距
                        }
                    ]}
                />
            </Chart>
        );
    }
}

export default OrderNumChart;
