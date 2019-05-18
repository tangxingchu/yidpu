import React, { Component, Fragment } from 'react';
import { Icon, Tag } from 'antd';
import { DropTarget } from 'react-dnd'

import styles from "./index.less";

class ElDropTarget extends Component {

    constructor(props) {
        super();
    }

    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;

        if (isOver && canDrop) {
            const { item } = this.props;
            return connectDropTarget(
                <div style={{ display: 'flex' }}>
                    <div className={styles.arrow}>
                        <Icon type="left" />
                    </div>
                    <div className={`${styles.right}`} style={{ width: item.tagWidth }}>
                        <Icon type="plus" />松开添加至此处
                    </div>
                    <div className={styles.arrow}>
                        <Icon type="left" />
                    </div>
                </div>
            );
        } else {
            return connectDropTarget(
                <div className={styles.arrow}>{this.props.children}</div>
            );
        }
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const queueElement = { id: item.elementId, queueId: props.queueId, 
            oldQueueId: item.queueId, index: props.index, dropElementId: props.elementId,
            dropElementSortNo: props.sortNo };
        props.elementDragDrop(queueElement);
    },
    canDrop(props, monitor) {
        const item = monitor.getItem();
        //桌台自己所在的队列不允许拖放
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

export default DropTarget('Element', spec, collect)(ElDropTarget)