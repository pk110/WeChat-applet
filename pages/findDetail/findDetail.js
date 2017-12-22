Page({
    data: {
        detail:''
    },
    onLoad: function(option){
        console.log(option.id);
        var that = this;
        wx.showLoading({
            title: '加载中',
        });
        wx.request({
            url: 'https://api.douban.com/v2/movie/subject/' + option.id, 
            data: {},
            header:{
                "Content-Type":"json"
            },
            success: function (res) { 
                wx.hideLoading();
                console.log(res.data);
                that.setData({
                    detail:res.data
                })
            }
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