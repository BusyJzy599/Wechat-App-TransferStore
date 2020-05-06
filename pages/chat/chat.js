// pages/chat/chat.js
const app = getApp();
Component({

  /**
    * 组件的属性列表
    */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    gridCol: 3,
    skin: false,
    itemColor: 'white',
    comments:[]
  },
  attached() {
    this.setData({
      comments:app.globalData.userMore[0]
    })
    console.log(app.globalData.userMore[0])
    if (this.data.comments.length == 0)
      console.log("消息为空")
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX,
        selectInfor: e.currentTarget.dataset.target.substring(9, 10),
        chooseId:e.currentTarget.dataset.id
      })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection == 'left') {
        this.setData({
          modalName: e.currentTarget.dataset.target,
          chooseId:e.currentTarget.dataset.id
        })
      } else if (this.data.modalName == null) {
        //跳转
        this.setData({
          itemColor: 'black'
        })
        wx.navigateTo({
          url: '/pages/user/notify/notify?info='+this.data.chooseId,
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null,
        itemColor: 'white',
      })
    },
    //删除消息
    deleteInfo(e) {
      console.log(this.data.selectInfor)
      var lists = this.data.comments
      lists.splice(this.data.selectInfor, 1)
      this.setData({
        comments: lists
      })
      if (this.data.comments.length == 0)
        console.log("消息被删除为空")
    },
    //读取信息
    readedInfo(e) {
      var num = 'comments[' + this.data.selectInfor + '].readed'
      this.setData({
        [num]: true
      })
      console.log(this.data.comments)
    }

  }

})