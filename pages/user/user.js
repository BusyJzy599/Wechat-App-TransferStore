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
    isSeller: app.globalData.isSeller
  },
  attached() {
    app.pageGetUserInfo(this)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
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
