const util = require('../../utils/util.js');
// pages/detail/detail.js
Page({

  data: {
    infos: [],
    dotype: '',
    infoId: ''
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      dotype: options.dotype,
      infoId: options.id
    })
    this.getInfos(options.id);
  },
  makeCall: function(){
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.infos[0].tel,
      success: function(res){
        console.log(res);
      }
    })
  },
  getInfos: function (id) {
    let that = this;
    util.requestUrl({
      url: '/wx/selectRelease',
      params: {
        pageNum: 1,
        pageSize: 1,
        id: Number(id)
      },
      success: function (res) {
        that.setData({
          infos: res.data.list
        })
      }
    })
  },
  deleteInfo: function(){
    let that = this;
    util.requestUrl({
      url: '/wx/deleteInfo',
      params: {
        id: that.data.infoId
      },
      success:function(res){
        wx.navigateBack({
          success:function(res){
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
          }
        })
      }
    })
  }
})