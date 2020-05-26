
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    activeNames: [],
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
      that.setData({ activeNames: [], })
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
        { name: '买家地址', info: 'destination_addr' },
        { name: '买家信息', info: 'destination_info' },
        { name: '仓库地址', info: 'warehouse_addr' },
        { name: '仓库电话', info: 'warehouse_phone' }
      ]
    })
  },
  //获取可派件的仓库
  getUsedWare(id) {
    var goods = 1
    var valid = []
    for (x in app.globalData.userMore[1]) {
      for (y in x.ware) {
        if (y.id == goods)
          valid.push(x)
      }
    }
    return valid
  },
  //获取距离
  getDistance(begin, end) {
    var b = begin.split(',')
    var e = end.split(',')
    var b1 = parseDouble(b[0])
    var b2 = parseDouble(b[1])
    var e1 = parseDouble(e[0])
    var e2 = parseDouble(e[1])
    return Math.abs((b1 - e1) * (b2 - e2))
  }
})