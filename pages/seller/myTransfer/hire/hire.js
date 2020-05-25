// pages/seller/myTransfer/hire/hire.js
import * as echarts from '../../../../components/ec-canvas/echarts'
const app = getApp()
function getLineOption() {
  return {
    backgroundColor: "#ffffff",
    color: ["#67E0E3"],
    legend: {
      top: '25',
      data: ['用户数']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['上海', '北京', '重庆', '江苏', '河南'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '用户数',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [300, 270, 240, 212, 184, 165, 145],
      }
    ]

  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    citys: ['北京', '重庆'],
    wareHouses: [],
    //多列选择器：
    multiArray: [
      ['北京', '重庆'],
      ['顺丰速运顺义集散中心(北京顺义顺于路营业点)']
    ],
    multiIndex: [0, 0],
    option1: [
      { text: '3x4', value: 0 },
      { text: '6x4', value: 1 },
      { text: '12x4', value: 2 },
    ],
    option2: [
      { text: '半年', value: 0 },
      { text: '1年', value: 1 },
      { text: '3年', value: 2 },
    ],
    value1: 0,
    value2: 0,
    ecLine: {
      onInit: function (canvas, width, height, dpr) {
        const lineChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(lineChart);
        lineChart.setOption(getLineOption());
        return lineChart;
      }
    },
  },
  //提交订单
  formSubmit(e) {
    console.log(e.detail)
  },
  //多列选择器：
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail);
    if (e.detail.column == 0) {//第1列
      if (e.detail.value == 0) {//音频
        this.setData({
          multiArray: [this.data.citys, ['顺丰速运顺义集散中心(北京顺义顺于路营业点)']]
        })
      };
      if (e.detail.value == 1) {//视频
        this.setData({
          multiArray: [this.data.citys, ['快递集散中心']]
        })
      };
    };

  },
  showData(e) {
    wx.navigateTo({
      url: '/pages/seller/myData/myData',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})