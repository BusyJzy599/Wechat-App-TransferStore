// pages/user/order/order.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        show: {}
    },
    checkOrderInfo(e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/user/orderInfo/orderInfo?orderId=' + e.currentTarget.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var lists = app.getOrder()
        var s = {}
        if (options.status == 0)
            s = {title: '未发货订单', content: '未发货', icon: {name: 'timefill', color: 'red'}, data: lists[0]}
        else if (options.status == 2)
            s = {title: '派送订单', content: '派送中', icon: {name: 'deliver_fill', color: 'blue'}, data: lists[1]}
        else if (options.status == 3)
            s = {title: '历史订单', content: '已签收', icon: {name: 'roundcheckfill', color: 'green'}, data: lists[2]}
        this.setData({
            show: s
        })
        console.log("进入")
        console.log(options.status)
        console.log(this.data.show)

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