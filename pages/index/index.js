//index.js
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.min.js'); 
Page({
  data: {
    workoutList: [
        {
            "title":"平滑，高速地蹬踏",
            "picUrl":"http://image1.8264.com/forum/201207/12/142918psy2mem75tejjpsa.jpg!t3w825h0x9m1",
            "content":"（1）把你的车座降低2-3mm，以减少在高转速时身体产生的弹跳倾向（译注：很多人可能都有这个感觉，在高转速时，身体上下跳动，好像坐在弹簧上一样）。以后可以逐渐将车座调回到正确的高度。（2）将注意力集中下拉动踏板滑过最低点以消除蹬踏死点。（译注：我个人的感觉是，使用自锁要更专注于水平方向的用力，即「拖，拉」，而不是垂直方向的「踏，提」）（3）用一个带踏频的码表，来做为生理上的反馈，循序渐进的提高转速，每次你要在这个转速下能够舒舒服服地骑5分钟。（4）每次骑行花几分钟时间用高转速蹬踏，热身时的最后5分钟是最佳时间。"
        },
            {
            "title":"输出巨大能量",
            "picUrl":"http://image1.8264.com/forum/201207/12/143419bjpakpjpep0pfqpg.jpg!t3w825h0x9m1",
            "content":"（1）特殊计时赛：骑行20-30分钟，将心率控制在LT值减去十附近。（2）两次十分钟：把心率控制在LT值减五附近骑行10分钟。然后缓慢蹬踏5分钟用于恢复。接着重复前面的10分钟骑行。（3）找一座山，上坡路成约3-5分钟。把心率在LT值附近爬上坡，然后调头溜下山，缓慢骑行5分钟用于恢复，然后重复5次。（4）研磨者（Grinders）：找一座需要10-30分钟上坡的山，强度控制在LT，频率保持在80-90rpm。警告！LT训练可能对你的健康有害！（1）为避免过度训练，将强度控制在LT以下3-5跳（2）每周不要超过两次LT训练，两次之间最少隔两天用于慢速骑行恢复，或者休息（3）每三周LT训练后，你需要额外的一周用于恢复训练和巩固训练成果。（4）不要全年都作LT训练，八周之后的一个月，你需要将强度控制在LT以下30跳进行骑行，来增加耐力。"
            },
        {
            "title":"怎样冲刺？",
            "picUrl":"http://image1.8264.com/forum/201207/12/144013zohuea8kvl68q6ke.jpg!t3w825h0x9m1",
            "content":"（1）舒适流畅的骑行（2）切换到较大的齿比（3）握住车把的下弯部（4）当你蹬踏至最高点时离开车座（5）平滑流畅地发力加速（6）竭尽全力向前冲！练 习：找一个300码长的缓坡，用中等齿比爬前一半的坡，要用小片牙盘（39*17或19）。然后换到大片牙盘竭尽全力冲刺到山顶，飞轮不要切换。保持良好的姿势。如果你还没到山顶就累垮了，说明对你目前的状态来说，齿比太大了或者是坡太长。如果你没有良好的健康骑行基础，就不要做这个练习。这样的练习每 周最多做一次"
            }
    ],
    imgslist: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    weatherData: '' 
  },
  onLoad: function() { 
      var that = this; 
    //   //   获取用户位置
    //   wx.getLocation({
    //     type: 'wgs84',
    //     success: (res) => {
    //         var latitude = res.latitude // 经度
    //         var longitude = res.longitude // 纬度
    //         console.log(res)
    //     }
    //   })

      // 轮播图图片
      wx.request({
            url: 'https://api.tianapi.com/tiyu/', //仅为示例，并非真实的接口地址
            data: {
                key:'f669dfe0a4154ffebe41572fd4cce38a',
                num:3
            },
            header:{
                "Content-Type":"json"
            },
            success: function (res) { 
                // console.log(res)
                that.setData({
                    imgslist:res.data.newslist
                })
            }
      })

      // 新建百度地图对象 
      var BMap = new bmap.BMapWX({ 
          ak: 'LWL9ebB5b2Kc20NI6CLxvThRdeGvxurn' 
      }); 
      var fail = function(data) { 
          console.log(data) 
      }; 
      var success = function(data) { 
          var weatherData = data.currentWeather[0]; 
          weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n'; 
          that.setData({ 
              weatherData: weatherData 
          }); 
      } 
      // 发起weather请求 
      BMap.weather({ 
          fail: fail, 
          success: success 
      }); 
  },
  scanningCode:function(event){
        wx.scanCode({
            success: (res) => {
                console.log(res)
                wx.redirectTo({
                    url: res.result
                })
            },
            fail: (res) => {
                console.log(res)
            },
            complete: (res) => {
                console.log(res)
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
