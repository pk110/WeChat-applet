Page({
    data: {
        newslist:[],
        page:1,
        num:10
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
        that.setData({
            page:that.data.page + 1
        })
        wx.request({
            url: 'https://api.tianapi.com/tiyu/', //仅为示例，并非真实的接口地址
            data: {
                key:'06b8a9a474f891b43584546157647bdb',
                num:that.data.num,
                page:that.data.page
            },
            header:{
                "Content-Type":"json"
            },
            success: function (res) { 
                console.log(res)
                wx.hideLoading();
                if(res.data.newslist.length == 0){
                    wx.showToast({
                        title: '没有更多内容了',
                        icon: 'success',
                        duration: 2000
                    })
                }else{
                    var moviesArray = res.data.newslist;
                    // for(var i = 0; i<res.data.subjects.length;i++){
                    //     if(res.data.subjects[i].title.indexOf('骑行') > -1){
                    //         moviesArray.push(res.data.subjects[i])
                    //     }
                    // }
                    that.setData({
                        newslist:that.data.newslist.concat(moviesArray)
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
            url: 'https://api.tianapi.com/tiyu/', //仅为示例，并非真实的接口地址
            data: {
                key:'06b8a9a474f891b43584546157647bdb',
                num:that.data.num,
                page:that.data.page
            },
            header:{
                "Content-Type":"json"
            },
            success: function (res) { 
                console.log(res);
                wx.hideLoading();
                wx.stopPullDownRefresh();
                // var moviesArray = [];
                // for(var i = 0; i<res.data.subjects.length;i++){
                //     if(res.data.subjects[i].title.indexOf('骑行') > -1){
                //         moviesArray.push(res.data.subjects[i])
                //     }
                // }
                that.setData({
                    newslist:res.data.newslist,
                    page:1
                })
                console.log(that.data.newslist)
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