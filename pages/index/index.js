//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    userInfo: {},
    hasUserInfo: false,
    activeNames: ['2'],
    about: [],
    cardCur: 0,
    //轮播图
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {//获取用户信息
      app.pageGetUserInfo(this)
      //获取订单信息分类
      var out = app.getOrder()
      console.log(out)
      this.setData({
        about: [
          {
            title: '未发货', name: '1', content: '待商家发货', icon1: 'todo-list-o', icon2: { name: 'timefill', color: 'red' }, data: out[0]
          },
          {
            title: '派送中', name: '2', content: '运送中', icon1: 'logistics', icon2: { name: 'deliver_fill', color: 'blue' }, data: out[1]
          },
          {
            title: '历史订单', name: '3', content: '已签收', icon1: 'notes-o', icon2: { name: 'roundcheckfill', color: 'green' }, data: out[2]
          },
        ]
      })
      console.log(this.data.about) },
  },
  methods: {
    //点击扫码
    scanSearch(e) {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res)
        },
      })
    },
    //跳转具体订单信息
    checkOrderInfo(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/user/orderInfo/orderInfo?orderId=' + e.currentTarget.dataset.id,
      })
    },
    //展开信息栏
    onCollapse(event) {
      this.setData({
        activeNames: event.detail
      });
    },

    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
      let list = this.data[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        swiperList: list
      })
    },
    // towerSwiper触摸开始
    towerStart(e) {
      this.setData({
        towerStart: e.touches[0].pageX
      })
    },
    // towerSwiper计算方向
    towerMove(e) {
      this.setData({
        direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
      })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
      let direction = this.data.direction;
      let list = this.data.swiperList;
      if (direction == 'right') {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < list.length; i++) {
          list[i - 1].mLeft = list[i].mLeft
          list[i - 1].zIndex = list[i].zIndex
        }
        list[list.length - 1].mLeft = mLeft;
        list[list.length - 1].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = list.length - 1; i > 0; i--) {
          list[i].mLeft = list[i - 1].mLeft
          list[i].zIndex = list[i - 1].zIndex
        }
        list[0].mLeft = mLeft;
        list[0].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      }
    },
  },

})
