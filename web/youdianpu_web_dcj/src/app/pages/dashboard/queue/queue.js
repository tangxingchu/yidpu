import React, { Component, Fragment } from 'react';
import { Tag, Tooltip, Icon, Button, message } from 'antd';

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
        /* Modal.confirm({
			title: '提示',
			content: '删除排队的同时会删除下面的队列，确定删除该排队信息吗？',
			onOk: () => {
				this.props.deleteQueueById(id);
			},
        });	 */
        message.warning("领号只能在排队系统中操作");
    }

    modifyQueue = () => {
        message.warning("领号只能在排队系统中操作");
    }

    render() {
        //排队，桌台，用餐情况
        const { tableStatus, dinnerStatus, queue, tableDragDrop, elementDragDrop, handleModalVisible } = this.props;
        const { id, queueName, queueCode, averageWaitTime, description } = this.props.queue;

        const renderTableTip = (table) => {
            //==2 下单中, ==3用餐中
            if (tableStatus[table.tableCode] && (tableStatus[table.tableCode] == 2 || tableStatus[table.tableCode] == 3)) {
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
                            <Icon type="edit" onClick={() => this.modifyQueue()}/>
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
                                    <ElDragDiv queueId={id} elementId={element.id} id={element.queueSequence}>
                                        <div className={styles.itemSeq}>排队序号: {element.queueSequence}</div>
                                        <div>人数: {element.personNumber}</div>
                                        {/* <div>预计等待:{averageWaitTime ? averageWaitTime : '无法估算'} 分钟</div> */}
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