// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.min.js');
Page({ 
    data: { 
        sugData: '',
        currentCity:''
    },  
    onLoad: function() { 
        var that = this; 
        // 获取位置
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                that.loadCity(longitude, latitude)
            }
        })  
    }, 
    loadCity: function (longitude, latitude) {  
        var that = this  
        wx.request({  
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=LWL9ebB5b2Kc20NI6CLxvThRdeGvxurn&location=' + latitude + ',' + longitude + '&output=json',  
            data: {},  
            header: {  
                'Content-Type': 'application/json'  
            },  
            success: function (res) {  
                // success      
                var city = res.data.result.addressComponent.city;  
                that.setData({ currentCity: city });  
            },  
            fail: function () {  
                that.setData({ currentCity: "获取定位失败" });  
            },  
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
    },
    // 绑定input输入 
    bindKeyInput: function(e) { 
        var that = this; 
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({ 
            ak: 'LWL9ebB5b2Kc20NI6CLxvThRdeGvxurn' 
        }); 
        var fail = function(data) { 
            console.log(data);
        }; 
        var success = function(data) { 
            var sugData = ''; 
            for(var i = 0; i < data.result.length; i++) { 
                sugData = sugData + data.result[i].name + '\n'; 
            } 
            that.setData({ 
                sugData: sugData 
            }); 
        } 
       // 发起suggestion检索请求 
        BMap.suggestion({ 
            query: e.detail.value, 
            region: that.data.currentCity, 
            city_limit: true, 
            fail: fail, 
            success: success 
        }); 
    },
    // 点击键盘搜索回到map
    searchAddress:function(e){
        //获取页面栈
        var pages = getCurrentPages();
        if(pages.length > 1){
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.changeData(e.detail.value)
        }
        wx.switchTab({
            url: '../../pages/map/map'
        })
    }
})