//app.js
const { loginUrl } = require('./config/api.js');
App({  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.showLoading({ title: "登录中", mask: true})
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${loginUrl}?code=${res.code}`,
          success: (result) => {
            this.globalData.token = result.data;
          },
          fail: (result) => {
            wx.showToast({
              title: '网络异常！',
              duration: 2000,
              icon: 'none',
            });
          },
          complete: function() {
            wx.hideLoading();
          }
        });
      }
    });    
  },
  globalData: {
    userInfo: null
  }
})