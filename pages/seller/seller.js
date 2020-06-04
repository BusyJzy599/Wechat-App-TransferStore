// pages/seller/seller.js
import * as echarts from '../../components/ec-canvas/echarts'

const app = getApp()

Component({
    data: {
        userInfo: {},
        hasUserInfo: false,
    },
    attached() {
        app.pageGetUserInfo(this)
        this.setData({
            isSeller: app.globalData.isSeller
        })
    },
    methods: {
        toShow(e) {
            var id = e.target.id
            wx.navigateTo({
                url: '/pages/seller/' + id + '/' + id,
            })
        },
        showData(e) {
            wx.navigateTo({
                url: '/pages/seller/myData/myData',
            })
        }
    }
})