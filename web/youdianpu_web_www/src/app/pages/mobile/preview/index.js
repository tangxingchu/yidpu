import React, { Component, Fragment } from 'react';
import { Row, Col, Select, InputNumber } from 'antd';

import Preview from './preview';

const Option = Select.Option;

export default class MobileEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 375,
            height: 667,
        }
    }

    render() {
        const { width, height } = this.state;
        const innerWidth = Math.round(width * 7.19 / 7.79 * 1000) / 1000;
        const innerHeight = Math.round(height * 11.96 / 15.1 * 1000) / 1000;
        const marginTop = Math.round(height * 1.4 / 15.1 * 1000) / 1000;
        const marginLeft = Math.round(width * 0.29 / 7.79 * 1000) / 1000;
        return (
            <Fragment>
                <Row>
                    <Col span={8}></Col>
                    <Col span={16}>
                        <Select defaultValue={"2"} style={{ width: 140 }}>
                            <Option value="1">iphonex</Option>
                            <Option value="2">iphone8</Option>
                            <Option value="3">iphone8plus</Option>
                            <Option value="4">华为meta10</Option>
                            <Option value="5">小米8</Option>
                        </Select>
                        宽<InputNumber addonBefore="宽" min={100} max={600} defaultValue={width} style={{ width: 100 }} />
                        高<InputNumber addonBefore="高" min={100} max={1000} defaultValue={height} style={{ width: 100 }} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={8}>
                        这边是个gif->
                    </Col>
                    <Col span={16}>
                        <div style={{
                            width: width,
                            height: height,
                            backgroundImage: "url('/static/images/phone_black.png')",
                            backgroundSize: '100% 100%',
                            overflow: 'hidden',
                            }}
                        >
                            <div style={{
                                width: innerWidth,
                                height: innerHeight,
                                backgroundColor: '#fff',
                                marginTop: marginTop,
                                marginLeft: marginLeft,
                                overflow: 'hidden',
                                }}
                            >
                                <Preview height={innerHeight}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Fragment >
        );
    }

}
