import React, { Component, Fragment } from 'react';
import { Modal, Select, Spin, Alert } from 'antd';

export default class MergeOtherTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, handleModalVisible, onSelect, onDeselect, otherTables = [], loading, selectedValue, } = this.props;
        
        return (
            <Modal 
                title={"请选择需要合并收银的桌台"}
                visible={visible}
                onCancel={() => handleModalVisible(false)}
                footer={null}
                /* okText="确认\取消合并"
                cancelText="关闭" */
            >   
                <Spin spinning={loading}>
                    <Alert message={"不能选择[已与其它桌台合并]的桌台合并,需先取消已与其它桌台的合并关系"} type={"info"} showIcon />
                    <div style={{marginTop: 16}}>已合并收银桌台:</div>
                    <Select
                        showArrow={true}
                        mode="multiple"
                        style={{ width: '100%'}}
                        placeholder="请选择合并收银桌台"
                        notFoundContent={"未找到符合合并收银条件的桌台"}
                        value={selectedValue}
                        onSelect={onSelect}
                        onDeselect={onDeselect}                        
                    >
                    {
                        otherTables.map(floor => {
                            return (
                                <Select.OptGroup label={floor.name} key={floor.id}>
                                    {
                                        floor.tables.map(table => {
                                            return (
                                                <Select.Option key={table.id} 
                                                    value={`${table.tableCode}`}
                                                    disabled={table.outTradeNo && !table.merged}
                                                >
                                                    {table.outTradeNo && !table.merged ? `${table.tableCode}-${table.tableName}(已与其它桌台合并)` : `${table.tableCode}-${table.tableName}`}
                                                </Select.Option>
                                            )                            
                                        })
                                    }
                                </Select.OptGroup>
                            )
                        })
                    }
                    </Select>
                </Spin>
            </Modal>
        )
    }

}