import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import styles from './index.less';

class TableDragTag extends Component {

    constructor(props) {
        super();
    }

    render() {
        const { isDragging, connectDragSource } = this.props;
        if (isDragging) {
            return connectDragSource(
                <span className={`${styles.tagNomal} ${styles.tagDragging}`}>{this.props.children}</span>
            );
        } else {
            return connectDragSource(
                <span className={styles.tagNomal}>{this.props.children}</span>
            );
        }
    }
}

const spec = {
    canDrag(props, monitor) {
        return true;
    },
    beginDrag(props, monitor, component) {
        const componentRect = findDOMNode(component).getBoundingClientRect();
        const item = { queueId: props.queueId, tableId: props.tableId, tagWidth: componentRect.width, tagHeight: componentRect.height};
        return item;
    }
}

const collect = function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

export default DragSource('Tag', spec, collect)(TableDragTag);