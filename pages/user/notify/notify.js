// pages/personal/notify/notify.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseId: {},
        userInfo: {},
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        InputBottom: 0,
        inputInfo: '',
        dateTime: ''
    },
    InputFocus(e) {
        this.setData({
            InputBottom: e.detail.height,
        })
    },
    getInputInfo(e) {
        this.setData({
            inputInfo: e.detail.value
        })
    },
    InputBlur(e) {
        this.setData({
            InputBottom: 0
        })
    },
    //发送信息
    sendInfo(e) {
        console.log(this.data.inputInfo)
        var date = new Date();
        //时
        var h = date.getHours();
        //分
        var m = date.getMinutes();
        this.data.chooseId.comment.push({type: 1, content: this.data.inputInfo, time: new Date().getTime(), link: ''})
        this.setData({
            inputInfo: '',
            chooseId: this.data.chooseId
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取选择的用户-商家消息界面id
        var choose = null
        for (var i = 0; i < app.globalData.userMore[0].length; i++) {
            if (app.globalData.userMore[0][i].id == options.info) {
                this.setData({
                    chooseId: app.globalData.userMore[0][i],
                    userInfo: app.globalData.userInfo
                })
            }
        }

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