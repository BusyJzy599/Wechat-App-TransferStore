// components/tabbar/index-tabbar.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        active: {
            type: String,
            value: 'index'
        },
        panels: {
            type: Array,
            value: []
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        //路由页面
        onChange(event) {
            this.triggerEvent('changeTab', event.detail)
        }
    }
})
