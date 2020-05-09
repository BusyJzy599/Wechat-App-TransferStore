// pages/user/orderInfo/orderInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    orderInfo: {},
    longitude: '106.475145',
    latitude: '29.577752',
    scale: 11,
    markers: [],
    polyline: [],
    basics: 0,
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  },
  //展示点击信息
  showOrderInfo(e) {
    console.log(e)
  },
  //打开评分窗口
  openStars(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < app.globalData.userMore[3].length; i++) {
      if (app.globalData.userMore[3][i].id == options.orderId)
        this.setData({ orderInfo: app.globalData.userMore[3][i] })
    }
    if (this.data.orderInfo != {}) {
      var destination = this.data.orderInfo.destination_lo.split(',')
      var warehouse = this.data.orderInfo.warehouse_lo.split(',')
      //设置经纬度
      var mylongitude = (parseFloat(warehouse[0]) + parseFloat(destination[0])) / 2
      var mylatitude = (parseFloat(warehouse[1]) + parseFloat(destination[1])) / 2
      var myscale = 11
      var range = Math.abs((parseFloat(warehouse[0]) - parseFloat(destination[0])) * (parseFloat(warehouse[1]) - parseFloat(destination[1])))
      if (range >= 0.01)
        myscale = 10
      else if (range <= 0.005)
        myscale = 12
      console.log("显示的范围：" + range)

      var myMarket = []
      var myPolyline = [{
        points: [{
          longitude: warehouse[0],
          latitude: warehouse[1]
        }, {
          longitude: destination[0],
          latitude: destination[1]
        }],
        color: "#f26e16",
        width: 3,
        dottedLine: true
      }]
      for (var i = 0; i < 2; i++) {
        myMarket.push({
          id: i,
          iconPath: i == 0 ? "/pages/img/destination.png" : "/pages/img/warehouse.png",
          longitude: i == 0 ? destination[0] : warehouse[0],
          latitude: i == 0 ? destination[1] : warehouse[1],
          width: 28,
          height: 30,
          callout: {
            content: i == 0 ? '收货地址' : '中转仓',
            color: '#10aea3',  //文本颜色
            borderRadius: 5,  //边框圆角
            borderWidth: 1,  //边框宽度
            borderColor: '#10aea3',  //边框颜色
            bgColor: '#ffffff',  //背景色
            padding: 5,  //文本边缘留白
            display: "ALWAYS",
          }
        })
      }
      this.setData({
        polyline: myPolyline,
        markers: myMarket,
        longitude: mylongitude,
        latitude: mylatitude,
        scale: myscale,
        basics: this.data.orderInfo.status
      })
      console.log(this.data.scale)
      console.log(this.data.polyline)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
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