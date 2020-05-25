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
    setTimeout(function () {
      that.setData({
        loading: true,
        wareHouses: app.globalData.userMore[1]
      })
    }, 500)

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
  isChecked(e){
   console.log(e) 
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


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