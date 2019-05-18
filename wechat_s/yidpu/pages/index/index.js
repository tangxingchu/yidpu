//index.js
const {
  indexInitUrl
} = require('../../config/api.js');
const { staticHost } = require('../../config/config.js');
//获取应用实例
const app = getApp();
Page({
  data: {
    staticHost: staticHost,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperImages: [],
    location: "定位中...",
    //是否触底
    reachBottom: false,
    //幻灯片
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //当前城市商家列表
    merchantList: [{
      id: 123,
      name: '商家1',
      defaultPhoto: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    }],
    selectedNav: '00',
    showspinner: false,
    rank: [{
        name: '人气最高',
        id: 'c01',
      },
      {
        name: '评价最好',
        id: 'c02',
      },
      {
        name: '人均最低',
        id: 'c03',
      },
      {
        name: '人均最高',
        id: 'c04',
      },
    ],
    spinners: [],
    storelist: [{
        name: '仁和春天酒店·婚宴',
        photo: 'http://p0.meituan.net/wedding/d577b0c3f3f5c382f7b33ed0d54366843826610.jpg%40630w_380h_1e_1c_1l%7Cwatermark%3D0',
        star: 4.4,
        price: '1599元/桌起',
        buztype: '星级酒店',
        km: '1.6km',
      },
      {
        name: '真品婚礼定制',
        photo: 'http://p0.meituan.net/wedding/87b374004a26ac7d5e1cfd82ba8c73a33341812.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 2.8,
        price: '￥8000',
        buztype: '婚庆公司',
        km: '2.1km',
      },
      {
        name: 'SHINE茜恩婚纱(滨江店)',
        photo: 'http://p0.meituan.net/wedding/a2300d1d4d959296c3fdacaca27d9e931510025.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 1.1,
        price: '￥9000',
        buztype: '婚纱礼服',
        km: '3.2km',
      },
      {
        name: '风尚国际婚纱(外景领导品牌)',
        photo: 'http://p1.meituan.net/wedding/93103e7f5b18b92a80374650ca33c4ca2012836.jpg%40640w_480h_0e_1l%7Cwatermark%3D0',
        star: 3.5,
        price: '￥4888',
        buztype: '影楼',
        km: '4.5km',
      },
      {
        name: '仁和春天酒店·婚宴',
        photo: 'http://p0.meituan.net/wedding/d577b0c3f3f5c382f7b33ed0d54366843826610.jpg%40630w_380h_1e_1c_1l%7Cwatermark%3D0',
        star: 4.4,
        price: '1599元/桌起',
        buztype: '星级酒店',
        km: '1.6km',
      },
      {
        name: '真品婚礼定制',
        photo: 'http://p0.meituan.net/wedding/87b374004a26ac7d5e1cfd82ba8c73a33341812.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 2.8,
        price: '￥8000',
        buztype: '婚庆公司',
        km: '2.1km',
      },
      {
        name: 'SHINE茜恩婚纱(滨江店)',
        photo: 'http://p0.meituan.net/wedding/a2300d1d4d959296c3fdacaca27d9e931510025.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 1.1,
        price: '￥9000',
        buztype: '婚纱礼服',
        km: '3.2km',
      },
      {
        name: '风尚国际婚纱(外景领导品牌)',
        photo: 'http://p1.meituan.net/wedding/93103e7f5b18b92a80374650ca33c4ca2012836.jpg%40640w_480h_0e_1l%7Cwatermark%3D0',
        star: 3.5,
        price: '￥4888',
        buztype: '影楼',
        km: '4.5km',
      },
      {
        name: '仁和春天酒店·婚宴',
        photo: 'http://p0.meituan.net/wedding/d577b0c3f3f5c382f7b33ed0d54366843826610.jpg%40630w_380h_1e_1c_1l%7Cwatermark%3D0',
        star: 4.4,
        price: '1599元/桌起',
        buztype: '星级酒店',
        km: '1.6km',
      },
      {
        name: '真品婚礼定制',
        photo: 'http://p0.meituan.net/wedding/87b374004a26ac7d5e1cfd82ba8c73a33341812.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 2.8,
        price: '￥8000',
        buztype: '婚庆公司',
        km: '2.1km',
      },
      {
        name: 'SHINE茜恩婚纱(滨江店)',
        photo: 'http://p0.meituan.net/wedding/a2300d1d4d959296c3fdacaca27d9e931510025.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 1.1,
        price: '￥9000',
        buztype: '婚纱礼服',
        km: '3.2km',
      },
      {
        name: '风尚国际婚纱(外景领导品牌)',
        photo: 'http://p1.meituan.net/wedding/93103e7f5b18b92a80374650ca33c4ca2012836.jpg%40640w_480h_0e_1l%7Cwatermark%3D0',
        star: 3.5,
        price: '￥4888',
        buztype: '影楼',
        km: '4.5km',
      },
      {
        name: '仁和春天酒店·婚宴',
        photo: 'http://p0.meituan.net/wedding/d577b0c3f3f5c382f7b33ed0d54366843826610.jpg%40630w_380h_1e_1c_1l%7Cwatermark%3D0',
        star: 4.4,
        price: '1599元/桌起',
        buztype: '星级酒店',
        km: '1.6km',
      },
      {
        name: '真品婚礼定制',
        photo: 'http://p0.meituan.net/wedding/87b374004a26ac7d5e1cfd82ba8c73a33341812.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 2.8,
        price: '￥8000',
        buztype: '婚庆公司',
        km: '2.1km',
      },
      {
        name: 'SHINE茜恩婚纱(滨江店)',
        photo: 'http://p0.meituan.net/wedding/a2300d1d4d959296c3fdacaca27d9e931510025.jpg%40640w_480h_1e_1c_1l%7Cwatermark%3D0',
        star: 1.1,
        price: '￥9000',
        buztype: '婚纱礼服',
        km: '3.2km',
      },
      {
        name: '风尚国际婚纱(外景领导品牌)',
        photo: 'http://p1.meituan.net/wedding/93103e7f5b18b92a80374650ca33c4ca2012836.jpg%40640w_480h_0e_1l%7Cwatermark%3D0',
        star: 3.5,
        price: '￥4888',
        buztype: '影楼',
        km: '4.5km',
      },
    ]
  },
  //轮播图点击事件
  swipclick: function(e) {
    console.log(e.currentTarget.id);
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
    this.setData({
      reachBottom: true
    });
  },
  getLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: (res) => {
        var longitude = res.longitude;
        var latitude = res.latitude;
        app.globalData.location = {
          "longitude": longitude,
          "latitude": latitude
        };
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=PM6BZ-UONR2-VPFUN-CHMNO-5HXVJ-SGFLT',
          success: (res) => {
            const {
              district,
              street
            } = res.data.result.address_component;
            const {
              city,
              city_code
            } = res.data.result.ad_info;
            this.setData({
              location: city
            });
            app.globalData.city = {
              cityName: city,
              cityCode: city_code
            };
          },
          fail: (res) => {
            this.setData({
              location: '定位失败'
            });
          }
        });
        that.initData(app.globalData.location);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function() {
    var that = this;
    wx.getSetting({
      scope: "scope.userLocation",
      success: (result) => {
        if (result.authSetting["scope.userLocation"] == false) {
          that.initData();
          this.setData({
            location: '定位失败'
          });
          wx.showModal({
            title: '提示',
            content: '检测到您没打开一点谱的定位权限，打开定位权限能享受更好的体验。是否去设置打开？',
            success: function(res) {
              //点击“确认”时打开设置页面
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    console.log(res);
                  }
                })
              } else {}
            }
          });
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success: (result) => {
              that.getLocation();
            },
            fail: (result) => {
              //拒绝定位权限
              that.initData();
              this.setData({
                location: '定位失败'
              });
            }
          });
        }
      }
    });
    //模拟数据
    wx.request({
      url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/filter",
      method: "GET",
      success: function(res) {
        that.setData({
          restaurant: res.data.data.restaurant,
        })
      }
    });
  },
  //页面显示事件
  onShow: function() {
    console.log('显示');
  },
  // 搜索入口  
  wxSearchTab: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 选择城市入口
  switchLocation: function() {
    wx.navigateTo({
      url: '../switchcity/switchcity'
    })
  },
  initData: function(location) {
    let params = 'pageNum=0';
    if (location) {
      params += '&longitude=' + location.longitude + "&latitude=" + location.latitude;
    }
    const req = () => {
      wx.request({
        url: indexInitUrl,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: params,
        success: (res) => {
          console.log(res.data);
          this.setData({
            swiperImages: res.data.swiperImages,
            merchantList: res.data.merchantVos.items,
          });
        },
        fail: (res) => {
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none',
          });
        }
      })
    }
    req();
  },
  navitation(event) {
    let id = event.currentTarget.dataset.id;
    if (id == '01') {
      // temps = that.data.sort;
      console.log('默认排序');
      return;
    }
    const that = this;
    if (id == that.data.selectedNav) {
      id = '00';
      that.setData({
        showspinner: false,
      })
    } else {
      that.setData({
        showspinner: true,
      })
    }
    that.setData({
      selectedNav: id,
    })
    let temps = that.data.spinners;
    if (id == '03') {
      temps = that.data.rank;
    } else if (id == '02') {
      temps = that.data.nearby;
    }
    that.setData({
      spinners: temps,
    })
  },
  //跳转详情
  storelick(event) {
    const that = this;
    wx.navigateTo({
      url: '../store/store',
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})