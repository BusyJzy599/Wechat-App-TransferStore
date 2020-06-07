// pages/seller/myTransfer/hire/hire.js
import * as echarts from '../../../../components/ec-canvas/echarts'
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp()

function getWareName(ware) {
    var out = []
    ware.forEach(function (value, index, array) {
        out.push(value.name)
    })
    return out;
}

function getWareInfo(array) {
    var city = app.globalData.wareHouse.city[array[0]]
    var ware = app.globalData.wareHouse.ware[array[0]][array[1]]
    return [city, ware]
}

function getLineOption(citys, datas) {
    return {
        backgroundColor: "#ffffff",
        color: ["#67E0E3"],
        legend: {
            top: '25',
            data: ['用户数']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: citys,
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                axisLabel: {
                    color: '#666'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                axisLabel: {
                    color: '#666'
                }
            }
        ],
        series: [
            {
                name: '用户数',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: datas,
            }
        ]

    }
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        //多列选择器：
        multiArray: [app.globalData.wareHouse.city,
        getWareName(app.globalData.wareHouse.ware[0])],
        multiIndex: [0, 0],
        option1: [
            { text: '100', value: '100' },
            { text: '200', value: '200' },
            { text: '400', value: '400' },
        ],
        option2: [
            { text: '半年', value: 365 / 2 * 24 * 3600 * 1000 },
            { text: '1年', value: 365 * 24 * 3600 * 1000 },
            { text: '3年', value: 365 * 3 * 24 * 3600 * 1000 },
        ],
        value1: '100',
        value2: 365 / 2 * 24 * 3600 * 1000,

    },
    //修改价格
    changePrice() {
        var p = this.selectComponent('#size').data.value
        var p1 = this.selectComponent('#time').data.value
        if (p == '3x4')
            p = 10
        else if (p == '6x4')
            p = 18
        else
            p = 36
        p1 = p1 / (3600 * 1000 * 365) * 2.5
        this.setData({
            price: p * parseInt(p1)
        })
    },
    //提交订单
    formSubmit(e) {
        var id = getWareInfo(this.data.multiIndex)[1].id
        console.log("当前" + id)
        var mes = '租赁成功'
        var isSuccess = true
        app.globalData.myWareHouse.forEach(function (value, index, array) {
            if (value.id == id) {
                mes = '已拥有该仓库'
                isSuccess = false
                Toast.fail({
                    message: mes,
                    selector: '#grade',
                    context: this
                });
            }
        })
        if (isSuccess) {
            var w = getWareInfo(this.data.multiIndex)[1]
            var time = this.selectComponent('#time').data.value + Date.parse(new Date())
            var size = this.selectComponent('#size').data.value
            var newWare = { id: w.id, mySize: 0, myAllSize: size, ware: [], time: time }
            app.globalData.myWareHouse.push(newWare)
            wx: wx.showLoading()
            //申请新的仓库
            wx: wx.request({
                url: 'http://localhost:8887/seller/hire',
                data: {
                    'sellerId': app.globalData.userId,
                    'wareId': w.id,
                    'size': 400,
                    'time': time
                },
                header: {
                    'content-type': 'application/json'
                },
                success: (result) => {
                    wx.hideLoading()
                },
            })
            Toast.success({
                message: mes,
                selector: '#grade',
                context: this
            });
        }
    },
    //多列选择器：
    bindMultiPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail)
        console.log(getWareInfo(e.detail.value))
        this.setData({
            multiIndex: e.detail.value,
            size: getWareInfo(e.detail.value)[1].wareSize
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        if (e.detail.column == 0) {//第1列
            console.log(getWareName(app.globalData.wareHouse.ware[e.detail.value]))
            this.setData({
                multiArray: [app.globalData.wareHouse.city, getWareName(app.globalData.wareHouse.ware[e.detail.value])]
            })
        }
    },
    showData(e) {
        wx.navigateTo({
            url: '/pages/seller/myData/myData',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var citys, datas
        var that = this
        wx: wx.showLoading({
            title: '加载数据中',
        })
        wx: wx.request({
            url: 'http://localhost:8887/seller/analyse',
            header: { 'content-type': 'application/json' },
            success: (result) => {
               /* citys = result.data.city
                datas = result.data.num*/
                citys=['重庆','四川','湖北','北京','江苏']
                that.setData({
                    ecLine: {
                        onInit: function (canvas, width, height, dpr) {
                            const lineChart = echarts.init(canvas, null, {
                                width: width,
                                height: height,
                                devicePixelRatio: dpr // new
                            });
                            canvas.setChart(lineChart);
                            lineChart.setOption(getLineOption(citys, datas));
                            return lineChart;
                        }
                    },
                })
            },
            fail:function(res){
               
                wx: wx.showToast({
                    title: '获取信息失败',
                    icon: 'none',
                    duration: 2000,
                })
            },
           wx: wx.hideLoading()
        })
        this.setData({
            multiArray: [app.globalData.wareHouse.city,
            getWareName(app.globalData.wareHouse.ware[0])],
            multiIndex: [0, 0],
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