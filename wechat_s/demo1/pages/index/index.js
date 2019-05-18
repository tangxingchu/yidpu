//index.js
const { indexInitUrl } = require('../../config/api.js');
//获取应用实例
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    location: "",
    //是否触底
    reachBottom: false,
    //幻灯片
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //轮播页当前index
    swiperCurrent: 0,
    //当前城市商家列表
    merchantList: [{
      id: 123,
      name: '商家1',
      defaultPhoto: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    }]
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    setTimeout(() => {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }, 2000)
  },
  onReachBottom: function() {
    this.setData({reachBottom: true});
  },
  getLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: (res) => {
        var longitude = res.longitude;
        var latitude = res.latitude;
        app.globalData.location = { "longitude": longitude, "latitude": latitude};
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=PM6BZ-UONR2-VPFUN-CHMNO-5HXVJ-SGFLT',
          success: (res) => {
            const { district, street } = res.data.result.address_component;
            this.setData({ location: district + street + '附近'});
          },
          fail: (res) => {
            console.log(res);
            this.setData({ location: '定位失败' });
          }
        });
        that.initData(app.globalData.location);        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSetting({ scope: "scope.userLocation", success: (result) => {
      if(result.authSetting["scope.userLocation"] == false) {
        that.initData();
        wx.showModal({
          title: '提示',
          content: '检测到您没打开一点谱的定位权限，打开定位权限能享受更好的体验。是否去设置打开？',
          success: function (res) {
            //点击“确认”时打开设置页面
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  console.log(res);
                }
              })
            } else {
            }
          }
        });
      } else {
        wx.authorize({
          scope: "scope.userLocation", success: (result) => {
            that.getLocation();
          }, fail: (result) => {
            //拒绝定位权限
            that.initData();
            /* 
            wx.showModal({
              title: '提示',
              content: '打开定位权限能享受更好的体验。是否去设置打开？',
              success: (res) => {
                //点击“确认”时打开设置页面
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      console.log(res);
                    }
                  })
                } else {
                }
              }
            }); */
          }
        });
      }
    }});   
    
    
  },
  // 搜索入口  
  wxSearchTab: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  initData: function(location) {
    const req = () => {
      wx.request({
        url: indexInitUrl,
        header: { "content-type": "application/x-www-form-urlencoded"},
        method: 'POST',
        data: 'pageNum=0&longitude=' + location.longitude + "&latitude=" + location.latitude,
        success: (res) => {
          console.log(res);
        },
        fail: (res) => {
          console.log(res);
        }
      })
    }
    req();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
