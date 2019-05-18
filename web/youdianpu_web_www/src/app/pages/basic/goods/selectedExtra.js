import React, { Component, Fragment } from 'react';
import { Row, Col, InputNumber } from 'antd';

export default class SelectedExtra extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { extraList, selectedExtraItems, onChange } = this.props;

        return (
            <div>
                {
                    extraList.map((item, index) => {
                        if(item.checked) {
                            return (
                                <Fragment key={index}>
                                    <div style={{ borderBottom: '1px solid #E9E9E9',}}>
                                        {item.dictName}
                                    </div>
                                    <Row style={{ marginTop: 8, marginBottom: 8  }}>
                                        {selectedExtraItems[item.dictCode].map(dictItem => {
                                            return <Col span={8} key={dictItem.id}>[{dictItem.itemName}]&nbsp;价格浮动:
                                                <InputNumber defaultValue={0}
                                                    value={dictItem.price || 0}
                                                    onChange={(value) => {onChange(value, dictItem.dictCode, dictItem.id)}}/>
                                            </Col>
                                        })}
                                    </Row>
                                </Fragment>
                            )
                        }
                    })
                }
            </div>
        );
    }

}