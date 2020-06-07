// pages/user/set/settings.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        sets: [{ content: '消息通知', icon: 'noticefill', color: 'blue', checked: false },
        { content: '权限设置', icon: 'repairfill', color: 'orange', checked: false },
        { content: '隐私', icon: 'attentionfill', color: 'grey', margin: true, checked: false },
        { content: '关于', icon: 'questionfill', color: 'olive', margin: true, checked: false },]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    onChange(e) {
        var id = e.currentTarget.dataset.id
        var newSet = this.data.sets
        newSet[id].checked = e.detail.value;
        this.setData({ sets: newSet })
        console.log(this.data.sets)
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
        var set = this.data.sets
        this.setData({ sets: set })
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