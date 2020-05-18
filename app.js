//app.js
App({
  //获取用户信息
  pageGetUserInfo(e){
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
    var sending = []
    var history = []
    for (var i = 0; i < lists.length; i++) {
      var current = lists[i]
      if (current.status == 2)
        sending.push(current)
      else if (current.status == 3)
        history.push(current)
    }
    return [sending, history]
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
    gdkey:'31733dc142b32381bf0d05dcc49430da',
    panels:[  { name: 'index', icon: 'wap-home', label: '首页' },
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
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg', readed: false,isShow:true
        },
        {
          id: 2, name: '小张', comment: [
            { type: 0, content: '测试2', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试3', time: 1589020756320, link: '' },
            { type: 0, content: '测试002', time: 1589020756320, link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg', readed: false,isShow:true
        },
        {
          id: 3, name: '小明', comment: [
            { type: 0, content: '测试3', time: 1589020756320, link: '' },
            { type: 1, content: '收到测试5', time: 1589020756320, link: '' },
            { type: 0, content: '测试003', time: 1589020756320, link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21003.jpg', readed: false,isShow:true
        }
      ],
      /*待定*/
      [],
      /*地址簿*/
      [
        { id: 1, name: '小喆', phone: '13773665423', provincial: '重庆市,重庆市,沙坪坝区', address: '重庆师范大学', location: '106.307308,29.618613', type: '0' },
        { id: 2, name: '小文', phone: '13773665423', provincial: '江苏省,南通市,崇川区', address: '南通大学', location: '120.918478,31.979069', type: '1' }
      ],
      /*订单列表*/
      [
        {//订单信息
          id: 123456001, sellerId: 1, userId: 123, avatar: 'https://img.alicdn.com/imgextra/i1/2201222579396/O1CN01WGetuk2JHQ0rOx0Pc_!!2201222579396.jpg_430x430q90.jpg', desc: '惠普暗夜精灵笔记本',
          //订单状态
          status: '2', curlocation: '',
          //买家信息
          destination_id: 1, destination_lo: '106.307308,29.618613',
          //仓库信息
          warehouse_id: '1',warehouse_lo: '106.475145,29.577752',
          //物流信息
          logistics:[  
            {type:2,content:'派送中',time:1589020756320},
            {type:1,content:'中转仓收到商家1号配货信息，准备派送',time:1589020756320},
            {type:0,content:'商家1号收到下单信息，正在配货',time:1589020756320},
          ],
          //时间信息
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 123456002, sellerId: 2, userId: 123, avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2911785265,426425792&fm=26&gp=0.jpg', desc: 'Fear Of Gold短袖', 
          status: '2', curlocation: '',
          destination_id: 2, destination_name: '小文', destination_addr: '江苏省,南通市,崇川区,南通大学', destination_lo: '120.918478,31.979069',
          warehouse_id: '2', warehouse_name: '圆通快递', warehouse_addr: '', warehouse_lo: '120.857739,32.010414',
            //物流信息
            logistics:[
              {type:2,content:'派送中',time:1589020756320},
              {type:1,content:'中转仓收到商家2号配货信息，准备派送',time:1589020756320},
              {type:0,content:'商家2号收到下单信息，正在配货',time:1589020756320},
            ],
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 123456003, sellerId: 3, userId: 123, avatar: 'https://img.alicdn.com/imgextra/i3/2206626571460/O1CN011Jo3ok1Meir3SOP8P_!!0-item_pic.jpg_430x430q90.jpg', desc: '名创优品牙膏', 
          status: '3', curlocation: '',
          destination_id: '', destination_name: '', destination_addr: '', destination_lo: '120.918478,31.979069',
          warehouse_id: '', warehouse_name: '中通快递', warehouse_addr: '', warehouse_lo: '120.857739,32.010414',
          logistics:[  
            {type:3,content:'已签收',time:1589020756320},
            {type:2,content:'派送中',time:1589020756320},
            {type:1,content:'中转仓收到商家1号配货信息，准备派送',time:1589020756320},
            {type:0,content:'商家1号收到下单信息，正在配货',time:1589020756320},
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 123456004, sellerId: 3, userId: 123, avatar: 'https://img.alicdn.com/imgextra/i3/1061727885/O1CN016dOCNJ287NZlcv8rX_!!1061727885-0-lubanu-s.jpg_60x60q90.jpg', desc: 'ipad Pro 2019款',
          status: '2', curlocation: '',
          destination_id: '', destination_name: '', destination_addr: '', destination_lo: '120.918478,31.979069',
          warehouse_id: '', warehouse_name: '中通快递', warehouse_addr: '', warehouse_lo: '120.857739,32.010414',
          logistics:[  
            {type:2,content:'派送中',time:1589020756320},
            {type:1,content:'中转仓收到商家1号配货信息，准备派送',time:1589020756320},
            {type:0,content:'商家1号收到下单信息，正在配货',time:1589020756320},
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },
        {
          id: 123456005, sellerId: 3, userId: 123, avatar: 'https://img.alicdn.com/imgextra/i2/2616970884/O1CN01oAVbxV1IOugdeRFkj_!!2616970884.jpg_60x60q90.jpg', desc: 'iPhone11 Pro Max 512G 国行',
          status: '2', curlocation: '',
          destination_id: '', destination_name: '', destination_addr: '', destination_lo: '120.918478,31.979069',
          warehouse_id: '', warehouse_name: '中通快递', warehouse_addr: '', warehouse_lo: '120.857739,32.010414',
          logistics:[  

            {type:2,content:'派送中',time:1589020756320},
            {type:1,content:'中转仓收到商家1号配货信息，准备派送',time:1589020756320},
            {type:0,content:'商家1号收到下单信息，正在配货',time:1589020756320},
          ],
          create_time: 1589020756320, change_time: 1589020756320
        },

      ]
    ]
  },
  sellerMore: [
    { id: 1, avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg', link: '', grade: '4' }
  ],
  locations:[
    
  ]

})