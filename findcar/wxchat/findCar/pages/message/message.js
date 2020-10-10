const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  makeMsg: function(e){
    console.log(e);
    util.requestUrl({
      url: '/wx/sendMessage',
      params: {
        message: e.detail.value.message,
        userName: e.detail.value.username
      }
    })
    wx.navigateBack({
    })
  }
})