Page({
  data:{
    img:'',
    title:'',
    content:'',
    time:''
  },
  onLoad:function(options){
    this.setData({
        img:options.picUrl,
        title:options.title,
        content:options.content,
        time:options.ctime
    })
  },
  onShareAppMessage: function (res) {
        return {
            title: '微信小程序：武汉骑行',
            desc: '最具人气的小程序!',
            path: '/pages/index/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    }
})