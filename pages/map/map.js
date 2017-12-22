// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.min.js'); 
var wxMarkerData = []; 
var pointsArray = [];
Page({ 
    data: { 
        nickName:'',
        markers: [], 
        latitude: '', 
        longitude: '', 
        placeData: {
            title:'名称：无内容', 
            address:'地址：无内容',
            telephone:'电话电话：88888888'
        },
        address:'骑',
        // polyline: [{
        //     points: [],
        //     color:"#FF0000DD",
        //     width: 2,
        //     dottedLine: false,
        //     arrowLine:true,
        // }],
        polyline: [],
        bike:'开始骑行',
        showPause:'none',
        addClass:''
    }, 
    // 地图划线
    drawline:function() {      
        this.setData({  
            polyline: [{  
                points: pointsArray,  
                color: "#FF0000DD",  
                width: 4,  
                dottedLine: false,
                arrowLine:true,
            }]
        })   
    },
    //搜索那一页传过来的地址数据 更新address
    changeData: function(address){
        this.setData({
            address: address
        })
        this.searchAddress();
     },
    //  定位我的位置
    myaddress:function(){
        this.findMe();
    },
    //  暂停骑行
    pauseBike:function(){
        clearInterval(this.biking);
        this.setData({
          showPause:'none',
          bike:'开始骑行'
        })
    },
    //  点击骑行
    biking:function(){
        var that = this;
        if(that.data.showPause == 'block'){
            return false;
        }else{
            that.setData({
                showPause:'block',
                addClass:'map_container_pause'
            })
            that.biking = setInterval(function(){
                wx.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                        var latitude = res.latitude
                        var longitude = res.longitude
                        var speed = res.speed.toFixed(2);
                        if(speed == undefined){
                            speed = 0
                        }
                        var accuracy = res.accuracy
                        var currentAddress = {
                            longitude: latitude,
                            latitude: longitude
                        };
                        pointsArray.push(currentAddress);
                        console.log(pointsArray);
                        that.drawline();
                        console.log(that.data.polyline)  
                        that.setData({
                            bike:'速度：' + speed + 'm/s'
                        })
                    }
                })
            },1000)
        }
    },
    makertap: function(e) { 
        var that = this; 
        var id = e.markerId; 
        that.showSearchInfo(wxMarkerData, id); 
    }, 
    playInput:function(){
        wx.navigateTo({
            url: '/pages/mapSearch/mapSearch'
        })
    },
    onLoad: function() { 
        this.searchAddress();
    }, 
    // 逆地址解析方法
    findMe:function(){
        var that = this; 
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({ 
            ak: 'LWL9ebB5b2Kc20NI6CLxvThRdeGvxurn' 
        }); 
        var fail = function(data) { 
            console.log(data) 
        }; 
        var success = function(data) { 
            console.log(data)
            wxMarkerData = data.wxMarkerData; 
            that.setData({ 
                markers: wxMarkerData 
            }); 
            that.setData({ 
                latitude: wxMarkerData[0].latitude 
            }); 
            that.setData({ 
                longitude: wxMarkerData[0].longitude 
            }); 
        } 
        // 发起regeocoding检索请求 
        BMap.regeocoding({ 
            fail: fail, 
            success: success, 
            iconPath: '../../img/marker_red.png', 
            iconTapPath: '../../img/marker_red.png' 
        }); 
    },
    searchAddress:function(){
        var that = this;  
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({ 
            ak: 'LWL9ebB5b2Kc20NI6CLxvThRdeGvxurn' 
        }); 
        var fail = function(data) { 
            console.log(data) 
        }; 
        var success = function(data) {
            wxMarkerData = data.wxMarkerData; 
            that.setData({ 
                markers: wxMarkerData 
            }); 
            that.setData({ 
                latitude: wxMarkerData[0].latitude 
            }); 
            that.setData({ 
                longitude: wxMarkerData[0].longitude 
            }); 
        } 
       // 发起POI检索请求 
        BMap.search({ 
            "query": that.data.address, 
            fail: fail, 
            success: success, 
            // 此处需要在相应路径放置图片文件 
            iconPath: '../../images/marker_red.png', 
            // 此处需要在相应路径放置图片文件 
            iconTapPath: '../../images/marker_red.png' 
        });

        // 获取用户名称
        // wx.getUserInfo({
        //     success: function(data) {
        //         var userInfo = data.userInfo;
        //         that.setData({
        //             nickName: userInfo.nickName
        //         });
        //         // 鹰眼获取用户终端的信息
        //         wx.request({
        //             url: 'https://yingyan.baidu.com/api/v3/entity/add', //仅为示例，并非真实的接口地址
        //             data: {
        //                 key:'QZtNPqrRoBkfeZr83LwCeoYTZz73TDGl',
        //                 service_id:156770,
        //                 entity_name:that.data.nickName
        //             },
        //             header:{
        //                 "Content-Type":"json"
        //             },
        //             success: function (res) { 
        //                 console.log(res)
        //                 // that.setData({
        //                 //     imgslist:res.data.newslist
        //                 // })
        //             }
        //         }) 
        //     }
        // })
    },
    showSearchInfo: function(data, i) { 
        console.log(data)
        var that = this;
         if(data[i].title == undefined){
            that.setData({ 
                placeData:{ 
                    title:'名称：' + data[i].desc, 
                    address:'地址：'+data[i].address
                } 
            });
        }else if(data[i].telephone == undefined){
            that.setData({ 
                placeData:{ 
                    title:'名称：'+data[i].title, 
                    address:'地址：'+data[i].address
                } 
            });
        }else{
            that.setData({ 
                placeData:{ 
                    title:'名称：'+data[i].title, 
                    address:'地址：'+data[i].address,
                    telephone:'电话：'+data[i].telephone
                } 
            }); 
        }
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