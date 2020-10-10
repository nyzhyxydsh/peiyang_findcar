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
    infos: []
  },
  onLoad: function () {
    
    let that = this;
    wx.getSetting({
      success(res){
        console.log(res.authSetting['scope.userInfo'])
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
