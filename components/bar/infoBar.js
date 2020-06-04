// components/infoBar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        info: ''
    },
    attached() {
        this.setData({
            info: this.properties.info
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {}
})
