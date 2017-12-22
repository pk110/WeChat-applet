Page({
    data: {
        movies:[],
        a:0,
        b:10
    },
    onLoad: function(){
        this.onloadData();
    },
    onPullDownRefresh: function(){
        this.onloadData();
    },
    onReachBottom:function(){        
        var that = this;
        wx.showLoading({
            title: '加载中',
        });
        wx.request({
            url: 'https://api.douban.com/v2/movie/search', //仅为示例，并非真实的接口地址
            data: {
                q:"骑行",
                start:that.data.b + 1,
                count:20
            },
            header:{
                "Content-Type":"json"
            },
            success: function (res) { 
                console.log(res)
                wx.hideLoading();
                if(res.data.subjects.length == 0){
                    wx.showToast({
                        title: '没有更多内容了',
                        icon: 'success',
                        duration: 2000
                    })
                }else{
                    var moviesArray = [];
                    for(var i = 0; i<res.data.subjects.length;i++){
                        if(res.data.subjects[i].title.indexOf('骑行') > -1){
                            moviesArray.push(res.data.subjects[i])
                        }
                    }
                    that.setData({
                        movies:that.data.movies.concat(moviesArray),
                        b:that.data.b + 20
                    })
                }
            }
        })
    },
    onloadData:function(){
        var that = this;
        wx.showLoading({
            title: '加载中',
        });
        wx.request({
            url: 'https://api.douban.com/v2/movie/search', //仅为示例，并非真实的接口地址
            data: {
                q:"骑行",
                start:that.data.a,
                count:20
            },
            header:{
                "Content-Type":"json"
            },
            success: function (res) { 
                wx.hideLoading();
                wx.stopPullDownRefresh();
                var moviesArray = [];
                for(var i = 0; i<res.data.subjects.length;i++){
                    if(res.data.subjects[i].title.indexOf('骑行') > -1){
                        moviesArray.push(res.data.subjects[i])
                    }
                }
                that.setData({
                    movies:moviesArray,
                    a:0
                })
                console.log(that.data.movies)
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