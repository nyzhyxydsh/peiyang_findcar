const util = require('../../utils/util.js');
// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    username:'',
    fccount: 0,
    fpcount: 0
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: wx.getStorageSync("avatar"),
      username: wx.getStorageSync("nickName")
    })
  },
  onShow: function(e){
    this.findCount();
  },
  //查询次数
  findCount: function(){
    let userId = wx.getStorageSync("openId");
    let that = this;
    util.requestUrl({
      url: '/wx/findCount',
      method: 'get',
      params: {
        userId: userId 
      },
      success: function (res){
        console.log(res)
        let fccount = 0;
        let fpcount = 0;
        if(res.data.length==1){
          if(res.data[0].ftype=='findcar'){
            fccount = res.data[0].findcount
          }else{
            fpcount = res.data[0].findcount
          }
        }else{
          fccount = res.data[0].findcount;
          fpcount = res.data[1].findcount;
        }
        that.setData({
          fccount: fccount,
          fpcount: fpcount
        })
      }
    })
  }
})