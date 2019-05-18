import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Button, Divider, Table, Popconfirm, Tooltip, Icon, InputNumber } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import styles from './index.less';

export default class MonitorPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 8,
            xl: 6,
            style: { marginBottom: 24 },
        };

        return (
            <Fragment>
                <Row gutter={24} className={styles.container}>
                    <Col {...topColResponsiveProps} className={styles.ruleDsiabled}>
                        <Card title={"桌台编号A01"}
                        >
                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps} className={styles.ruleDsiabled}>
                        <Card title={"桌台编号A02"}
                        >
                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps} className={styles.ruleDsiabled}>
                        <Card title={"桌台编号B01"}
                        >
                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps} className={styles.ruleDsiabled}>
                        <Card title={"桌台编号C01"}
                        >
                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps} className={styles.ruleDsiabled}>
                        <Card title={"桌台编号A03"}
                        >
                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps} className={styles.ruleDsiabled}>
                        <Card title={"桌台编号D05"}
                        >
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }

}