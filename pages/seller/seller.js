// pages/seller/seller.js

Component({
  data: {
    userInfo: {},
    hasUserInfo: false,
   
  },
  methods: {
    toShow(e) {
      var id=e.target.id
     wx.navigateTo({
       url: '/pages/seller/'+id+'/'+id,
     })
    },
    
  }
})