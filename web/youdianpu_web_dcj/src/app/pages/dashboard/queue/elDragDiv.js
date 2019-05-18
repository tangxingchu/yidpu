import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import styles from './index.less';

class ElDragDiv extends Component {

    constructor(props) {
        super();
    }

    render() {
        const { isDragging, connectDragSource, id } = this.props;
        if (isDragging) {
            return connectDragSource(
                <div className={`${styles.right} ${styles.elDragging}`} id={id}>{this.props.children}</div>
            );
        } else {
            return connectDragSource(
                <div className={styles.right} id={id}>{this.props.children}</div>
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
        const item = { queueId: props.queueId, elementId: props.elementId, tagWidth: componentRect.width, tagHeight: componentRect.height};
        return item;
    }
}

const collect = function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

export default DragSource('Element', spec, collect)(ElDragDiv);