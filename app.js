//app.js
App({
    //获取商家信息
    getSellerInfo(id) {
        var that = this
        wx: wx.showLoading()
        wx.request({
            url: 'http://localhost:8887/init/seller', //服务器地址
            menthod: "get",
            header: {
                'content-type': 'application/json'
            },
            data: {
                'sellerId': id,
            },
            success: function (res) {
                if (res.data != "") {
                    console.log("是商家")
                    console.log(res.data)
                    that.globalData.myWareHouse = res.data
                    that.globalData.isSeller = true
                }
                wx: wx.hideLoading()
            }
        })
    },
    userDataInfo(id){
        var that=this
        wx.request({
            url: 'http://localhost:8887/init/user',
            menthod: "get",
            header: {
                'content-type': 'application/json'
            },
            data: {
                'userId': id,
            },
            success: function (res) {
                that.globalData.myAddress = res.data[0]
                that.globalData.userMore[1] = res.data[1]
                that.globalData.myGoods = res.data[2]
                console.log( that.globalData.userMore[1])
                wx: wx.hideLoading()
            }
        })
    },
    //用户登录
    userLogin(name, avatar) {
        var that = this;
        wx: wx.showLoading()
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
                    that.getSellerInfo(that.globalData.userId)
                }
            },
            fail:function(res){
                wx.hideLoading()
                wx: wx.showToast({
                    title: '获取信息失败',
                    icon: 'none',
                    duration: 2000,
                })
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
        return {
            id: out.id,
            status: out.status,
            goods: this.getGood(out.goodsId),
            dest: this.getAddressInfo(out.dest),
            ware: this.getWareHouseInfo(out.ware),
            logistics: out.logistics,
            create_time: out.create_time,
            change_time: out.change_time
        }
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
        //获取仓库信息
        wx.request({
            url: 'http://localhost:8887/init/ware', //服务器地址
            menthod: "get",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.globalData.wareHouse = res.data
                console.log("-------------------------")
                console.log(that.globalData.wareHouse)
            }
        })
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
                            this.userDataInfo(this.globalData.userId)
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
        notice:true,
        isSeller: false,
        gdkey: '31733dc142b32381bf0d05dcc49430da',
        panels: [{ name: 'index', icon: 'wap-home', label: '首页' },
        { name: 'seller', icon: 'shop', label: '商家服务' },
        { name: 'chat', icon: 'chat', dot: false, label: '消息' },
        { name: 'my', icon: 'manager', label: '我的' },],
        /*仓库信息*/
        wareHouse: {
            city: [],
            ware: [[]]
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
                    id: 1, name: '商家1', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21001.jpg',
                    comment: [
                        { type: 0, content: '您的快递已在派件', time: 1589020756320, link: '' },
                    ],
                    readed: false, isShow: true
                },
                {
                    id: 2, name: '商家2', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg',
                    comment: [
                        { type: 0, content: '您的订单已支付成功', time: 1589020756320, link: '' },
                        { type: 0, content: '亲~', time: 1589020756320, link: '' },
                        { type: 1, content: 'OK', time: 1589020756320, link: '' },
                        { type: 1, content: '中转仓真是快啊', time: 1589020756320, link: '' },
                    ],
                    readed: true, isShow: true
                },
                {
                    id: 3, name: '商家3', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21003.jpg',
                    comment: [
                        { type: 1, content: '在不在', time: 1589020756320, link: '' },
                        { type: 1, content: '什么时候发货啊', time: 1589020756320, link: '' },
                        { type: 1, content: '中转仓这么快捷', time: 1589020756320, link: '' },
                        { type: 1, content: '你们也要与时俱进啊', time: 1589020756320, link: '' },
                    ],
                    readed: true, isShow: true
                }
            ],
            /*订单列表*/
            []
        ],
    },

})
