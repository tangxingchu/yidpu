import React, { Fragment, Component } from 'react';
import { Row, Col, Tabs, Icon, Card, Form, Button, Alert, Popconfirm, Radio, message, Input, Divider, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { shell, ipcRenderer } from 'electron';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import printSettingActions from '../../../actions/printSetting';
import styles from './index.less';


class PrintSettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pingIsAlive: false,//ping测试
            pingLoading: false,
        }
    }

    componentDidMount() {
        ipcRenderer.on("findUSBPrinter-reply", (event, arg) => {
            this.props.printSettingActions.dispatchUsbPrint(arg);
        });
        ipcRenderer.on('getLocalIp-reply', (event, arg) => {
            this.props.printSettingActions.dispatchLocalIp(arg);
        });
        ipcRenderer.send("findUSBPrinter");
        ipcRenderer.send("getLocalIp-message");
        this.props.printSettingActions.list();
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("findUSBPrinter-reply");
        ipcRenderer.removeAllListeners("listPrintSetting-reply");
        ipcRenderer.removeAllListeners("getLocalIp-reply");
    }

    findUSBPrinter() {
        ipcRenderer.send("findUSBPrinter");
    }

    saveTicketPrint = (idVendor, idProduct) => {
        const printObj = { printVid: idVendor, printPid: idProduct, printType: 1 };
        this.props.printSettingActions.save(printObj).then(() => {
            message.success("成功设为默认");
        });
        ipcRenderer.send("savePrintSetting", printObj);
    }

    saveNetworkPrinter = (printIp, printPort) => {
        const printObj = {printIp, printPort, printType: 2 };
        this.props.printSettingActions.save(printObj).then(() => {
            message.success("网络打印机IP地址保存成功");
        });
        ipcRenderer.send("savePrintSetting", printObj);
    }

    testPrintTicket = () => {
        const { currMerchantInfo } = this.props.homePage;
        const { printType1Value } = this.props.printSetting;
        if(!printType1Value) {
            message.error("您没有选择打印设备")
            return;
        }
        const idVendor = printType1Value.split("_")[0];
        const idProduct = printType1Value.split("_")[1];
        ipcRenderer.on("testPrintTicket-reply", (event, arg) => {
            if(arg.success) {
                message.success("打印测试已发起,请检查是否能正确打印。");
            } else {
                message.error(arg.message);
            }
            ipcRenderer.removeAllListeners("testPrintTicket-reply");
        });
        ipcRenderer.send("testPrintTicket", { printVid: idVendor, printPid: idProduct, merchant: currMerchantInfo });
    }

    onUSBPrinterChange = (e) => {
        const { value } = e.target;
        this.props.printSettingActions.onUSBPrinterChange(value);
    }

    testPrintOrder = (printIp, printPort) => {
        ipcRenderer.on("testPrintOrder-reply", (event, arg) => {
            if(arg.success) {
                message.success("打印测试已发起,请检查是否能正确打印。");
            } else {
                message.error(arg.message);
            }
            ipcRenderer.removeAllListeners("testPrintOrder-reply");
        });
        ipcRenderer.send("testPrintOrder", { printIp, printPort });
    }

    testPing = (printIp) => {
        ipcRenderer.on("ping-reply", (event, arg) => {
            if(arg.isAlive) {
                message.success("Ping测试通过,现在您可以测试打印了");
                this.setState({pingIsAlive: true, pingLoading: false});
            } else {
                message.error(`Ping测试未通过,无法连接到${printIp},请检查网络`);
                this.setState({pingIsAlive: false, pingLoading: false});
            }
            ipcRenderer.removeAllListeners("ping-reply");
        });
        this.setState({pingLoading: true});
        ipcRenderer.send("ping", {printIp});
    }

    goTaobao = () => {
        shell.openExternal("https://www.taobao.com");
    }

    networkPrinterChange = (e) => {
        this.setState({pingIsAlive: false});
    }

    resetUSBPrinter = () => {
        ipcRenderer.on("resetUSBPrinter-reply", (event, arg) => {
            if(arg.success) {
                message.success("默认的USB打印机重置成功");
            } else {
                message.error(`重置失败,${arg.message}`);
            }
            ipcRenderer.removeAllListeners("resetUSBPrinter-reply");
        });
        ipcRenderer.send("resetUSBPrinter");
    }

    resetNetworkPrinter = () => {
        ipcRenderer.on("resetNetworkPrinter-reply", (event, arg) => {
            if(arg.success) {
                message.success("默认的网络打印机重置成功");
            } else {
                message.error(`重置失败,${arg.message}`);
            }
            ipcRenderer.removeAllListeners("resetNetworkPrinter-reply");
        });
        ipcRenderer.send("resetNetworkPrinter");
    }

    render() {
        const { pingIsAlive, pingLoading } = this.state;
        const { loading, currTab, usbPrints, usbPrinter, printType1Value, saveLoading, localIp, networkPrinter } = this.props.printSetting;
        const { onTabChange } = this.props.printSettingActions;
        const renderBtn = (usbPrint) => {
            if (printType1Value == `${usbPrinter.printVid}_${usbPrinter.printPid}`) {
                return (
                    <Fragment>
                        <Icon type="check" style={{ color: '#87d068' }} />
                        <span>默认</span>
                    </Fragment>
                )
            } else {
                return (
                    <Button style={{ marginRight: 16 }} loading={saveLoading} onClick={() => this.saveTicketPrint(usbPrint.deviceDescriptor.idVendor,
                        usbPrint.deviceDescriptor.idProduct)}>设为默认</Button>
                )
            }
        }
        const renderContent = () => {
            return (
                <Fragment>
                    <span>打印机设置分为小票\收银打印、后厨用餐单打印。小票\收银打印请使用前台USB接口打印机接入电脑打印。
                    后厨用餐单打印请使用网络接口打印机打印。请使用80mm热敏打印机。</span>
                    {/* <a href="javascript:void(0)" onClick={() => this.goTaobao()}>购买80mm热敏打印机</a> */}
                </Fragment>
            )
        }
        return (
            <PageHeaderLayout title={"打印机设置"}
                content={renderContent()}
            >
            <Spin spinning={loading}>
                <Card bordered={false}>
                    <Tabs defaultActiveKey={currTab} onChange={onTabChange}>
                        <Tabs.TabPane tab={<span><Icon type="printer" />小票\收银打印设置</span>} key="1">
                            <Alert message="如果您连接了多个USB打印设备,请单个勾选测试打印确认之后设置默认打印机。" showIcon style={{ marginBottom: 8 }}></Alert>
                            {
                                usbPrints.length == 0 ?
                                    <div className={styles.tips}>
                                        <span>没有识别到USB打印设备，请确认USB打印设备是否已接通电源或USB线是否已插好。</span>
                                        <Button onClick={() => this.findUSBPrinter()}>重试</Button>
                                    </div>
                                    :
                                    <Fragment>
                                        <Divider orientation="left">已识别到的USB打印设备</Divider>
                                        <Radio.Group onChange={this.onUSBPrinterChange} value={printType1Value}>
                                            {
                                                usbPrints.map((usbPrint, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <Radio
                                                                value={`${usbPrint.deviceDescriptor.idVendor}_${usbPrint.deviceDescriptor.idProduct}`}
                                                            >
                                                                {`USB打印设备-${index + 1}`}
                                                            </Radio>
                                                            {
                                                                renderBtn(usbPrint)
                                                            }

                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </Radio.Group>
                                    </Fragment>
                            }
                            <div className={styles.testPrintBtn} >
                                <Popconfirm title="确认发起打印测试吗?" onConfirm={() => this.testPrintTicket()} okText="是" cancelText="否">
                                    <Button type={"primary"} disabled={!printType1Value || usbPrints.length == 0}>测试打印</Button>
                                </Popconfirm>
                                <Button onClick={() => this.resetUSBPrinter()} disabled={!printType1Value || usbPrints.length == 0} style={{marginLeft: 8}}>重置打印机设置</Button>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="printer" />后厨用餐单打印设置</span>} key="2">
                            <Alert message={`请确保打印机IP地址能与本机IP:${localIp}互通，请先点击Ping测试，测试通过在点测试打印。打印成功后记得点保存。`} showIcon style={{ marginBottom: 8 }}></Alert>
                            <NetWrokPrinterWarpper
                                testPrintOrder={this.testPrintOrder}
                                saveNetworkPrinter={this.saveNetworkPrinter}
                                saveLoading={saveLoading}
                                networkPrinter={networkPrinter}
                                pingIsAlive={pingIsAlive}
                                pingLoading={pingLoading}
                                testPing={this.testPing}
                                onChange={this.networkPrinterChange}
                                resetNetworkPrinter={this.resetNetworkPrinter}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </Spin>
        </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        printSetting: state.printSetting,
        homePage: state.homePage,
    }
}, (dispatch) => {
    return {
        printSettingActions: bindActionCreators(printSettingActions, dispatch),
    }
})(PrintSettingPage));


