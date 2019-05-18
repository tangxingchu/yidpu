// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'all',
    allOrderLoading: true,
    allOrderList: null,
    allPaymentLoading: false,
    paymentOrderList: null,
    allRateLoading: false,
    rateOrderList: null,
    statusType: [
      { name: "全部订单", page: 0 },
      { name: "待支付", page: 0 },
      { name: "待评价", page: 0 }],
    currentType: 0,
    list: [[], [], [], [], []],
    goodsMap: [{}, {}, {}, {}, {}],
    logisticsMap: [{}, {}, {}, {}, {}],
    windowHeight: ''
  },

  onTabsChange(e) {
    const { key } = e.detail;
    if (key == "payment") {
      if(this.data.paymentOrderList == null) {
        this.setData({
          allPaymentLoading: true,
        });
        setTimeout(() => {
          this.setData({
            allPaymentLoading: false,
            paymentOrderList: [],
          });
        }, 200);
      }
    } else if (key == "rate") {
      if (this.data.rateOrderList == null) {
        this.setData({
          allRateLoading: true,
        });
        setTimeout(() => {
          this.setData({
            allRateLoading: false,
            rateOrderList: [],
          });
        }, 200);
      }
    }
    this.setData({
      currentTab: key,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({ allOrderLoading: false, allOrderList: []});
    }, 200)
    this.getList();
    var systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: systemInfo.windowHeight,
      currentType: options.id ? options.id : 0
    })
  },
  // 点击tab切换 
  swichNav: function (res) {
    if (this.data.currentType == res.detail.currentNum) return;
    this.setData({
      currentType: res.detail.currentNum
    })
  },
  bindChange: function (e) {
    this.setData({
      currentType: e.detail.current
    })
    if (!this.data.list[e.detail.current].length)
      this.getList();
  },
  getList() {
    var that = this;
    var postData = {
      token: app.globalData.token,
      status: that.data.currentType
    };
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})