//app.js
App({
  getTime() {
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
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
    isSeller:false,
    userMore: [
      /*消息列表*/
      [
        {
          id: 1, name: '小李',
          comment: [
            { type: 0, content: '测试1', time: '19:20', link: '' },
            { type: 0, content: '测试001', time: '22:20', link: '' },
            { type: 1, content: '收到测试1', time: '4:20', link: '' },
            { type: 1, content: '收到测试2', time: '5:20', link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg', readed: false
        },
        {
          id: 2, name: '小张', comment: [
            { type: 0, content: '测试2', time: '19:20', link: '' },
            { type: 0, content: '测试002', time: '22:20', link: '' },
            { type: 1, content: '收到测试3', time: '4:20', link: '' },
            { type: 1, content: '收到测试4', time: '5:20', link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg', readed: false
        },
        {
          id: 3, name: '小文', comment: [
            { type: 0, content: '测试3', time: '19:20', link: '' },
            { type: 0, content: '测试003', time: '22:20', link: '' },
            { type: 1, content: '收到测试5', time: '4:20', link: '' },
            { type: 1, content: '收到测试6', time: '5:20', link: '' },
          ],
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21003.jpg', readed: false
        }
      ],
      /*tabbar列表*/
      [
        {name: 'index', icon: 'wap-home', label: '首页' },
        { name: 'seller', icon: 'shop', label: '商家服务' },
        { name: 'chat', icon: 'chat', dot: false, label: '消息' },
        { name: 'my', icon: 'manager', label: '我的' },
      ],
      /*地址簿*/
      [
        {id:1,name:'小喆',phone:'13773665423',provincial:'江苏省,南通市,崇川区',address:'爱情公寓101幢520',type:'0'}
      ],
      /*订单信息*/
      [
        {id:4547879112,sellerId:1,avatar:'',desc:'惠普暗夜精灵笔记本',price:521.49,status:'0',location:'',create_time:123456}
      ]
    ]
  },
  sellerMore:[
    {id:1,avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg',link:'',grade:'4'}
  ]


})