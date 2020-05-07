//app.js
App({
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
    userMore: [
      [
        { id:1,name: '001', 
        comment: ['测试1','测试001'], 
        avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg', time: '22:20',  readed: false, },
        { id:2,name: '002', comment: ['测试2','测试002'], 
         avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg', time: '22:20',  readed: false, },
        { id:3,name: '003', comment: ['测试3','测试003'], 
         avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21003.jpg', time: '22:20', readed: false, }
      ],
      [
        { name: 'index', icon: 'wap-home', label: '首页' },
        { name: 'seller', icon: 'shop', label: '商家服务' },
        { name: 'chat', icon: 'chat', dot: false, label: '消息' },
        { name: 'my', icon: 'manager', label: '我的' },
      ]
    ]
  },


})