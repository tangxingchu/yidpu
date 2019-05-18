import React, { Component, Fragment } from 'react';
import { ipcRenderer } from 'electron';

import styles from './index.less'

const PlaceOrder = ({ children }) => {
    return <div className={styles.placeOrder}><span>>></span>{children}</div>;
}

const CancelOrder = ({ children }) => {
    return <div className={styles.cancelOrder}><span>>></span>{children}</div>;
}

const Info = ({ children }) => {
    return <div className={styles.info}><span>>></span>{children}</div>;
}

const SuccessInfo = ({ children }) => {
    return <div className={styles.successInfo}><span>>></span>{children}</div>;
}

const HighInfo = ({ children }) => {
    return <div className={styles.highInfo}><span>>></span>{children}</div>;
}

export default class LogPanel extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ipcRenderer.on('initSocketIo-reply', (event, arg) => {
            this.props.initSocketIo(arg);
            this.scrollLogDiv();
        });
        ipcRenderer.on('stopSocketIo-reply', (event, arg) => {
            this.props.stopSocketIo();
            this.scrollLogDiv();
        });
        ipcRenderer.on('log-info-messages', (event, arg) => {
            this.props.sendLogInfo(arg);
            this.scrollLogDiv();
        });
        this.scrollLogDiv();
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("initSocketIo-reply");
        ipcRenderer.removeAllListeners("stopSocketIo-reply");
        ipcRenderer.removeAllListeners("log-info-messages");
    }

    scrollLogDiv = () => {
        window.setTimeout(() => {
            if (this.logDiv) {
                this.logDiv.scrollTop = this.logDiv.scrollHeight;
            }
        }, 50);
    }

    render() {

        const { showTitle = true, info = []} = this.props;

        return (
            <div>
                {
                    showTitle ? <div className={styles.consoleTitle}>WIFI实时点餐:</div> : null
                }
                <div className={styles.console} ref={(logDiv) => this.logDiv = logDiv}>
                    <div className={styles.info}>
                        >>等待您启动服务......
                    </div>
                    {
                        info.map((item, idx) => {
                            switch (item.type) {
                                case "info":
                                    return <Info key={idx}>{item.msg}</Info>
                                    break;
                                case "placeOrder":
                                    return <PlaceOrder key={idx}>{item.msg}</PlaceOrder>
                                    break;
                                case "cancelOrder":
                                    return <CancelOrder key={idx}>{item.msg}</CancelOrder>
                                    break;
                                case "highInfo":
                                    return <HighInfo key={idx}>{item.msg}</HighInfo>
                                    break;
                                case "successInfo":
                                    return <SuccessInfo key={idx}>{item.msg}</SuccessInfo>
                                    break;
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}