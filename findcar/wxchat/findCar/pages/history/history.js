const util = require('../../utils/util.js');
// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function(){
    this.getInfos();
  },
  getInfos: function () {
    let that = this;
    util.requestUrl({
      url: '/wx/selectRelease',
      params: {
        pageNum: 1,
        pageSize: 30,
        userId: wx.getStorageSync("openId")
      },
      success: function (res) {
        console.log(res.data.list[0].list[0].avatarUrl)
        that.setData({
          infos: res.data.list
        })
        wx.stopPullDownRefresh({
          success: function () {
            wx.showToast({
              title: '刷新成功',
              icon: 'success'
            })
          }
        })
      }
    })
  }
})