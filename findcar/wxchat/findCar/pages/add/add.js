const util = require('../../utils/util.js');
// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gotime:'',
    godate:'',
    findType:'findcar',
    startDate:'',
    endDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()>9?date.getMonth():"0"+date.getMonth();
    let day = date.getDate()>9?date.getDate():"0"+date.getDate();
    let startDate = year+"-"+month+"-"+day;
    let tempDay = date.getDate()+6;
    let endDay = tempDay>9?tempDay:"0"+tempDay;
    let endDate = year + "-" + month + "-" + endDay;
    
    this.setData({
      startDate: startDate,
      endDate: endDate
    })
  },
  radioChange: function(res){
    this.setData({
      findType: res.detail.value
    })
  },
  addfun: function(res){
    console.log(res);
    let that = this;
    util.requestUrl({
      url: '/wx/addRelease',
      params: {
        userId: wx.getStorageSync("openId"),
        ftype: that.data.findType,
        startAddress: res.detail.value.startAddress,
        endAddress: res.detail.value.endAddress,
        goDate: res.detail.value.godate+" "+res.detail.value.gotime,
        tel: res.detail.value.tel,
        peopleCount: res.detail.value.pCount,
        mark: res.detail.value.mark
      },
      success: function (res) {
        wx.reLaunch({
          url: '../index/index',
          success:function(res){
            wx.showToast({
              title: '发布成功,可在发布历史中修改',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  bindTimeChange: function(res){
    console.log(res);
    this.setData({
      gotime: res.detail.value
    })
  },
  bindDateChange: function(res){
    console.log(res);
    this.setData({
      godate: res.detail.value
    })
  }
})