// pages/chat/chat.js
const app = getApp();
Component({

    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        gridCol: 3,
        skin: false,
        itemColor: 'white',
        comments: [],
    },
    attached() {
        app.pageGetUserInfo(this)
        this.setData({
            comments: app.globalData.userMore[0],
        })
        if (this.data.comments.length == 0) {
            app.globalData.panels[2].dot = false
            console.log("消息为空")
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //搜索消息
        searchChat(e) {
            let key = e.detail.value;
            console.log(key)
            let list = app.globalData.userMore[0]
            console.log(list)
            for (let i = 0; i < list.length; i++) {
                let a = key;
                let b = list[i].name
                if (b.search(a) != -1) {
                    list[i].isShow = true
                } else {
                    list[i].isShow = false
                }
            }
            this.setData({
                comments: list,
                isSearch: false
            })
        },
        // ListTouch触摸开始
        ListTouchStart(e) {
            this.setData({
                ListTouchStart: e.touches[0].pageX,
                selectInfor: e.currentTarget.dataset.target.substring(9, 10),
                chooseId: e.currentTarget.dataset.id
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
                })
            } else if (this.data.modalName == null) {
                //跳转
                this.readedInfo()
                this.setData({
                    itemColor: 'black',
                    chooseId: e.currentTarget.dataset.id
                })
                wx.navigateTo({
                    url: '/pages/user/notify/notify?info=' + this.data.chooseId,
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
            var lists = this.data.comments
            lists.splice(this.data.selectInfor, 1)
            this.setData({
                comments: lists,
            })
            if (this.data.comments.length == 0) {
                app.globalData.panels[2].dot = false
                console.log("消息被删除为空")
            }
        },
        //读取信息
        readedInfo(e) {
            var num = 'comments[' + this.data.selectInfor + '].readed'
            this.setData({
                [num]: true,
            })
            //如果全部已读则设置无消息
            var res = true;
            for (var i = 0; i < this.data.comments.length; i++) {
                res &= this.data.comments[i].readed
            }
            if (res)
                app.globalData.panels[2].dot = false
        }
    }
})