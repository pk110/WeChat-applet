Page({
    data: {
        nickName:'点击登录',
        imgSrc:'../../images/logo.jpg',
        gender:''
    },
    onLoad: function(){
        this.getData();
    },
    getData:function(){
        var that = this;
                wx.authorize({
                    scope: 'scope.userInfo',
                    success() {
                        wx.getUserInfo({
                            success: function(data) {
                                var userInfo = data.userInfo
                                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                                that.setData({
                                    nickName: userInfo.nickName,
                                    imgSrc:userInfo.avatarUrl
                                })
                                if(gender == 1){
                                    that.setData({
                                        gender:'../../images/son.png'
                                    }) 
                                }else if(gender == 2){
                                    that.setData({
                                        gender:'../../images/girl.png'
                                    }) 
                                }else{                                                                                that.setData({
                                        gender:''
                                    })
                                    
                                }
                            }
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