// pages/personal/address/address.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        addresses: {},
        isClicked: false,
        modalName: null,
        selector: 0,
        region: ['重庆市', '重庆市', '沙坪坝区'],
        deleteShow: false,
        deleteActions: [
            { name: '确认删除?', color: 'red' }
        ]
    },
    RegionChange: function (e) {
        this.setData({
            region: e.detail.value
        })
    },
    deleteAddress(e) {
        this.setData({
            deleteShow: true,
            isClicked: true,
            selector: e.currentTarget.dataset.id
        });
    },
    onClose() {
        this.setData({
            deleteShow: false,
            isClicked: false
        });
    },
    //确认删除
    onSelect(e) {
        for (var i = 0; i < this.data.addresses.length; i++) {
            if (this.data.addresses[i].id == this.data.selector) {
                this.data.addresses.splice(i, 1)
                this.setData({
                    addresses: this.data.addresses,
                    selector: 0
                })
                wx.showToast({
                    title: '仅删除本地数据(数据保护)',
                    icon: 'none'
                })
            }
        }
    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    //确认添加地址
    formSubmit(e) {
        if (e.detail.value.name == '' || e.detail.value.phone == '' || e.detail.value.address == '') {
            console.log("输入为空")
            return
        }
        var newAddress = {
            name: e.detail.value.name,
            phone: e.detail.value.phone,
            address: this.data.region.join(',') + ',' + e.detail.value.address,
            location: '',
            type: e.detail.value.type
        }
        wx: wx.request({
            url: 'http://localhost:8887/address/add',
            data: newAddress,
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: (result) => {
                wx.showToast({
                    title: '添加成功',
                })
                app.globalData.myAddress.push(newAddress)
                this.setData({
                    addresses: app.globalData.myAddress
                })
            },
            fail: (res) => {
                wx.showToast({
                    title: '添加失败',
                    icon: 'none'
                })
            }
        })
        this.hideModal()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            addresses: app.globalData.myAddress
        })
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