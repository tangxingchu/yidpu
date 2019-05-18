import React, { Component } from 'react';
import { Tag, Tooltip, Affix, Input, Button, Spin, message, notification } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { default as TouchBackend } from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { ipcRenderer } from 'electron';

import TableDragTag from './tableDragTag';
import TableDropTarget from './tableDropTarget';
import Queue from './queue';
import queueActions from '../../../actions/queue';
import basicConfigActions from '../../../actions/basicConfig';
import CreateQueue from './createQueue';
import CreateQueueElement from './createQueueElement';
import styles from './index.less';
import { getUid } from '../../../utils/authority';
import DinnerModal from './dinnerModal';

const { Search } = Input;

const tableColors = { 2: '#D9E7F3', 3: '#E1CB88', 4: '#BCE5B5', 5: '#E79D9E' };

class QueuePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            elementModalVisible: false,
            elementSelectedStyle: {},
            dinnerModalVisible: false,
            dinnerTableCodes: [],
        }
    }

    componentDidMount() {
        ipcRenderer.on("getSequence-reply", (event, arg) => {
            this.props.queueActions.initElementFields(arg);
        });
        ipcRenderer.on("selectQueueElement-reply", (event, arg) => {
            this.props.queueActions.selectQueueElement(arg);
        });
        if(this.props.queue.queueList.length  === 0) {
            this.props.queueActions.listQueue({}).then(() => {
                ipcRenderer.send("selectQueueElement");
                //查询桌台状态
                ipcRenderer.send("queryAllTableStatus");
            });
        }
        
        ipcRenderer.on("saveQueueElement-reply", (event, arg) => {
            if (arg.id) {
                const { currMerchantUser } = this.props.homePage;
                const { queueList } = this.props.queue;
                message.success("领号成功");
                ipcRenderer.on("printQueueElement-reply", (event, childArg) => {
                    ipcRenderer.removeAllListeners("printQueueElement-reply");
                    if(!childArg.success) {
                        message.error(childArg.message);
                    }
                });
                let beforeNumber = 0;
                for(let i = 0; i < queueList.length; i++) {
                    if(queueList[i].id == arg.queueId) {
                        beforeNumber = queueList[i].queueElements ? queueList[i].queueElements.length : 0;
                    }
                }
                ipcRenderer.send("printQueueElement", {data: {beforeNumber, queueSequence: arg.queueSequence, 
                    personNumber: arg.personNumber}, merchantUser: currMerchantUser});
                this.props.queueActions.saveQueueElement(arg);
            } else {
                message.error("领号失败");
            }
        });
        //更新桌台状态
        ipcRenderer.on("udpateTableStatusMsg", (event, arg) => {
            if(arg.status == 1) {//桌台空闲出来了
                var audio = new Audio('/sound/queue.mp3');
			    audio.play();
                notification.success({
                    message: '提示',
                    description: `桌台编号${arg.tableCode}已空闲，请安排顾客入座就餐。`,
                    duration: null,
                    placement: 'bottomRight',
                });
                const { queueList } = this.props.queue;
                let queueSequence = null;
                for(let i = 0; i < queueList.length; i++) {
                    let queue = queueList[i];
                    if(queue.tables) {
                        for(let j = 0; j < queue.tables.length; j++) {
                            if(queue.tables[j].tableCode == arg.tableCode) {
                                if(queue.queueElements && queue.queueElements.length > 0) {
                                    queueSequence = queue.queueElements[0].queueSequence;
                                }
                            }
                        }
                    }
                }
                if(queueSequence) {
                    this.setState({elementSelectedStyle: {...this.state.elementSelectedStyle, [queueSequence]: 'searchQueueElement'}});
                    window.setTimeout(() => {
                        this.setState({elementSelectedStyle: {...this.state.elementSelectedStyle, [queueSequence]: null}});
                    }, 4000);
                }
            }
            this.props.queueActions.updateTableStatus(arg);
        });
        //查询桌台状态
        ipcRenderer.on("queryAllTableStatusMsg", (event, arg) => {
            this.props.queueActions.updateTableStatus(arg);
        });
    }

    refresh = () => {
        this.props.queueActions.listQueue({}).then(() => {
            ipcRenderer.send("selectQueueElement");
            //查询桌台状态
            ipcRenderer.send("queryAllTableStatus");
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("queryAllTableStatusMsg");
        ipcRenderer.removeAllListeners("getSequence-reply");
        ipcRenderer.removeAllListeners("selectQueueElement-reply");
        ipcRenderer.removeAllListeners("saveQueueElement-reply");
        ipcRenderer.removeAllListeners("udpateTableStatusMsg");
    }

    handleModalVisible = (flag) => {
        this.setState({ modalVisible: !!flag });
    }

    handleDinnerModalVisible = (flag, queueId, id) => {
        this.queueElementId = id;
        this.queueId = queueId;
        let dinnerTableCodes = [];
        if(flag) {
            const { queueList, tableStatus } = this.props.queue;
            queueList.forEach(queue => {
                if(queue.id == queueId && queue.tables) {
                    queue.tables.forEach(table => {
                        //空闲
                        if(tableStatus[table.tableCode] == 1) {
                            dinnerTableCodes.push(table.tableCode);
                        }
                    });
                }
            });
            if(dinnerTableCodes.length == 0) {
                message.error("没有空闲桌台可以入座就餐");
                return;
            }
        }
        this.setState({ dinnerModalVisible: !!flag , dinnerTableCodes});
    }

    handleElementModalVisible = (flag, queue) => {
        if (flag) {
            ipcRenderer.send("getSequence", { queueId: queue.id, queueCode: queue.queueCode });
        }
        this.setState({ elementModalVisible: !!flag });
    }

    saveQueue = (values, callback) => {
        this.props.queueActions.saveQueue(values).then(() => {
            message.success("排队新建成功");
            this.handleModalVisible(false);
            callback();
        });
    }

    updateQueue = (values, callback) => {
        const queueData = {...values, merchantId: getUid()}
        this.props.queueActions.updateQueue(queueData).then(() => {
            message.success("排队修改成功");
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
        ipcRenderer.send("updateQueueElement2", elementQueue);
        this.props.queueActions.updateQueueElement2(elementQueue);
    }

    onSearch = (value) => {
        // 找到锚点
        const anchorElement = document.getElementById(value);
        this.setState({elementSelectedStyle: {...this.state.elementSelectedStyle, [value]: 'searchQueueElement'}});
        window.setTimeout(() => {
            this.setState({elementSelectedStyle: {...this.state.elementSelectedStyle, [value]: null}});
        }, 4000);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
            anchorElement.scrollIntoView();
        } else {
            message.warn(`未找到${value}排队号`);
        }
    }

    deleteQueueById = (id) => {
        this.props.queueActions.deleteQueue({id}).then(data => {
            message.success("排队删除成功");
            ipcRenderer.send("deleteQueueElementByQueueId", id);
        });
    }

    selectQueueById = (id) => {
        this.handleModalVisible(true);
        this.props.queueActions.selectQueueById(id);
    }

    deleteQueueElementById = (id, queueId) => {
        ipcRenderer.on('deleteQueueElementById-reply', (event, arg) => {
            this.props.queueActions.deleteQueueElementById(id, queueId);
            ipcRenderer.removeAllListeners("deleteQueueElementById-reply");
        });
        ipcRenderer.send("deleteQueueElementById", id);
    }

    handleConfirm = (values) => {
        this.deleteQueueElementById(this.queueElementId, this.queueId);
        //更新桌台状态
        ipcRenderer.send("udpateTableStatus", {tableCode: values.tableCode, status: 2});
        this.handleDinnerModalVisible(false);
    }

    render() {
        const { modalVisible, elementModalVisible, elementSelectedStyle, dinnerModalVisible, dinnerTableCodes } = this.state;
        const { tableList, queueData, queueList, queueLoading, selectQueueLoading, queueElementData, saveLoading, tableStatus } = this.props.queue;
        const { fieldChangeValue, elementFieldChangeValue, tableDragDrop, resetFields, resetElementFields } = this.props.queueActions;
        return (
            <div className={styles.queueContainer}>
                <Affix>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                            <Search className={styles.extraContentSearch} placeholder="输入排队序号查找" onSearch={(value) => { this.onSearch(value) }} />
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
                                        const color = tableStatus ? tableColors[tableStatus[item.tableCode]] : null;
                                        return (
                                            <TableDragTag key={item.id} queueId={0} tableId={item.id} >
                                                <Tooltip title={`${item.tableName}(${item.tableLimitName}桌)`}>
                                                    <Tag color={color}>{item.tableCode}</Tag>
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
                                    tableStatus={tableStatus}
                                    dinnerStatus={[]}
                                    {...this.props.queueActions}
                                    handleModalVisible={this.handleElementModalVisible}
                                    elementDragDrop={this.elementDragDrop}
                                    elementSelectedStyle={elementSelectedStyle}
                                    deleteQueueById={this.deleteQueueById}
                                    selectQueueById={this.selectQueueById}
                                    deleteQueueElementById={this.deleteQueueElementById}
                                    handleDinnerModalVisible={this.handleDinnerModalVisible}
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
                    handleUpdate={this.updateQueue}
                    selectQueueLoading={selectQueueLoading}
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

                <DinnerModal modalVisible={dinnerModalVisible} handleModalVisible={this.handleDinnerModalVisible}
                    tableCodes={dinnerTableCodes}
                    handleConfirm={this.handleConfirm}
                    tableCode={{value: dinnerTableCodes.length > 0 ? dinnerTableCodes[0] : null}}
                >
                </DinnerModal>
            </div>
        );
    }

}

const QueuePageWarpper = DragDropContext(HTML5Backend)(QueuePage);

export default connect((state) => {
    return {
        queue: state.queue,
        homePage: state.homePage,
    }
}, (dispatch) => {
    return {
        queueActions: bindActionCreators(queueActions, dispatch),
        basicConfigActions: bindActionCreators(basicConfigActions, dispatch),
    }
})(QueuePageWarpper);