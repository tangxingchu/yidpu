import React, { Component, Fragment } from 'react';
import { Row, Col, Button, Popover, Spin, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import Exception from '../../components/Exception';

import { getGrade, getToken } from '../../utils/authority';
import styles from './styles.less';
import { rootRouter } from '../../common/config';

const grades = {"1": "普通会员", "2": "银牌会员", "3": "黄金会员", "4": "钻石会员", "5": "超级牛魔王"};

class ErrorPage403 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            modalVisible: false,
            confirmLoading: false,
        };
    }

    btnClick = () => {
        const  {functionId, listFunctionPrice, funPriceMap} = this.props;
        if(!funPriceMap[functionId] || funPriceMap[functionId].length === 0) {
            listFunctionPrice(functionId);
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    openExternal = (id) => {
        this.setState({
            visible: false,
            modalVisible: true,
        });
        ipcRenderer.send("openOrderFunction", {token: getToken(), id});
    }

    generateContent = (id, loading, funPriceMap) => {
        if(loading) {
            return (
                <Spin />
            )
        } else {
            return (
                <Row>
                    {funPriceMap[id] && funPriceMap[id].map(item => {
                            return <Col span={12} key={item.id} className={styles.buyFunctionCol} onClick={() => {this.openExternal(item.id)}} >
                                {item.priceDesc}<span>{item.savePrice > 0 ? `(省￥${item.savePrice})` : null}</span>
                            </Col>
                        })
                    }
                </Row>
            )
        } 
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        this.props.refreshPrivilege().then(() => {
            this.setState({
                confirmLoading: false,
                modalVisible: false,                
            });
        });
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false,
            confirmLoading: false,
        });
    }

    render() {
        const  {grade, functionId, listFunctionPrice, listFunPriceLoading, funPriceMap} = this.props;
        const { modalVisible, confirmLoading } = this.state;
        return (
            <Fragment>
                {
                    getGrade() >= grade ? 
                    <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link}
                        actions={[
                            <Link to={`${rootRouter}/defaultPage`} key="back"><Button >返回首页</Button></Link>
                        ]}
                    /> 
                : 
                    <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link}
                        currentGrade={grades[getGrade()]} grade={grades[grade]}
                        actions={[
                            <Popover key="buy" content={this.generateContent(functionId, listFunPriceLoading, funPriceMap)} 
                                title="请选择购买时长" trigger="click" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                                <Button type={"primary"} onClick={() => {this.btnClick(functionId, funPriceMap, listFunctionPrice)}}>单独购买此功能</Button>
                            </Popover>, 
                            <Link to={`${rootRouter}/defaultPage`} key="back"><Button >返回首页</Button></Link>
                        ]}
                    />
                }
                
                <Modal visible={modalVisible}
                    title="支付确认"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[<Button key="back" onClick={this.handleCancel}>还未支付</Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                      支付完成
                    </Button>,
                  ]}
                >
                    <p>如果您在支付过程中遇到任何问题,请联系我们的客服人员.</p>
                </Modal>
            </Fragment>
        )
    }

}

export default ErrorPage403;
