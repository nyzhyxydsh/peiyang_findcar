const util = require('../../utils/util.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: null,
    istrue: false,
    pageNum: 1,
    findType: null,
    infos: [],
    locationInfo: ''
  },
  onLoad: function () {
    
    let that = this;
    wx.getSetting({
      success(res){
        //console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']==null){
          that.setData({
            istrue: true
          })
        }
      }
    })
  },
  onShow: function(){
    this.checktUserInfos();
    //加载信息
    this.getInfos();
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: null,
      inputShowed: false
    });
    this.onShow();
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.getInfos();
  },
  openConfirm: function () {
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "主操作",
      cancelText: "辅助操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  openDialog: function () {
    this.setData({
      istrue: true
    })
  },
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },

  bindGetLocation: function () {
    let _this = this;
    return new Promise(resolve => {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          let latitude = res.latitude
          let longitude = res.longitude
          // 解析经纬度信息
          demo.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              let address = res.result.address_component
              _this.setData({
                locationInfo: address.city + ',' + address.district
              })
              resolve(res);
            },
            fail: function (res) {
              _this.setData({
                locationInfo: '定位失败'
              })
            },
            complete: function (res) {}
          });
        }
      })
    }).then(res => {
      let address = res.result.address_component
      let curLocation = {
        latitude: res.result.location.lat,
        longitude: res.result.location.lng
      }
    
      wx.cloud.callFunction({
        name: 'getCourseByDistrict',
        data: {
          curLocation: curLocation,
          start: {
            city: address.city
          },
          end: {
            city: address.city
          },
          showType: this.data.showType
        },
      }).then(res => {
        let courseList = res.result.data;
        // 计算距离信息
        if (res.result.data.length > 0) {
          let arr = res.result.data;
          let startAddressArr = [];
          for (let i = 0; i < arr.length; i++) {
            startAddressArr.push({
              latitude: arr[i].startAddressInfo.latitude,
              longitude: arr[i].startAddressInfo.longitude
            })
          }

          // 请求api，获取距离信息  
          demo.calculateDistance({
            from: curLocation,
            to: startAddressArr,
            success: function (res) {
              let distanceArr = res.result.elements;
              for (let i = 0; i < distanceArr.length; i++) {
                courseList[i].distance = (distanceArr[i].distance / 1000).toFixed(2);
              }
              _this.setData({
                msgList: courseList
              })
            }
          });
        }   
        wx.hideLoading()
      }).catch(console.error)
    })  
  },

  
  onGotUserInfo:function(e){
    console.log(e);
    const avatarUrl = e.detail.userInfo.avatarUrl
    const nickName = e.detail.userInfo.nickName
    //存储头像
    wx.setStorage({
      key: 'avatar',
      data: avatarUrl
    });
    //存储昵称
    wx.setStorage({
      key: 'nickName',
      data: nickName
    })
    //将用户的头像和昵称返回给服务器
    util.requestUrl({
      url: '/wx/loginInfo',
      params: {
          userName: nickName,
          avatarUrl: avatarUrl,
          openId: wx.getStorageSync("openId")
      },
      success: function (res) {
        console.log("index request");
      }
    })
    this.closeDialog();
  },
  //下拉刷新
  onPullDownRefresh: function(e){
    this.getInfos();
  },
  findby: function(e){
    this.setData({
      findType: e.currentTarget.dataset.type
    })
    this.getInfos();
  },
  //获取信息列表
  getInfos: function(){
    let that = this;
    util.requestUrl({
      url: '/wx/selectRelease',
      params:{
        pageNum: that.data.pageNum,
        pageSize: 10,
        ftype: that.data.findType,
        endAddress: that.data.inputVal
      },
      success:function(res){
        //console.log(res.data.list[0].list[0].avatarUrl)
        
        that.setData({
          infos: res.data.list
        })
        wx.stopPullDownRefresh({
          success:function(){
            wx.showToast({
              title: '刷新成功',
              icon: 'success'
            })
          }
        })
      }
    })
  },
  checktUserInfos: function(e){
    util.requestUrl({
      url: '/wx/getUserInfo',
      params:{
        openId: wx.getStorageSync("openId")
        //openId: "232322"
      },
      success:function(res){
        if(res.data==""){
          util.requestUrl({
            url: '/wx/loginInfo',
            params: {
              userName: wx.getStorageSync("nickName"),
              avatarUrl: wx.getStorageSync("avatar"),
              openId: wx.getStorageSync("openId")
            },
            success: function (res) {
              console.log("index request");
            }
          })
        }
      }
    })
  }
})
