// pages/user/user.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
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
    userInfo: {},
    hasUserInfo: false,
    starValue: 5,
    imgList: [],
    modalName: null,
    textareaValue: '',
  },
  attached() {
    this.setData({ isSeller: app.globalData.isSeller })
    app.pageGetUserInfo(this)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //认证商家
    identify(e) {
      var that = this
      wx.request({
        url: 'http://localhost:8887/user/seller', //服务器地址
        menthod: "get",
        header: {
          'content-type': 'application/json'
        },
        data: {
          'userId': app.globalData.userId,
        },
        success: function (res) {
          if (res.data) {
            app.getSellerInfo()
            that.setData({ isSeller: app.globalData.isSeller })
          }
        },
        fail: function (res) {
          wx: wx.showToast({
            title: '认证失败',
            duration: 404,
          }) 
        }
      })
      app.globalData.isSeller = true
      this.setData({ isSeller: app.globalData.isSeller })
      if (this.data.isSeller) {
        wx: wx.showToast({
          title: '认证成功',
          duration: 2000,
        })
      }

    },
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      console.log("登录状态" + app.globalData.isSeller)
      app.userLogin(e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        isSeller: app.globalData.isSeller
      })
      console.log(app.globalData.userInfo)
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    setStars(e) {
      var mes = 'DialogModal1' == this.data.modalName ? '评分成功' : '反馈成功'
      var sel = 'DialogModal1' == this.data.modalName ? 'grade' : 'callback'
      Toast.success({
        message: mes,
        selector: '#' + sel,
        context: this
      });
      this.hideModal(e);//待测试
    },
    openStars(event) {
      this.setData({
        starValue: event.detail
      });
    },
    ChooseImage() {
      wx.chooseImage({
        count: 4, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })
          }
        }
      });
    },
    ViewImage(e) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      wx.showModal({
        content: '确定要删除？',
        cancelText: '再看看',
        confirmText: '再见',
        success: res => {
          if (res.confirm) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList
            })
          }
        }
      })
    },
    textareaInput(e) {
      this.setData({
        textareaValue: e.detail.value
      })
    },
  }
})
