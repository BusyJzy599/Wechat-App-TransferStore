const app = getApp()

//获取距离
function getDistance(begin, end) {
    var b = (begin + '').split(',')
    var e = (end + '').split(',')
    var b1 = b[0]
    var b2 = b[1]
    var e1 = e[0]
    var e2 = e[1]
    return Math.abs((b1 - e1) * (b2 - e2))
}

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        activeNames: [],
    },
    //确认派单
    sendOrder() {
        var orderId = this.data.order.order.id
        var wareId = this.data.order.ware.id
        var goods = this.data.order.goods
        var info = []
        for (var j in app.globalData.myWareHouse) {
            if (app.globalData.myWareHouse[j].id == wareId) {
                for (var k in app.globalData.myWareHouse[j].ware) {
                    if (app.globalData.myWareHouse[j].ware[k].id == goods) {
                        app.globalData.myWareHouse[j].ware[k].number -= 1
                    }
                }
            }
        }
        for (var i in app.globalData.userMore[1]) {
            if (app.globalData.userMore[1][i].id == orderId) {
                app.globalData.userMore[1][i].status = 2
                app.globalData.userMore[1][i].ware = wareId
                app.globalData.userMore[1][i].change_time = Date.parse(new Date())
                app.globalData.userMore[1][i].logistics.push({
                    type: 2,
                    content: '中转仓收到商家1号配货信息，准备派送',
                    time: Date.parse(new Date())
                })
            }
        }
        this.hideModal()
        this.setData({orderInfo: app.getOrder()[this.data.TabCur],})
    },
    onChange(event) {
        console.log(event.detail)
        this.setData({
            activeNames: event.detail,
        });
    },
    tabSelect(e) {
        var id = e.currentTarget.dataset.id
        var that = this
        if (this.data.activeNames.length == 0) {
            that.setData({
                TabCur: id,
                orderInfo: app.getOrder()[id],
            })
        } else {
            that.setData({activeNames: [],})
            setTimeout(function () {
                that.setData({
                    TabCur: id,
                    orderInfo: app.getOrder()[id],
                })
            }, 300)
        }
    },
    onLoad: function (options) {
        this.setData({
            orderInfo: app.getOrder()[this.data.TabCur],
            aboutInfo: [
                {name: '买家地址', type: 'dest', info: 'address'},
                {name: '买家信息', type: 'dest', info: 'name'},
                {name: '仓库地址', type: 'ware', info: 'address'},
                {name: '仓库电话', type: 'ware', info: 'phone'}
            ]
        })
    },
    showModal(e) {
        //获取可派件的仓库
        var goods = e.currentTarget.dataset.id.goods.id
        var lo = e.currentTarget.dataset.id.dest.location
        var valid = []
        var w = app.globalData.myWareHouse
        for (var x in w) {
            console.log(w[x])
            for (var y in w[x].ware) {
                if (w[x].ware[y].id == goods)
                    valid.push(w[x])
            }
        }
        var out = valid[0]
        var num = 0
        var min = getDistance(app.getWareHouseInfo(valid[0]).location, lo)
        for (var m in valid) {
            var x = app.getWareHouseInfo(valid[m])
            if (getDistance(x.loaction, lo) < min) {
                out = x
            }
        }
        var info = {ware: out, info: app.getWareHouseInfo(out.id)}
        for (var n in out.ware) {
            if (out.ware[n].id == goods)
                num = out.ware[n].number
        }
        console.log("进入")
        console.log(info)
        this.setData({
            modalName: e.currentTarget.dataset.target,
            order: {
                order: e.currentTarget.dataset.id,
                ware: info.info,
                num: num,
                goods: goods
            }
        })

    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },


})