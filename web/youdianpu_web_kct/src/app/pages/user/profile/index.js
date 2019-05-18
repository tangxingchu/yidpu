import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Button } from 'antd';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Ellipsis from '../../../components/Ellipsis';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import homePageActions from '../../../actions/homePage';
import { getGrade } from '../../../utils/authority';
import styles from './index.less'
import grade1 from '../../../common/grade-1.png';
import grade2 from '../../../common/grade-2.png';
import grade3 from '../../../common/grade-3.png';
import grade4 from '../../../common/grade-4.png';

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const item = { title: 'title', description: 'description' };
        const { menuData } = this.props.homePage;
        return (
            <PageHeaderLayout
                title={"商家中心"}
                content="新用户从试用日期起，所有功能全部免费试用35天。另外会不定期免费开放一些功能菜单，望您随时关注。"
            >
                <Card className={styles.cardList}>
                    <Row gutter={16}>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24} >
                            <Card hoverable={getGrade() <= 1} className={`${styles.card} ${getGrade() == 1 ? styles.current : ''}`}>
                                <Card.Meta
                                    avatar={<img alt="" className={styles.cardAvatar} src={grade1} />}
                                    title={<a href="#">{"普通商家"}</a>}
                                    description={
                                        <Ellipsis className={styles.item} lines={3}>
                                            完全免费,但是只开放部分功能。
                                        </Ellipsis>
                                    }
                                />
                                <div>免费功能列表</div>
                                <ul>
                                    {
                                        menuData && menuData.map(item => {
                                            return item.children.map(childItem => {
                                                if(1 == parseInt(childItem.grade)) {
                                                    return <li key={childItem.id}>{childItem.name}</li>
                                                }
                                            })                                            
                                        })
                                    }
                                </ul>
                            </Card>
                        </Col>
                        {/* <Col xl={6} lg={12} md={12} sm={24} xs={24} >
                            <Card hoverable className={`${styles.card} ${getGrade() == 2 ? styles.current : ''}`}>
                                <Card.Meta
                                    avatar={<img alt="" className={styles.cardAvatar} src={grade2} />}
                                    title={<a href="#">{"银牌会员"}</a>}
                                    description={
                                        <Ellipsis className={styles.item} lines={3}>
                                            拥有普通会员所有功能
                                        </Ellipsis>
                                    }
                                />
                                <div>其它</div>
                                <ul>
                                    <li>
                                        分析页
                                    </li>
                                    <li>
                                        运营规则配置
                                    </li>
                                    <li>
                                        运营分析
                                    </li>
                                    <li>
                                        子账号管理
                                    </li>
                                    <li>
                                        员工管理
                                    </li>
                                    <li>
                                        角色授权
                                    </li>
                                    <li>
                                        子账号授权
                                    </li>
                                    <li>
                                        收(退)款流水
                                    </li>
                                </ul>
                            </Card>
                        </Col> */}
                        <Col xl={8} lg={12} md={12} sm={24} xs={24} >
                            <Card hoverable={getGrade() <= 3} className={`${styles.card} ${getGrade() == 3 ? styles.current : ''}`}>
                                <Card.Meta
                                    avatar={<img alt="" className={styles.cardAvatar} src={grade3} />}
                                    title={<a href="#">{"黄金商家"}</a>}
                                    description={
                                        <Ellipsis className={styles.item} lines={3}>
                                            拥有普通商家所有功能
                                        </Ellipsis>
                                    }
                                />
                                <div className={styles.content}>
                                    <div>
                                        <div>另外还享有</div>
                                        <ul>
                                            {
                                                menuData && menuData.map(item => {
                                                    return item.children.map(childItem => {
                                                        if(3 == parseInt(childItem.grade)) {
                                                            if(childItem.id == 14) {
                                                                return <li key={childItem.id}>{childItem.name}(限10个子账户)</li>
                                                            } else {
                                                                return <li key={childItem.id}>{childItem.name}</li>
                                                            }                                                    
                                                        }
                                                    })                                            
                                                })
                                            }
                                            <li>
                                                7*12小时的在线服务
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className={styles.userUpdater}>
                                        <div className={styles.info}>￥<span>18</span>/天</div>
                                        <div className={styles.button}><Button style={{display: getGrade() < 3 ? '' : 'none'}}>升级为黄金会员</Button></div>
                                    </div> */}
                                </div>
                            </Card>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24} >
                            <Card hoverable={getGrade() <= 4} className={`${styles.card} ${getGrade() == 4 ? styles.current : ''}`}
                            >
                                <Card.Meta
                                    avatar={<img alt="" className={styles.cardAvatar} src={grade4} />}
                                    title={<a href="#">{"钻石商家"}</a>}
                                    description={
                                        <Ellipsis className={styles.item} lines={3}>
                                            拥有黄金商家所有功能。
                                        </Ellipsis>
                                    }
                                />
                                <div className={styles.content}>
                                    <div>
                                        <div>另外还享有</div>
                                        <ul>
                                            {
                                                menuData && menuData.map(item => {
                                                    return item.children.map(childItem => {
                                                        if(4 == parseInt(childItem.grade)) {
                                                            return <li key={childItem.id}>{childItem.name}</li>
                                                        }
                                                    })                                            
                                                })
                                            }
                                            <li>
                                                子账户管理(不限个数)
                                            </li>
                                            <li>
                                                享有特殊功能优先定制化开发权益
                                            </li>
                                            <li>
                                                7*24小时的在线服务
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className={styles.userUpdater}>
                                        <div className={styles.info}>￥<span>26</span>/天</div>
                                        <div className={styles.button}>
                                            <Button style={{display: getGrade() < 4 ? '' : 'none'}}>升级为钻石会员</Button>
                                        </div>
                                    </div> */}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" style={{textAlign: 'center',}}>
                            <Button onClick={() => {this.props.history.go(-1)}}>返回</Button>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        homePage: state.homePage,
    }
}, (dispatch) => {
    return {
        homePageActions: bindActionCreators(homePageActions, dispatch),
    }
})(Profile));