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
        choose: 0,
        index: 0,
        picker: [],
        add: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        var w = app.globalData.myWareHouse
        var picker = []
        var info = []
        var wh = {}
        for (var i in w) {
            wh = app.getWareHouseInfo(w[i].id)
            for (var j in w[i].ware) {
                w[i].ware[j].info = app.getGood(w[i].ware[j].id)
            }
            info.push({ index: w[i], ware: wh })
            picker.push(wh.name)
        }
        setTimeout(function () {
            that.setData({
                loading: true,
                wareHouses: info,
                picker: picker
            })
        }, 500)
        console.log(info)
    },
    makeSure(){
        this.hideModal()
        var type=this.data.choose
        wx.showToast({
          title: type==0?'请尽快发货':'仓库会尽快调配'
        })
    },
    addGood(e) {
        var good = this.data.add
        good.push(0)
        this.setData({ add: good })
    },
    deleteGood(e) {
        var key = e.currentTarget.dataset.key
        console.log(key)
        var newadd = this.data.add
        newadd.splice(key, 1)
        this.setData({ add: newadd })

    },
    PickerChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },
    choose(e) {
        this.setData({ choose: e.detail.value })
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