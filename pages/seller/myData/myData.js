// pages/seller/myData/myData.js
import * as echarts from '../../../components/ec-canvas/echarts'
const app = getApp()
function getLineOption() {
  return {
    title: {
      text: '各商品订单数排名图',
      fontStyle: 'oblique',
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    legend: {
      top: '25',
      data: ['商品1', '商品2', '商品3', '商品4', '商品5']
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
        name: '商品1',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
      },
      {
        name: '商品2',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
      },
      {
        name: '商品3',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [30, 200, 40, 410, 250, 320, 110],
      },
      {
        name: '商品4',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [150, 200, 140, 304, 150, 120, 210],
      },
      {
        name: '商品5',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [100, 240, 240, 178, 340, 150, 210],
      }
    ]

  }
}
function getPieOption() {
  return {
    title: {
      text: '各商品订单数占比图',
      fontStyle: 'oblique',
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      data: [{
        value: 50,
        name: '商品1'
      }, {
        value: 20,
        name: '商品2'
      }, {
        value: 40,
        name: '商品3'
      }, {
        value: 25,
        name: '商品4'
      }, {
        value: 38,
        name: '商品5'
      }]
    }]
  };
}
function getBarOption() {
  return {
    title: {
      text: '每日订单数量图',
      fontStyle: 'oblique',
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [180, 36, 65, 30, 78, 40, 33, 18, 36, 65, 44, 52, 10, 77, 12, 125, 88, 66, 35, 40, 33, 18, 36, 65, 55, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33, 18, 36, 65, 30, 78, 40, 33, 18, 36, 65, 30, 78, 40, 33, 18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33, 18, 36, 65, 30, 78, 88, 33, 18, 36, 65, 30, 78, 40, 33, 18, 36, 65, 30, 78, 40, 33]
    }]
  };
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isShow: false,
    ec: {
      onInit: function (canvas, width, height, dpr) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
        chart.setOption(getPieOption());
        return chart;
      }
    },
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
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());
        return barChart;
      }
    }
  },
  //存入本地缓存(是否加载数据)
  initChart() {
    wx: wx.setStorage({
      data: true,
      key: 'isShow',
      success: (res) => {
        this.setData({ isShow: true })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('isShow')
     this.setData({
       isShow:value
     })
    }catch(e){

    }
  },
})