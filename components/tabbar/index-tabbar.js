// components/tabbar/index-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: String,
      value: 'index'
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
  //路由页面
  onChange(event) {
    this.setData({
      active:event.detail
    })
    wx.redirectTo({
      url: `/pages/${event.detail}/${event.detail}`,
    })
  }
  }
})
