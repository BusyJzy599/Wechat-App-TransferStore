// pages/seller/myTransfer/myTransfer.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    wareHouses: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var w = app.globalData.myWareHouse
    var info = []
    var wh = {}
    for (var i in w) {
      wh = app.getWareHouseInfo(w[i].id)
      for (var j in w[i].ware) {
        w[i].ware[j].info = app.getGood(w[i].ware[j].id)
      }
      info.push({ index: w[i], ware: wh })
    }
    setTimeout(function () {
      that.setData({
        loading: true,
        wareHouses: info
      })
    }, 500)

  },
  onPullDownRefresh: function () {
    this.onLoad();
  },
  showModal(e) {
    var c = []
    var w = this.data.wareHouses
    for (var i = 0; i < w.length; i++) {
      if (w[i].id == e.currentTarget.dataset.id)
        c = w[i].ware
    }
    console.log(c)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      chooseId: e.currentTarget.dataset.id,
      chooseWare: c
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  isChecked(e) {
    console.log(e)
  },

  
})