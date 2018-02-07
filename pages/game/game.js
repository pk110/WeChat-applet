Page({
  data:{
    gametype:['一站到底','地名谜语','脑筋急转弯','歇后语'],                                    objectGametype: [
        {
          id: 0,
          name: '一站到底'
        },
        {
          id: 1,
          name: '地名谜语'
        },
        {
          id: 2,
          name: '脑筋急转弯'
        },
        {
          id: 3,
          name: '歇后语'
        }
      ],
      index: 0,
      question:'',
      types:'wenda',
      anwser:'',
      id:'',
      goodquestion:'',
      myquestion:''
  },
  onLoad: function (options) {
      wx.showToast({
        title: '正在加载背景图片...',
        icon: 'success',
        duration: 2000
      })
      this.requestquestion();
  },
  anwser:function(event){
    console.log(event.detail.value);
    var myquestion = this.data.anwser.trim(); 
    console.log(this.data.anwser.trim())
    // console.log(this.data.anwser.substr(0, this.data.anwser.length-1))
    if (event.detail.value == myquestion){
        wx.showToast({
            title: '回答正确洛！',
            icon: 'success',
            duration: 2000
        })
    }else{
        wx.showToast({
            title: '回答错误哦！',
            icon: 'success',
            duration: 2000
        });              
        this.setData({
          goodquestion: this.data.anwser
        })
    }
  },
  requestquestion:function(){
      var that = this;
      wx.request({
          url: 'https://api.tianapi.com/txapi/'+that.data.types+'/', //仅为示例，并非真实的接口地址
          data: {
              key:'06b8a9a474f891b43584546157647bdb'
          },
          header:{
              "Content-Type":"json"
          },
          success: function (res) { 
              console.log(res);
              that.setData({
                 question:res.data.newslist[0].quest,
                 anwser:res.data.newslist[0].result,
                 id:res.data.newslist[0].id
              })
          }
      })
  },
  next:function(){
      var that = this;
      wx.request({
          url: 'https://api.tianapi.com/txapi/'+that.data.types+'/', //仅为示例，并非真实的接口地址
          data: {
              key:'06b8a9a474f891b43584546157647bdb'
          },
          header:{
              "Content-Type":"json"
          },
          success: function (res) { 
              console.log(res);
              if(res.data.newslist[0].id == that.data.id){
                that.requestquestion();
              }else{
                that.setData({
                    question:res.data.newslist[0].quest,
                    anwser:res.data.newslist[0].result,
                    id: res.data.newslist[0].id,
                    goodquestion: '',
                    myquestion:''
                })
              }
          }
      })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    if(e.detail.value == 0){
        this.setData({
          index: e.detail.value,
          types:'wenda'
        })
    }else if(e.detail.value == 1){
        this.setData({
          index: e.detail.value,
          types:'cityriddle'
        })
    }else if(e.detail.value == 2){
        this.setData({
          index: e.detail.value,
          types:'naowan'
        })
    }else if(e.detail.value == 3){
        this.setData({
          index: e.detail.value,
          types:'xiehou'
        })
    }
    this.requestquestion();
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '趣味游戏', // 分享标题
      desc: '最具趣味性的小程序!', // 分享描述
      path: '/pages/game/game' // 分享路径
    }
  }
})