class NetWrokPrinter extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            this.props.saveNetworkPrinter(values.printIp, values.printPort);
        });
    }

    testPrint = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            this.props.testPrintOrder(values.printIp, values.printPort);
        });
    }

    testPing = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            this.props.testPing(values.printIp);
        });
    }

    render() {
        const { form, networkPrinter, saveLoading, pingIsAlive, pingLoading } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };
        return (
            <Row>
                <Col span={4}>
                </Col>
                <Col span={16}>
                    <Form>
                        <Form.Item {...formItemLayout} label="打印机IP">
                            {form.getFieldDecorator('printIp', {
                                rules: [{ required: true, pattern: /^((\d)|([1-9]\d)|(1\d{2})|((2[0-4]\d)|(25[0-5])))(\.((\d)|([1-9]\d)|(1\d{2})|((2[0-4]\d)|(25[0-5])))){3}$/,
                                    message: '请输入正确的打印机ip地址,如:192.168.0.103', whitespace: true, }],
                                initialValue: networkPrinter.printIp,
                            })(
                                <Input placeholder="打印机IP" maxLength={16} onChange={this.props.onChange}/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="打印机端口"
                            help={"端口默认是9100,如果您打印机没有更改过端口用默认的即可"}>
                            {form.getFieldDecorator('printPort', {
                                rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入打印机端口',}],
                                initialValue: networkPrinter.printPort,
                            })(
                                <Input placeholder="打印机端口" maxLength={16} onChange={this.props.onChange}/>
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" loading={saveLoading} onClick={() => this.handleSubmit()} style={{marginRight: 8}}>保存</Button>
                            <Button loading={pingLoading} onClick={() => this.testPing()} style={{marginRight: 8}}>Ping测试</Button>
                            <Button onClick={() => this.testPrint()} disabled={!pingIsAlive}>测试打印</Button>
                            <Button onClick={() => this.props.resetNetworkPrinter()} style={{marginLeft: 8}}>重置打印机设置</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={4}>
                </Col>
            </Row>
        )
    }
}

const NetWrokPrinterWarpper = Form.create()(NetWrokPrinter);