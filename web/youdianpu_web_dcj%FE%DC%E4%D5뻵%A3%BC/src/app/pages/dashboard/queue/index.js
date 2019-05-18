import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Tag, Icon, Tooltip, notification, Affix, Input, Alert, Button, Spin, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { default as TouchBackend } from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { ipcRenderer } from 'electron';

import TableDragTag from './tableDragTag';
import TableDropTarget from './tableDropTarget';
import ElDragDiv from './elDragDiv';
import ElDropTarget from './elDropTarget';
import Queue from './queue';
import queueActions from '../../../actions/queue';
import CreateQueue from './createQueue';
import CreateQueueElement from './createQueueElement';
import styles from './index.less';

const { Search } = Input;

class QueuePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            elementModalVisible: false,
        }
    }

    componentDidMount() {
        // ipcRenderer.on("getSequence-reply", (event, arg) => {
        //     this.props.queueActions.initElementFields(arg);
        // });
        ipcRenderer.on("selectQueueElementMsg-reply", (event, arg) => {
            if(arg.success) {
                this.props.queueActions.selectQueueElement(arg.data);
            } else {
                message.error("您还未开启排队子系统");
            }
        });
        // if(this.props.queue.queueList.length  === 0) {
            this.props.queueActions.listQueue({}).then(() => {
                ipcRenderer.send("selectQueueElement");
            });
        // }
        // ipcRenderer.on("saveQueueElement-reply", (event, arg) => {
        //     if (arg.id) {
        //         message.success("成功领号");
        //         this.props.queueActions.saveQueueElement(arg);
        //     } else {
        //         message.error("领号失败");
        //     }
        // });
    }

    refresh = () => {
        this.props.queueActions.listQueue({}).then(() => {
            ipcRenderer.send("selectQueueElement");
        });
    }

    componentWillUnmount() {
        // ipcRenderer.removeAllListeners("getSequence-reply");
        // ipcRenderer.removeAllListeners("selectQueueElement-reply");
        // ipcRenderer.removeAllListeners("saveQueueElement-reply");
        ipcRenderer.removeAllListeners("selectQueueElementMsg-reply");
    }

    handleModalVisible = (flag) => {
        // this.setState({ modalVisible: !!flag });
        message.warning("领号只能在排队系统中操作");
    }

    handleElementModalVisible = (flag, queue) => {
        message.warning("领号只能在排队系统中操作");
        return;
        /* if (flag) {
            ipcRenderer.send("getSequence", { queueId: queue.id, queueCode: queue.queueCode });
        }
        this.setState({ elementModalVisible: !!flag }); */
    }

    saveQueue = (values, callback) => {
        this.props.queueActions.saveQueue(values).then(() => {
            message.success("排队新建成功");
            this.handleModalVisible(false);
            callback();
        });
    }

    saveQueueElement = (values, callback) => {
        ipcRenderer.send("saveQueueElement", values);
        this.handleElementModalVisible(false);
        callback();
    }

    elementDragDrop = (elementQueue) => {
        message.warning("只能在排队系统中操作");
        // ipcRenderer.send("updateQueueElement2", elementQueue);
        // this.props.queueActions.updateQueueElement2(elementQueue);
    }

    onSearch = (value) => {
        // 找到锚点
        const anchorElement = document.getElementById(value);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
            anchorElement.scrollIntoView();
        } else {
            message.warn(`未找到${value}排队号`);
        }
    }

    /* deleteQueueById = (id) => {
        this.props.queueActions.deleteQueue({id}).then(data => {
            message.success("排队删除成功");
        });
    } */

    render() {
        const { modalVisible, elementModalVisible } = this.state;
        const { tableList, queueData, queueList, queueLoading, queueElementData, saveLoading } = this.props.queue;
        const { fieldChangeValue, elementFieldChangeValue, tableDragDrop, resetFields, resetElementFields } = this.props.queueActions;
        const queue = { id: 1, queueName: "排队K", description: '描述', waitTime: 15 };
        return (
            <Fragment>
                <div className={styles.queueContainer}>
                <Alert style={{marginBottom: 8}} message={"温馨提示：您只能在这里浏览排队信息，界面上的操作只能在排队系统中操作"} type="info" showIcon></Alert>
                    <Affix>
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
                            <div style={{ flex: 1 }}>
                                桌台颜色标识：
                                <Tag>空闲中</Tag>&nbsp;
                                <Tag color="#D9E7F3">入座下单中</Tag>&nbsp;
                                <Tag color="#E1CB88">待确定</Tag>&nbsp;
                                <Tag color="#BCE5B5">用餐中</Tag>&nbsp;
                                <Tag color="#E79D9E">打扫中</Tag>
                            </div>
                            <div style={{ width: 380, textAlign: 'right' }}>
                                <Button icon="reload" onClick={() => { this.refresh() }}>刷新</Button>
                                {/* <Search className={styles.extraContentSearch} placeholder="输入排队序号查找" onSearch={(value) => { this.onSearch(value) }} /> */}
                            </div>
                        </div>
                    </Affix>
                    <Spin spinning={queueLoading}>
                        <div className={styles.poolContainer}>
                            <div className={styles.title}>未入排队的桌台:</div>
                            <div className={styles.tablePool}>
                                <TableDropTarget queueId={0} tableDragDrop={tableDragDrop}>
                                    {
                                        tableList.length > 0 ?
                                        tableList.map(item => {
                                            return (
                                                <TableDragTag key={item.id} queueId={0} tableId={item.id} >
                                                    <Tooltip title={`${item.tableName}(${item.tableLimitName}桌)`}>
                                                        <Tag>{item.tableCode}</Tag>
                                                    </Tooltip>
                                                </TableDragTag>
                                            )
                                        }) : <span style={{color: "rgba(0, 0, 0, 0.45)"}}>把桌台拖动至此将从排队中移除</span>
                                    }
                                </TableDropTarget>
                            </div>
                        </div>

                        {
                            queueList.map(queue => {
                                return (
                                    <Queue key={queue.id}
                                        queue={queue}
                                        tableStatus={[]}
                                        dinnerStatus={[]}
                                        {...this.props.queueActions}
                                        handleModalVisible={this.handleElementModalVisible}
                                        elementDragDrop={this.elementDragDrop}
                                        deleteQueueById={this.deleteQueueById}
                                    >
                                    </Queue>
                                )
                            })
                        }
                        <div className={styles.queue}>
                            <Button icon="plus" className={styles.newQueue} onClick={() => { this.handleModalVisible(true) }}>新增排队</Button>
                        </div>
                    </Spin>

                    <CreateQueue handleModalVisible={this.handleModalVisible}
                        {...queueData}
                        modalVisible={modalVisible}
                        fieldChangeValue={fieldChangeValue}
                        confirmLoading={saveLoading}
                        resetFields={resetFields}
                        handleAdd={this.saveQueue}
                    >
                    </CreateQueue>

                    <CreateQueueElement handleModalVisible={this.handleElementModalVisible}
                        {...queueElementData}
                        modalVisible={elementModalVisible}
                        fieldChangeValue={elementFieldChangeValue}
                        confirmLoading={saveLoading}
                        resetFields={resetElementFields}
                        handleAdd={this.saveQueueElement}
                    >
                    </CreateQueueElement>
                </div>
            </Fragment>
        );
    }

}

const QueuePageWarpper = DragDropContext(HTML5Backend)(QueuePage);

export default connect((state) => {
    return {
        queue: state.queue,
    }
}, (dispatch) => {
    return {
        queueActions: bindActionCreators(queueActions, dispatch),
    }
})(QueuePageWarpper);