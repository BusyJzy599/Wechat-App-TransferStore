// pages/user/orderInfo/orderInfo.js
const app = getApp()
var amapFile = require('../../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    orderInfo: {},
    userOrderInfo: {},
    wareHouseOrderInfo: {},
    longitude: '106.475145',
    latitude: '29.577752',
    scale: 11,
    markers: [],
    polyline: [],
    basics: 0,
    modalName: null,
    modleTarget: -1,
    loading: true
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
    this.setData({
      modalName: 'info',
      modleTarget: e.markerId
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      modleTarget: -1
    })
  },
  //打开评分窗口
  openStars() {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({ orderInfo: app.getOrderInfo(options.orderId) })
    var userOrderInfo = this.data.orderInfo.dest
    if (this.data.orderInfo != {}) {
      var destination = this.data.orderInfo.dest.location.split(',')
      var warehouse = this.data.orderInfo.ware.location.split(',')
      //设置经纬度
      var mylongitude = (parseFloat(warehouse[0]) + parseFloat(destination[0])) / 2
      var mylatitude = (parseFloat(warehouse[1]) + parseFloat(destination[1])) / 2
      var myscale = 11
      var range = Math.abs((parseFloat(warehouse[0]) - parseFloat(destination[0])) * (parseFloat(warehouse[1]) - parseFloat(destination[1])))
      if (range >= 0.01)
        myscale = 10.5
      else if (range <= 0.005)
        myscale = 12.5
      console.log("显示的范围：" + range)
      var direction = destination[0] > warehouse[0] ? 'r' : 'l'
      var myMarket = []
      var myPolyline = []
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
    }
    //设置路线规划
    var myAmapFun = new amapFile.AMapWX({ key: app.globalData.gdkey });
    myAmapFun.getDrivingRoute({
      origin: warehouse[0] + ',' + warehouse[1],
      destination: destination[0] + ',' + destination[1],
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              if (that.data.orderInfo.status == 2 && j == parseInt(poLen.length / 2) && i == parseInt(steps.length / 2)) {
                myMarket.push({
                  id: 2,
                  iconPath: '/pages/img/fastmail_' + direction + '.png',
                  longitude: parseFloat(poLen[j].split(',')[0]),
                  latitude: parseFloat(poLen[j].split(',')[1]),
                  width: 28,
                  height: 30,
                })
              }
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        myPolyline = [{
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
        },
        {
          points: points,
          color: "#0091ff",
          width: 6
        }
        ]
        //设置data数据
        that.setData({
          polyline: myPolyline,
          markers: myMarket,
          longitude: mylongitude,
          latitude: mylatitude,
          scale: myscale,
          basics: that.data.orderInfo.status,
          userOrderInfo: userOrderInfo
        })
      },
      fail: function (data) {
        console.log(data)
      }
    })
    console.log(this.data.orderInfo)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
    this.setData({ loading: false })
  }
})