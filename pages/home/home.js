// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'index',
    panels: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onTabChange(event) {
    this.setData({
      activeTab: event.detail,
      panels: app.globalData.panels
    })
    if (this.data.activeTab == 'chat') {
      for (let i = 0; i < app.globalData.userMore[0].length; i++) {
        app.globalData.userMore[0][i].isShow = true
      }
      this.selectComponent('#chat').setData({
        comments: app.globalData.userMore[0],
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //获取信息
    app.pageGetUserInfo(this)
    //测试消息是否存在
    this.setData({
      panels: app.globalData.panels
    })
    var lists = app.globalData.userMore[0]
    var hasInfo = 'panels[2].dot'
    if (lists.length == 0) {
      this.setData({
        [hasInfo]: false
      })
    } else {
      this.setData({
        [hasInfo]: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      activeTab: this.data.activeTab,
      panels: app.globalData.panels,
    })
    if (this.data.activeTab == 'chat') {
      this.selectComponent('#chat').setData({
        comments: app.globalData.userMore[0],
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    console.log("刷新")
  },
})