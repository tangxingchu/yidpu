import React, { Component, Fragment } from 'react';
import { Card, Radio, Input, Button, List, Table, Menu, Dropdown, Icon, Avatar, message, Popconfirm, Divider, Select } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import moment from 'moment';
import { ipcRenderer } from 'electron';
import numeral from 'numeral';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import goodsActions from '../../../actions/goods';
import goodsCategoryActions from '../../../actions/goodsCategory';
import styles from './index.less';
import { getUid } from '../../../utils/authority';
import { staticHost } from '../../../common/config';
import CreateForm from './createForm';
import { getBase64 } from '../../../utils/utils';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const Option = Select.Option;

class Goods extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: "",
            status: "",
            categories: [],
            networkPrinters: [],
        }
        this.preOpreation = null;
    }

    componentDidMount() {
        this.list();
        const { dictItemMap } = this.props.goods;
        if (!dictItemMap) {
            this.props.goodsActions.queryDict(["DICT_GOODS_UNIT"]);
        }
        const { categoryList } = this.props.goodsCategory;
        if (categoryList.length === 0) {
            this.props.goodsCategoryActions.list({});
        }
        ipcRenderer.on('listNetwordPrinter-reply', (event, arg) => {
            this.setState({networkPrinters: arg});
        });
        ipcRenderer.send("listNetwordPrinter");
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("listNetwordPrinter-reply")
    }

    list = () => {
        this.props.goodsActions.list({ pageSize: 10, pageNum: 1 });
    }

    handleModalVisible = (flag, operation) => {
        //保证编辑 取消之后 在添加显示的不是脏数据
        if (flag) {
            // if (this.preOpreation != operation && operation) {
                this.props.goodsActions.resetFields();
            // }
            // this.preOpreation = operation;
        }
        this.setState({ modalVisible: !!flag });
    }

    onPageChange = (page, pageSize) => {
        this.pageSize = pageSize;
        this.pageNum = page;
        this.props.goodsActions.list({ pageSize, pageNum: page });
    }

    onShowSizeChange = (current, size) => {
        this.pageSize = size;
        this.pageNum = current;
        this.props.goodsActions.list({ pageSize: size, pageNum: current });
    }

    save = (values, fileList, defaultImageIndex) => {

        const { activeKey } = this.props.goods;

        if(activeKey === "1") {
            let formData = new FormData();
            for (const pro in values) {
                if (values[pro] && pro != "defaultImage") {
                    formData.append(pro, values[pro]);
                }
            }
            formData.append("defaultImageIndex", defaultImageIndex);
            let defaultImageFile = null;
            if (fileList != null) {
                for (let i = 0; i < fileList.length; i++) {
                    if(defaultImageIndex == i) {
                        defaultImageFile = fileList[i].originFileObj;
                    }
                    formData.append("files", fileList[i].originFileObj);
                }
            }
            this.props.goodsActions.save(formData).then((id) => {
                message.success("商品主信息保存成功");
                this.props.goodsActions.list({ pageSize: 10, pageNum: 1 });
                this.handleModalVisible(false);

                const goods = {...values, id, merchantId: getUid()};
                ipcRenderer.send("saveGoods", goods);
                //本地存一张默认商品图片(供后厨系统显示)
                if(defaultImageFile) {
                    getBase64(defaultImageFile, (data) => {
                        ipcRenderer.send("saveGoodsDefaultImage", {goodsId: id, base64: data});
                    });
                }
            });
        } else {
            this.saveExtra();
        }
    }

    update = (values, fileList, removeFileIds, defaultImageIndex, defaultImageId) => {
        const { activeKey } = this.props.goods;

        if(activeKey === "1") {
            let formData = new FormData();
            for (const pro in values) {
                if (values[pro] && pro != "defaultImage") {
                    formData.append(pro, values[pro]);
                }
            }
            if (defaultImageId !== null) {
                formData.append("defaultImageId", defaultImageId);
            }
            if (defaultImageIndex !== null) {
                formData.append("defaultImageIndex", defaultImageIndex);
            }            
            formData.append("merchantId", getUid());
            if (fileList != null) {
                for (let i = 0; i < fileList.length; i++) {
                    formData.append("files", fileList[i].originFileObj);
                }
            }
            if (removeFileIds && removeFileIds.length > 0) {
                formData.append("delImage", removeFileIds.join(","));
            }
            // debugger;
            //找出需要缓存至本地的商品图片
            let defaultImageFile = null;
            //线上的商品图片
            if (defaultImageId !== null) {
                if (fileList != null) {
                    for (let i = 0; i < fileList.length; i++) {
                        if(fileList[i].uid == defaultImageId) {
                            defaultImageFile = fileList[i];
                            break;
                        }
                    }
                }
            }
            //本地准备新上传的商品图片
            if(defaultImageIndex !== null) {
                if (fileList != null) {
                    var index = 0;
                    for (let i = 0; i < fileList.length; i++) {
                        if(fileList[i].originFileObj != null && index == defaultImageIndex) {
                            defaultImageFile = fileList[i].originFileObj;
                            index++;
                            break;
                        }
                    }
                }
            }
            //console.log(fileList);
            //file.url 表示已上传的, file.originFileObj 还没有上传的文件
            //return;
            // console.log('defaultImageFile', defaultImageFile);
            this.props.goodsActions.update(formData).then(() => {
                message.success("商品主信息修改成功");
                this.props.goodsActions.list({ pageSize: this.pageSize || 10, pageNum: this.pageNum || 1 });
                this.handleModalVisible(false);
                const goods = {...values, merchantId: getUid()}
                ipcRenderer.send("updateGoods", goods);
                //本地存一张默认商品图片(供后厨系统显示)                
                if(defaultImageFile) {
                    //表示本地图片
                    if(!defaultImageFile.url) {
                        getBase64(defaultImageFile, (data) => {
                            ipcRenderer.send("saveGoodsDefaultImage", {goodsId: goods.id, base64: data});
                        });
                    } else {
                        ipcRenderer.send("saveGoodsDefaultImage", {goodsId: goods.id, url: defaultImageFile.url});
                    }
                } 
            });
        } else {
            this.saveExtra();
        }
    }

    saveExtra = () => {
        const { extraList, selectedExtraItems, goodsData } = this.props.goods;
        const saveMap = {};
        const saveExtraList = [];
        const goodsId = goodsData.id.value;
        extraList.forEach(item => {
            if(item.checked) {
                let newItem = {};
                newItem.goodsId = goodsId;
                newItem.extraId = item.id;
                newItem.extraCode = item.dictCode;
                newItem.extraName = item.dictName;
                const extraItems = selectedExtraItems[item.dictCode];
                const new_extraItems = [];
                extraItems.forEach(extraItem => {
                    let newObj = {};
                    newItem.extraId = item.id;
                    newObj.dictItemId = extraItem.id;
                    newObj.price = extraItem.price || 0;
                    new_extraItems.push(newObj);
                });
                saveMap[item.dictCode] = new_extraItems;
                saveExtraList.push(newItem);
            }
        });
        if ( saveExtraList.length === 0) {//清除所有附属属性
            this.props.goodsActions.deleteExtra(goodsId).then(() => {
                message.success("商品附属信息保存成功");
                ipcRenderer.send('deleteExtra', goodsId);
                this.handleModalVisible(false);
            });
        } else {
            saveMap["extra"] = saveExtraList;
            this.props.goodsActions.saveExtra(goodsId, saveMap).then(() => {
                message.success("商品附属信息保存成功");
                ipcRenderer.send('saveExtra', saveMap);
                this.handleModalVisible(false);
            });
        }
    }

    selectById = (id) => {
        // const { activeKey } = this.props.goods;
        // if(activeKey === "2") {
        //     this.props.goodsActions.selectById(id).then(data => {
        //         this.handleModalVisible(true);
        //     });
        // } else {
            this.handleModalVisible(true);
            this.props.goodsActions.initGoodsExtra(id).then(data => {
                
            });
        // }
    }

    rowClassName = (record, index) => {
        //已下架
        if (record.status === 0) {
            return styles.saleOffGoods;
        }
    }

    deleteGoods = (id) => {
        return this.props.goodsActions.deleteGoods({ id }).then((data) => {
            message.success(`删除成功.`);
            ipcRenderer.send("deleteGoods", {id});
        }).catch(e => {
            message.error(e.message);
            console.error(e);
        });
    }

    saleOff = (id, status) => {
        return this.props.goodsActions.saleOff({ id, status, merchantId: getUid() }).then((data) => {
            if (status === 0) {
                message.success(`商品下架成功.`);
            } else {
                message.success(`成功恢复上架.`);
            }
            ipcRenderer.send("saleOff", {id, status});
        }).catch(e => {
            message.error(e.message);
            console.error(e);
        });
    }

    onNameSearch = (value) => {
        const name = value;
        this.setState({ name });
        const { categories, status } = this.state;
        this.props.goodsActions.list({ pageSize: 10, pageNum: 1, name, status, categories });
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    onCategoryChange = (value) => {
        const categories = value;
        this.setState({ categories });
        const { name, status } = this.state;
        this.props.goodsActions.list({ pageSize: 10, pageNum: 1, name, status, categories });
    }

    onStatusChange = (e) => {
        const status = e.target.value;
        this.setState({ status });
        const { name, categories } = this.state;
        this.props.goodsActions.list({ pageSize: 10, pageNum: 1, name, status, categories });
    }

    reset = () => {
        this.setState({ name: "", status: "", categories: [] });
        this.list();
        this.props.goodsCategoryActions.list({});
    }

    onTabChange = (key) => {
        const { extraList } = this.props.goods;
        this.props.goodsActions.onTabChange(key);
        const { goodsData } = this.props.goods;
        if(key === "2" && extraList.length === 0) {
            this.props.goodsActions.initGoodsExtra(goodsData.id.value);
        }
    }

    onExtraChange = (e) => {
        const dictCode = e.target.value;
        const checked = e.target.checked;
        const { extraItems } = this.props.goods;
        if(!checked) {
            this.props.goodsActions.extraUnChecked(dictCode);
        } else {
            if(!extraItems[dictCode]) {
                this.props.goodsActions.listExtraItem(dictCode);
            } else {
                this.props.goodsActions.extraChecked(dictCode);
            }
        }  
    }

    onPriceChange = (value, dictCode, dictItemId) => {
        this.props.goodsActions.onPriceChange(value, dictCode, dictItemId);
    }

    removeGoodsImageFile = ({uid}) => {
        this.props.goodsActions.removeGoodsImageFile(uid);
    }

    render() {

        const { loading, detailLoading, goodsList, pageSize, total, currentPage, goodsData, saveLoading, fileList, extraList, extraItems, selectedExtraItems,
            dictItemMap = {}, activeKey } = this.props.goods;
        const { categoryList } = this.props.goodsCategory;
        const { fieldChangeValue, fileOnChange, resetFields } = this.props.goodsActions;
        const { modalVisible, name, status, categories, networkPrinters } = this.state;

        const extraContent = (
            <div className={styles.extraContent}>
                <span className={styles.extraContentLabel}>商品状态:</span>
                <RadioGroup value={status} onChange={this.onStatusChange}>
                    <RadioButton value="">所有</RadioButton>
                    <RadioButton value="0">已下架</RadioButton>
                    <RadioButton value="1">正常上架</RadioButton>
                </RadioGroup>
                <span className={styles.extraContentLabel}>商品分类:</span>
                <Select
                    mode="multiple"
                    style={{ width: 160 }}
                    value={categories}
                    onChange={this.onCategoryChange}
                >
                    {
                        categoryList.map(item => {
                            return (
                                <Option key={item.id} value={item.id}>{item.categoryName}</Option>
                            )
                        })
                    }
                </Select>
                <Search className={styles.extraContentSearch} placeholder="输入商品名称或拼音代码" value={name} onChange={this.onNameChange} onSearch={(value) => { this.onNameSearch(value) }} />
                <Button onClick={() => { this.reset() }}>
                    重置
                </Button>
            </div>
        );

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };

        /* const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>Owner</span>
                    <p>{owner}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>开始时间</span>
                    <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={styles.listContentItem}>
                    <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
                </div>
            </div>
        ); */

        const columns = [
            {
                title: '默认显示图片',
                dataIndex: 'defaultImagePath',
                key: 'defaultImagePath',
                render: (text, record) => (
                    <Avatar key={record.defaultImagePath} src={`${staticHost}${record.defaultImagePath}`} shape="square" size="large" />
                ),
            },
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品分类',
                dataIndex: 'categoryName',
                key: 'categoryName',
            },
            {
                title: '计量单位',
                dataIndex: 'unitName',
                key: 'unitName',
            },
            {
                title: '成本价格',
                dataIndex: 'costPrice',
                key: 'costPrice',
                sorter: (a, b) => a.costPrice - b.costPrice,
                render: (text, record) => (
                    <span>￥{numeral(record.costPrice).format('0,0.00')}</span>
                )
            },
            {
                title: '销售价格',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                render: (text, record) => (
                    <span>￥{numeral(record.price).format('0,0.00')}</span>
                )
            },
            {
                title: '剩余库存',
                dataIndex: 'inventory',
                key: 'inventory',
                sorter: (a, b) => a.inventory - b.inventory,
                render: (text, record) => (
                    <span>{numeral(record.inventory).format('0,0')}</span>
                )
            },
            {
                title: '商品状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    if (record.status === 0) {
                        return <span>已下架</span>
                    } else {
                        return <span>正常上架</span>
                    }
                }
            },
            {
                title: '商品描述',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <a href="javascript:;" onClick={() => { this.selectById(record.id) }}>编辑</a>
                        <Divider type="vertical" />
                        <MoreBtn record={record} />
                    </Fragment>
                ),
            },
        ];

        const menu = ({ record }) => {
            return (
                <Menu>
                    <Menu.Item>
                        {
                            record.status === 0 ?
                                <Popconfirm title="确定恢复上架吗？" okText="确定" cancelText="取消" onConfirm={() => { this.saleOff(record.id, 1) }}>
                                    <a href="javascript:;">恢复上架</a>
                                </Popconfirm>
                                :
                                <Popconfirm title="确定下架商品吗？" okText="确定" cancelText="取消" onConfirm={() => { this.saleOff(record.id, 0) }}>
                                    <a href="javascript:;">下架商品</a>
                                </Popconfirm>
                        }
                    </Menu.Item>
                    <Menu.Item>
                        <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteGoods(record.id) }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            )
        };

        const MoreBtn = (record) => {
            return (
                <Dropdown overlay={menu(record)}>
                    <a>
                        更多 <Icon type="down" />
                    </a>
                </Dropdown>
            )
        };

        return (
            <PageHeaderLayout
                title="商品管理"
                content="商品管理是对各类商品的名称、价格、照片、附属属性以及商品的上架、下架、库存管理。能方便顾客在手机微信或支付宝快速下单、服务员手机端下单、前台桌面端应用下单。"
            >
                <div className={styles.standardList}>
                    <Card
                        className={styles.listCard}
                        bordered={false}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                        extra={extraContent}
                    >
                        <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={() => { this.handleModalVisible(true, 'add') }}>
                            添加
                        </Button>
                        <Table rowKey={record => record.id}
                            columns={columns}
                            loading={loading}
                            dataSource={goodsList}
                            rowClassName={this.rowClassName}
                            pagination={paginationProps}
                        />
                        {/* <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            pagination={paginationProps}
                            dataSource={goodsList}
                            renderItem={item => (
                                <List.Item key={item.id} actions={[<a>编辑</a>, <MoreBtn />]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`${item.defaultImagePath}`} shape="square" size="large" />}
                                        title={<a href={item.href}>{item.name}</a>}
                                        description={item.description}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        /> */}
                    </Card>
                </div>
                <CreateForm modalVisible={modalVisible}
                    {...goodsData}
                    detailLoading={detailLoading}
                    confirmLoading={saveLoading}
                    handleModalVisible={this.handleModalVisible}
                    handleAdd={this.save}
                    handleUpdate={this.update}
                    fieldChangeValue={fieldChangeValue}
                    fileList={fileList}
                    resetFields={resetFields}
                    fileOnChange={fileOnChange}
                    categoryList={categoryList}
                    onTabChange={this.onTabChange}
                    extraList={extraList}
                    onExtraChange={this.onExtraChange}
                    extraItems={extraItems}
                    selectedExtraItems={selectedExtraItems}
                    dictItemMap={dictItemMap || {}}
                    activeKey={activeKey}
                    onPriceChange={this.onPriceChange}
                    removeFile={this.removeGoodsImageFile}
                    networkPrinters={networkPrinters}
                />
            </PageHeaderLayout>
        );
    }

}

export default connect((state) => {
    return {
        goods: state.goods,
        goodsCategory: state.goodsCategory,
    }
}, (dispatch) => {
    return {
        goodsActions: bindActionCreators(goodsActions, dispatch),
        goodsCategoryActions: bindActionCreators(goodsCategoryActions, dispatch),
    }
})(Goods);