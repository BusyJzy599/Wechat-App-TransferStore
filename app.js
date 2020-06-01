//app.js
App({
  //获取商家信息
  getSellerInfo() {
    var that = this
    wx.request({
      url: 'http://localhost:8887/init/seller', //服务器地址
      menthod: "get",
      header: {
        'content-type': 'application/json'
      },
      data: {
        'sellerId': this.globalData.userId,
      },
      success: function (res) {
        if (res.data != "") {
          console.log("是商家")
          that.globalData.myWareHouse = res.data
          that.globalData.isSeller = true
        }
      }
    })
  },
  //用户登录
  userLogin(name, avatar) {
    var that = this;
    wx.request({
      url: 'http://localhost:8887/init/login', //服务器地址
      menthod: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        'name': name,
        'avatar': avatar,
      },
      success: function (res) {
        console.log(".....回调函数.....")
        console.log(res.data)
        var resData = res.data;
        if (resData != 0) {
          that.globalData.userId = res.data[0]
          if (res.data[1] == 1)
            that.globalData.isSeller = true
          wx: wx.showToast({
            title: '登录成功',
            duration: 2000,
          })
          wx.request({
            url: 'http://localhost:8887/init/user',
            menthod: "get",
            header: {
              'content-type': 'application/json'
            },
            data: {
              'userId': that.globalData.userId,
            },
            success: function (res) {
              that.globalData.myAddress = res.data[0]
              that.globalData.userMore[1] = res.data[1]
              that.globalData.myGoods = res.data[2]
              console.log(res.data)
            }
          })
          that.getSellerInfo()
        } else {
          wx: wx.showToast({
            title: '获取信息失败',
            duration: 2000,
          })
        }
      }
    })

  },
  //获取用户信息
  pageGetUserInfo(e) {
    if (this.globalData.userInfo) {
      //设置data内数据
      e.setData({
        userInfo: this.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (e.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      this.userInfoReadyCallback = res => {
        e.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(e.data.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.globalData.userInfo = res.userInfo
          e.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取订单信息
  getOrderInfo(id) {
    var out = {}
    for (var i in this.globalData.userMore[1]) {
      if (this.globalData.userMore[1][i].id == id) {
        out = this.globalData.userMore[1][i]
        break
      }
    }
    return { id: out.id, status: out.status, goods: this.getGood(out.goodsId), dest: this.getAddressInfo(out.dest), ware: this.getWareHouseInfo(out.ware), logistics: out.logistics, create_time: out.create_time, change_time: out.change_time }
  },
  //获取派送订单以及历史订单
  getOrder() {
    var lists = this.globalData.userMore[1];
    var out = [[], [], []]
    var info = [[], [], []]
    for (var i = 0; i < lists.length; i++) {
      var current = lists[i]
      if (current.status == 2)
        out[1].push(current)
      else if (current.status == 3)
        out[2].push(current)
      else if (current.status == 1)
        out[0].push(current)
    }
    for (var i in out) {
      for (var j in out[i]) {
        info[i].push(this.getOrderInfo(out[i][j].id))
      }
    }
    return info
  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("获取用户")
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //后端接受
              this.userLogin(this.globalData.userInfo.nickName, this.globalData.userInfo.avatarUrl)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                console.log("返回")
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    //顶部返回条大小
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  //应用程序显示时
  onShow: function (options) {
    console.log(options)
  },
  //影藏到后台
  onHide: function () {

  },
  //出错时,只能补货到运行阶段的异常
  onError(msg) {

  },
  //获取中转仓信息
  getWareHouseInfo(id) {
    for (var i in this.globalData.wareHouse.ware) {
      for (var j in this.globalData.wareHouse.ware[i]) {
        if (this.globalData.wareHouse.ware[i][j].id == id)
          return this.globalData.wareHouse.ware[i][j]
      }
    }
    return []
  },
  //获取地址信息
  getAddressInfo(id) {
    for (var i in this.globalData.myAddress) {
      if (this.globalData.myAddress[i].id == id)
        return this.globalData.myAddress[i]
    }
    return []
  },
  //获取商品信息
  getGood(id) {
    for (var i in this.globalData.myGoods) {
      if (this.globalData.myGoods[i].id == id) {
        return this.globalData.myGoods[i]
      }

    }
    return []
  },
  globalData: {
    userInfo: null,
    userId: 0,
    isSeller: false,
    gdkey: '31733dc142b32381bf0d05dcc49430da',
    panels: [{ name: 'index', icon: 'wap-home', label: '首页' },
    { name: 'seller', icon: 'shop', label: '商家服务' },
    { name: 'chat', icon: 'chat', dot: false, label: '消息' },
    { name: 'my', icon: 'manager', label: '我的' },],
    /*仓库信息*/
    wareHouse: {
      city: ['北京', '重庆'],
      ware: [
        [{ id: 1, picker: 0, name: '顺丰速运顺义集散中心(北京顺义顺于路营业点)', address: '高丽营镇顺于路9号天龙汽配城北门斜对面', location: '116.574255,40.128854', phone: '95338', wareSize: 30 },
        { id: 2, picker: 1, name: '顺丰速运顺义集散中心', address: '高丽营镇空港物流园顺航路8号', phone: '00000000', location: '116.590202,40.130479', wareSize: 30 }
        ],
        [{ id: 325, picker: 0, name: '快递集散中心', address: '春晖路街道金桥路3号古渡春色3栋一楼一号快递集散中心', phone: '00000000', location: '106.481662,29.456909', wareSize: 70 },
        { id: 326, picker: 1, name: '九龙坡快递集散中心', address: '滩子口玻璃市场B区', phone: '023-81693836', location: '106.516621,29.490396', wareSize: 50 }
        ],
      ]
    },
    /*商家服务仓库信息*/
    myWareHouse: [],
    /*我的地址簿*/
    myAddress: [],
    /*我的商品*/
    myGoods: [],
    userMore: [
      /*消息列表*/
      [
        {
          id: 1, name: '小李', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg',
          comment: [
            { type: 0, content: '测试1', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试1', time: 1589020756320, link: '' },
            { type: 0, content: '测试001', time: 1589020756320, link: '' },
          ],
          readed: false, isShow: true
        },
        {
          id: 2, name: '小张', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg',
          comment: [
            { type: 0, content: '测试2', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试3', time: 1589020756320, link: '' },
            { type: 0, content: '测试002', time: 1589020756320, link: '' },
          ],
          readed: false, isShow: true
        },
        {
          id: 3, name: '小明', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21003.jpg',
          comment: [
            { type: 0, content: '测试3', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试5', time: 1589020756320, link: '' },
            { type: 0, content: '测试003', time: 1589020756320, link: '' },
          ],
          readed: false, isShow: true
        }
      ],
      /*订单列表*/
      []
    ],
  },

})
