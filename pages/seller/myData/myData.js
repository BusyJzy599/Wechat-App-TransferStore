// pages/seller/myData/myData.js
import * as echarts from '../../../components/ec-canvas/echarts'

const app = getApp()
const goodsName = ['口罩', '消毒液', '笔记本', '纸巾', '除湿袋']
function getGoodsData(data) {
    return [data['口罩'], data['消毒液'], data['笔记本'], data['纸巾'], data['除湿袋']]
}
function getLineOption(goodsData) {
    return {
        title: {
            text: '各商品订单数排名图',
            fontStyle: 'oblique',
        },
        backgroundColor: "#ffffff",
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C"],
        legend: {
            top: '25',
            data: goodsName
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['重庆', '四川', '江苏', '北京', '湖北'],
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
                name: goodsName[0],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: goodsData[0],
            },
            {
                name: goodsName[1],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: goodsData[1],
            },
            {
                name: goodsName[2],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: goodsData[2],
            },
            {
                name: goodsName[3],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: goodsData[3],
            },
            {
                name: goodsName[4],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: goodsData[4],
            }
        ]

    }
}

function getPieOption(goodsData) {
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
                value: goodsData[0],
                name: goodsName[0]
            }, {
                value: goodsData[1],
                name: goodsName[1]
            }, {
                value: goodsData[2],
                name: goodsName[2]
            }, {
                value: goodsData[3],
                name: goodsName[3]
            }, {
                value: goodsData[4],
                name: goodsName[4]
            }]
        }]
    };
}

function getBarOption(goodsData) {
    return {
        title: {
            text: '每日订单数量图',
            fontStyle: 'oblique',
        },
        backgroundColor: "#ffffff",
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C"],
        legend: {
            data: goodsName,
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
            name:goodsName[0],
            type: 'line',
            smooth: true,
            data: goodsData[0]
        }, {
            name: goodsName[1],
            type: 'line',
            smooth: true,
            data: goodsData[1]
        }, {
            name: goodsName[2],
            type: 'line',
            smooth: true,
            data: goodsData[2]
        },{
            name: goodsName[3],
            type: 'line',
            smooth: true,
            data: goodsData[3]
        },{
            name: goodsName[4],
            type: 'line',
            smooth: true,
            data: goodsData[4]
        },
    ]
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
        ec: {},
        ecLine: {},
        ecBar: {}
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
        var pie, days, sort, pie_out, day_out, sort_out
        wx: wx.showLoading()
        wx: wx.request({
            url: 'http://localhost:8887/goods/data',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                console.log(res.data)
                pie = res.data['pie']
                days = res.data['days']
                sort = res.data['sort']
                pie_out = getGoodsData(pie)
                day_out = getGoodsData(days)
                sort_out = getGoodsData(sort)
                console.log(day_out)
                wx.hideLoading();
            },
        })
        //加载图标
        this.setData({
            ecLine: {
                onInit: function (canvas, width, height, dpr) {
                    const lineChart = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(lineChart);
                    lineChart.setOption(getLineOption(sort_out));
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
                    barChart.setOption(getBarOption(day_out));
                    return barChart;
                }
            },
            ec: {
                onInit: function (canvas, width, height, dpr) {
                    const chart = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chart);
                    chart.setOption(getPieOption(pie_out));
                    return chart;
                }
            }
        })
        try {
            var value = wx.getStorageSync('isShow')
            this.setData({
                isShow: value
            })
        } catch (e) { }
    },
})