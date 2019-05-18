import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Collapse } from 'antd';
import styles from './index.css';

const Panel = Collapse.Panel;

export default class AnalysisPage extends Component {

    constructor(props) {
        super(props);
    }

    configureStylesheet = (graph) => {
        let style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_IMAGE] = 'static/images/cmschina.png';
        style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
        this.graph.getStylesheet().putCellStyle('image', style);
    }

    hideSplash = () => {
        const splash = this.refs.splash;
        if (splash != null) {
            try {
                mxEvent.release(splash);
                mxEffects.fadeOut(splash, 100, true);
            }
            catch (e) {
                splash.parentNode.removeChild(splash);
            }
        }
    }

    componentDidMount() {
        if (!mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            mxUtils.error('Browser is not supported!', 200, false);
        } else {

            mxGraph.prototype.htmlLabels = true;
            mxConstants.DEFAULT_HOTSPOT = 1;
            // Enables guides
            mxGraphHandler.prototype.guidesEnabled = true;

            mxObjectCodec.allowEval = true;
            const node = mxUtils.load('/static/config/workfloweditor.xml').getDocumentElement();
            this.editor = new mxEditor(node);
            mxObjectCodec.allowEval = false;
            this.hideSplash();
            this.editor.graph.allowAutoPanning = true;
            

            var funct = function (graph, evt, cell, x, y) {
                if (graph.canImportCell(cell)) {
                    var parent = graph.getDefaultParent();
                    var vertex = null;

                    graph.getModel().beginUpdate();
                    try {
                        vertex = graph.insertVertex(parent, null, 'Hello', x, y, 80, 30);
                    }
                    finally {
                        graph.getModel().endUpdate();
                    }

                    graph.setSelectionCell(vertex);
                }
            }

            var earth = document.getElementById("earth");

            var dragImage = earth.cloneNode(true);
            dragImage.style.width = earth.naturalWidth;
            dragImage.style.height = earth.naturalHeight;
            mxUtils.makeDraggable(earth, this.editor.graph, funct, dragImage);
            return;
            this.graph = new mxGraph(this.refs.graphContainer);
            // this.graph.setBackgroundImage(new mxImage('static/images/gradient_background.jpg', 360, 200));
            // this.graph.maximumGraphBounds = new mxRectangle(0, 0, 360, 200);

            // // Resizes the container but never make it bigger than the background
            // this.graph.minimumContainerSize = new mxRectangle(0, 0, 360, 200);
            // this.graph.setResizeContainer(true);

            // Disables basic selection and cell handling
            //graph.setEnabled(false);
            this.configureStylesheet(this.graph);

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = this.graph.getDefaultParent();

            this.graph.getModel().beginUpdate();
            try {
                var v1 = this.graph.insertVertex(parent, null, '', 230, 10, 100, 100, 'image');
            }
            finally {
                // Updates the display
                this.graph.getModel().endUpdate();
            }

            this.hideSplash();
        }
    }

    callback = () => {

    }

    render() {
        const text = `
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
        `;

        return (
            <div>
                <table ref="splash" className={styles.splash}>
                    <tbody>
                        <tr>
                            <td align="center" valign="middle">
                                <img src="/static/images/loading.gif" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="toolbar" className={styles.toolbar}></div>
                <div id="graph" ref="graph" className={styles.graph}>
                </div>
                <div id="shape" className={styles.shape}>
                    <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                        <Panel header="餐桌" key="1">
                            <img id="earth" src="/static/images/test/4-table.png" style={{width: '48px', height: '48px'}}/>
                        </Panel>
                        <Panel header="隔离栏" key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="其他" key="3">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        );
    }

}