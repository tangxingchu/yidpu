import React, { Component, Fragment } from 'react';
import { Tag, Tooltip, Icon, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TableDragTag from './tableDragTag';
import TableDropTarget from './tableDropTarget';
import ElDropTarget from './elDropTarget';
import ElDragDiv from './elDragDiv';
import styles from './index.less';

const tableColors = { 2: '#D9E7F3', 3: '#E1CB88', 4: '#BCE5B5', 5: '#E79D9E' };

export default class Queue extends Component {

    constructor(props) {
        super(props)
    }

    deleteQueueById = (id) => {
        Modal.confirm({
			title: '提示',
			content: '删除排队的同时会删除下面的队列信息，确定删除该排队信息吗？',
			onOk: () => {
				this.props.deleteQueueById(id);
			},
		});	
    }

    selectQueueById = (id) => {
        this.props.selectQueueById(id);
    }

    deleteQueueElementById = (id, queueId) => {
        Modal.confirm({
			title: '提示',
			content: '确定删除该队列信息吗？',
			onOk: () => {
				this.props.deleteQueueElementById(id, queueId);
			},
		});	
    }

    render() {
        //排队，桌子，用餐情况
        const { tableStatus, dinnerStatus, elementSelectedStyle, queue, tableDragDrop, elementDragDrop, handleModalVisible } = this.props;
        const { id, queueName, queueCode, averageWaitTime, description } = this.props.queue;
        const renderTableTip = (table) => {
            //1=空闲中、2=入座点菜中、3=待确认, 4=等待上菜用餐中、5=打扫中
            if (tableStatus[table.tableCode] && (tableStatus[table.tableCode] == 2 || tableStatus[table.tableCode] == 3 
                || tableStatus[table.tableCode] == 4)) {
                /* return `${table.tableName}(${table.tableLimitName}桌),
                用餐人数:${dinnerStatus[table.tableCode] ? dinnerStatus[table.tableCode].num : '未知'},
                已用餐时间(大概):${dinnerStatus[table.tableCode] ? dinnerStatus[table.tableCode].time : '未知'}`; */
                return `${table.tableName}(${table.tableLimitName}桌)`;
            } else {
                return `${table.tableName}(${table.tableLimitName}桌)`;
            }
        }

        return (
            <div className={styles.queue}>
                <div className={styles.left}>
                    <div className={styles.opreation}>
                        <Tooltip title={"修改排队名称"}>
                            <Icon type="edit" onClick={() => this.selectQueueById(id)}/>
                        </Tooltip>
                        <Tooltip title={"删除排队"}>
                            <Icon type="delete" onClick={() => this.deleteQueueById(id)}/>
                        </Tooltip>
                    </div>
                    <div className={styles.title}>
                        <Tooltip title={description}>
                            {queueName}
                        </Tooltip>
                    </div>
                    <div className={styles.tableContainer}>
                        <TableDropTarget queueId={id} tableDragDrop={tableDragDrop}>
                            {
                                queue.tables.map(table => {
                                    const color = tableStatus ? tableColors[tableStatus[table.tableCode]] : null;
                                    return (
                                        <TableDragTag queueId={id} key={table.id} tableId={table.id}>
                                            <Tooltip title={renderTableTip(table)}>
                                                <Tag color={color}>
                                                    {table.tableCode}
                                                </Tag>
                                            </Tooltip>
                                        </TableDragTag>
                                    )
                                })
                            }
                        </TableDropTarget>
                    </div>
                    <div className={styles.end}>
                        <Button type={"primary"} onClick={() => {handleModalVisible(true, queue)}}>领号</Button>
                    </div>
                </div>
                <ElDropTarget queueId={id} elementDragDrop={elementDragDrop} index={0}>
                    <Icon type="left" />
                </ElDropTarget>
                {
                    queue.queueElements ?
                        queue.queueElements.map((element, index) => {
                            return (
                                <Fragment key={element.id}>
                                    <ElDragDiv queueId={id} elementId={element.id} id={element.queueSequence}
                                        elementSelectedStyle={elementSelectedStyle[element.queueSequence]}
                                        >
                                        <div className={styles.itemSeq}>排队序号: {element.queueSequence}</div>
                                        <div>人数: {element.personNumber}</div>
                                        {/* <div>预计等待:{averageWaitTime ? averageWaitTime : '无法估算'} 分钟</div> */}
                                        <div><Button onClick={() => this.props.handleDinnerModalVisible(true, id, element.id)}>入座就餐</Button></div>
                                        <div style={{marginTop: 4}}><Button type="danger" onClick={() => this.deleteQueueElementById(element.id, id)}>删除</Button></div>
                                    </ElDragDiv>
                                    <ElDropTarget queueId={id} 
                                        elementDragDrop={elementDragDrop}
                                        index={index + 1}
                                        sortNo={element.sortNo}
                                        elementId={element.id}
                                    >
                                        <Icon type="left" />
                                    </ElDropTarget>
                                </Fragment>
                            )
                        }) : null
                }
            </div>
        );
    }

}