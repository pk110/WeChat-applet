Page({
    data:{ 
        imgalist:[
            'https://pk110.github.io/state/images/me.jpg'     
    ]},
    onLoad:function(){
        wx.showToast({
            title: '点头像，有惊喜',
            icon: 'success',
            duration: 2000
        })
    },
    previewImageone:function(e){
        var current=e.target.dataset.src;
        console.log(current)  
        wx.previewImage({  
            current: current, // 当前显示图片的http链接  
            urls: this.data.imgalist // 需要预览的图片http链接列表  
        })  
    },
    previewImagetwo:function(e){
        var current=e.target.dataset.src; 
        console.log(current)   
        wx.previewImage({  
            current: current, // 当前显示图片的http链接  
            urls: ['https://pk110.github.io/state/images/headtwo.jpg'] // 需要预览的图片http链接列表  
        })  
    }
})