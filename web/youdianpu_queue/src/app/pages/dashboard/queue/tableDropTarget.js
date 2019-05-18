import React, { Component } from 'react';
import { Icon , Tag } from 'antd';
import { DropTarget } from 'react-dnd'

import { getUid } from '../../../utils/authority';
import styles from "./index.less";

class TableDropTarget extends Component {

    constructor(props) {
        super();
    }

    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        
        if (isOver && canDrop) {
            const { item } = this.props;
            return connectDropTarget(
                <div style={{width: "100%", height: "100%"}}>
                    <span className={styles.tagNomal}><Tag className={styles.dropOver}><Icon type="plus" />松开添加至此处</Tag></span>{this.props.children}
                </div>
            );
        } else {
            return connectDropTarget(
                <div style={{width: "100%", minHeight: 20}}>{this.props.children}</div>
            );
        }
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const queueTable = {queueId: props.queueId, tableId: item.tableId, merchantId: getUid(), oldQueueId: item.queueId}
        props.tableDragDrop(queueTable);
    },
    canDrop(props, monitor) {
        const item = monitor.getItem();
        //桌子自己所在的队列不允许拖放
        if (item.queueId === props.queueId) {
            return false;
        } else {
            return true;
        }
    },
    hover(props, monitor, component) {
        const { x, y } = monitor.getClientOffset()
        let offset = {
            left: x,
            top: y,
        }
    }
}

const collect = (connect, monitor) => {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem(),
    }
}

export default DropTarget('Tag', spec, collect)(TableDropTarget)