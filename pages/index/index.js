//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    student:[
      {id:1,name:'季喆熠'},
      {id:2,name:'文文'}
    ],
    activeNames: ['1'],
    "bnrUrl": [{
      "url": "../img/beijing.jpg"
    }, {
      "url": "../img/beijing.jpg"
    }, {
      "url":  "../img/beijing.jpg"
    }, {
      "url":  "../img/beijing.jpg"
    }]
  },
  onChange(event) {
    this.setData({ active: event.detail });
    if(event.detail==1){
      wx.navigateTo({
        url: '../seller/seller',
      })
    }
  },
  onChange1(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      //设置data内数据
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //页面加载完成后触发
  onReady:function(){
    wx.setNavigationBarTitle({
      title: 'Welcome ',
    })

  },
  //页面卸载
  onUnload:function(){
    //用于保存页面状态(保存未完成的数据)
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfov
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tabHandle:function(e){
    console.log(e)
    console.log(e.id)
  },
  inputChange(e){
    console.log(e.detail.value)
  }
})
