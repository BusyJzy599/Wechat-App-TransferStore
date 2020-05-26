//app.js
App({
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
  //获取派送订单以及历史订单
  getOrder() {
    var lists = this.globalData.userMore[3];
    var waiting = []
    var sending = []
    var history = []
    for (var i = 0; i < lists.length; i++) {
      var current = lists[i]
      if (current.status == 2)
        sending.push(current)
      else if (current.status == 3)
        history.push(current)
      else if (current.status == 1)
        waiting.push(current)
    }
    return [waiting, sending, history]
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
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
  globalData: {
    userInfo: null,
    isSeller: false,
    gdkey: '31733dc142b32381bf0d05dcc49430da',
    panels: [{ name: 'index', icon: 'wap-home', label: '首页' },
    { name: 'seller', icon: 'shop', label: '商家服务' },
    { name: 'chat', icon: 'chat', dot: false, label: '消息' },
    { name: 'my', icon: 'manager', label: '我的' },],
    userMore: [
      /*消息列表*/
      [
        {
          id: 1, name: '小李',
          comment: [
            { type: 0, content: '测试1', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试1', time: 1589020756320, link: '' },
            { type: 0, content: '测试001', time: 1589020756320, link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg', readed: false, isShow: true
        },
        {
          id: 2, name: '小张', comment: [
            { type: 0, content: '测试2', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试3', time: 1589020756320, link: '' },
            { type: 0, content: '测试002', time: 1589020756320, link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg', readed: false, isShow: true
        },
        {
          id: 3, name: '小明', comment: [
            { type: 0, content: '测试3', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试5', time: 1589020756320, link: '' },
            { type: 0, content: '测试003', time: 1589020756320, link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21003.jpg', readed: false, isShow: true
        }
      ],
      /*商家服务仓库信息*/
      [
        {
          id: 1, name: '顺丰速运顺义集散中心(北京顺义顺于路营业点)', address: '高丽营镇顺于路9号天龙汽配城北门斜对面', phone: '95338', wareSize: 30, mySize: 60, myAllSize: '12x4', ware: [
            { id: 1, name: '口罩', number: 123 },
            { id: 3, name: '除湿袋', number: 51 }
          ], time: 1589020756320,location:'116.574255,40.128854'
        },
        {
          id: 325, name: '快递集散中心', address: '春晖路街道金桥路3号古渡春色3栋一楼一号快递集散中心', phone: '00000000', wareSize: 70, mySize: 45, myAllSize: '6x4', ware: [
            { id: 1, name: '口罩', number: 520 },
            { id: 2, name: '消毒液', number: 1421 }
          ], time: 1589020756320,location:'106.481662,29.456909'
        }
      ],
      /*地址簿*/
      [
        { id: 1, name: '小喆', phone: '13773665423', provincial: '重庆市,重庆市,沙坪坝区', address: '重庆师范大学', location: '106.309062,29.613748', type: '0' },
        { id: 2, name: '小文', phone: '13773665423', provincial: '北京市,北京市,海淀区', address: '北京大学', location: '116.316833,39.998877', type: '1' }
      ],
      /*订单列表*/
      [
        {//订单信息
          id: 12301, sellerId: 123, userId: 123, avatar: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1658148935/O1CN01THVSKa2FsHPSLwSql_!!1658148935.jpg_60x60q90.jpg', desc: '除湿袋',
          //订单状态
          status: '2', curlocation: '',goods_id:3,
          //买家信息
          destination_id: 2, destination_info: '小文 13773665423', destination_addr: '北京市,北京市,海淀区 北京大学',destination_lo: '116.316833,39.998877',
          //仓库信息
          warehouse_id:1, warehouse_name: '顺丰速运顺义集散中心(北京顺义顺于路营业点)',warehouse_addr: '高丽营镇顺于路9号天龙汽配城北门斜对面',warehouse_lo: '116.574255,40.128854',warehouse_phone:'95338',
          //物流信息
          logistics: [
            { type: 2, content: '派送中', time: 1589020756320 },
            { type: 1, content: '中转仓收到商家1号配货信息，准备派送', time: 1589020756320 },
            { type: 0, content: '商家1号收到下单信息，正在配货', time: 1589020756320 },
            { type: 0, content: '订单支付成功', time: 1589020756320 },
          ],
          //时间信息
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 12302, sellerId: 2, userId: 123, avatar: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/1658148935/O1CN01THVSKa2FsHPSLwSql_!!1658148935.jpg_60x60q90.jpg', desc: '除湿袋',
          status: '1', curlocation: '',goods_id:3,
          destination_id: 2, destination_info: '小文 13773665423', destination_addr: '北京市,北京市,海淀区 北京大学',destination_lo: '116.316833,39.998877',
          warehouse_id: 0, warehouse_name: '',warehouse_addr: '',warehouse_lo: '',warehouse_phone:'',
          //物流信息
          logistics: [
            { type: 0, content: '订单支付成功', time: 1589020756320 },
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 12303, sellerId: 2, userId: 123, avatar: 'https://img.alicdn.com/imgextra/i3/2207707567248/O1CN01NUVcoo23PdHdZaWkS_!!2207707567248.jpg_60x60q90.jpg', desc: '口罩',
          status: '2', curlocation: '',goods_id:1,
          destination_id: 2, destination_info: '小文 13773665423', destination_addr: '北京市,北京市,海淀区 北京大学',destination_lo: '116.316833,39.998877',
          warehouse_id: 1, warehouse_name: '顺丰速运顺义集散中心(北京顺义顺于路营业点)',warehouse_addr: '高丽营镇顺于路9号天龙汽配城北门斜对面',warehouse_lo: '116.574255,40.128854',warehouse_phone:'95338',
          //物流信息
          logistics: [
            { type: 2, content: '派送中', time: 1589020756320 },
            { type: 1, content: '中转仓收到商家2号配货信息，准备派送', time: 1589020756320 },
            { type: 0, content: '商家2号收到下单信息，正在配货', time: 1589020756320 },
            { type: 0, content: '订单支付成功', time: 1589020756320 },
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 12304, sellerId: 3, userId: 123, avatar: 'https://img.alicdn.com/imgextra/i1/2405035918/O1CN01KiEuWI1taUVTonW2u_!!2405035918.jpg_60x60q90.jpg', desc: '消毒液',
          status: '3', curlocation: '',goods_id:2,
          destination_id: 2, destination_info: '小文 13773665423', destination_addr: '北京市,北京市,海淀区 北京大学',destination_lo: '116.316833,39.998877',
          warehouse_id: 1, warehouse_name: '顺丰速运顺义集散中心(北京顺义顺于路营业点)',warehouse_addr: '高丽营镇顺于路9号天龙汽配城北门斜对面',warehouse_lo: '116.574255,40.128854',warehouse_phone:'95338',
          logistics: [
            { type: 3, content: '已签收', time: 1589020756320 },
            { type: 2, content: '派送中', time: 1589020756320 },
            { type: 1, content: '中转仓收到商家1号配货信息，准备派送', time: 1589020756320 },
            { type: 0, content: '商家1号收到下单信息，正在配货', time: 1589020756320 },
            { type: 0, content: '订单支付成功', time: 1589020756320 },
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 12305, sellerId: 3, userId: 123, avatar: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/2087847987/O1CN011yOEZb28s5yZxj4jO_!!2087847987.jpg_60x60q90.jpg', desc: '笔记本',
          status: '2', curlocation: '',goods_id:4,
          destination_id: 1, destination_info: '小喆 13773665423', destination_addr: '重庆市,重庆市,沙坪坝区 重庆师范大学',destination_lo: '106.309062,29.613748',
          warehouse_id: 325, warehouse_name: '快递集散中心', warehouse_addr: '春晖路街道金桥路3号古渡春色3栋一楼一号快递集散中心', warehouse_lo: '106.481662,29.456909',warehouse_phone:'00000000',
          logistics: [
            { type: 2, content: '派送中', time: 1589020756320 },
            { type: 1, content: '中转仓收到商家1号配货信息，准备派送', time: 1589020756320 },
            { type: 0, content: '商家1号收到下单信息，正在配货', time: 1589020756320 },
            { type: 0, content: '订单支付成功', time: 1589020756320 },
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 12306, sellerId: 3, userId: 123, avatar: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/4076482146/O1CN010DPeeg1RiuXdkWyaB_!!4076482146.jpg_60x60q90.jpg', desc: '纸巾',
          status: '2', curlocation: '',goods_id:5,
          destination_id: 1, destination_info: '小喆 13773665423', destination_addr: '重庆市,重庆市,沙坪坝区 重庆师范大学',destination_lo: '106.309062,29.613748',
          warehouse_id: 325, warehouse_name: '快递集散中心', warehouse_addr: '春晖路街道金桥路3号古渡春色3栋一楼一号快递集散中心', warehouse_lo: '106.481662,29.456909',warehouse_phone:'00000000',
          logistics: [
            { type: 2, content: '派送中', time: 1589020756320 },
            { type: 1, content: '中转仓收到商家1号配货信息，准备派送', time: 1589020756320 },
            { type: 0, content: '商家1号收到下单信息，正在配货', time: 1589020756320 },
            { type: 0, content: '订单支付成功', time: 1589020255320 },
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },

      ]
    ],
    /*仓库信息*/
    wareHouse: {
      city: ['北京', '重庆'],
      ware: [
        [{ id: 1, picker: 0, name: '顺丰速运顺义集散中心(北京顺义顺于路营业点)', address: '高丽营镇顺于路9号天龙汽配城北门斜对面', phone: '95338', wareSize: 30 },
        { id: 2,  picker: 1, name: '顺丰速运顺义集散中心', address: '高丽营镇空港物流园顺航路8号', phone: '00000000', wareSize: 30 }
        ],
        [{ id: 325, picker: 0, name: '快递集散中心', address: '春晖路街道金桥路3号古渡春色3栋一楼一号快递集散中心', phone: '00000000', wareSize: 70 },
        { id: 326,  picker: 1, name:'九龙坡快递集散中心', address: '滩子口玻璃市场B区', phone: '023-81693836', wareSize: 50 }
        ],
      ]
    }
  },

})
