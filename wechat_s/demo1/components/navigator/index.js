// components/navigator.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //标题列表
    tList: {
      type: Array,
      value: []
    },
    //当前tab index
    currentTab: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal) {
        this.setData({
          currentTab: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 内部方法建议以下划线开头
    _swichNav: function(e) {
      //自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项
      this.triggerEvent('changeCurrent', {
        currentNum: e.currentTarget.dataset.current
      })
    }
  }
})