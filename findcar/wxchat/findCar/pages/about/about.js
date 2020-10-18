// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about: ["127.0.0.1/image/about.png", "127.0.0.1/image/about.jpg"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  preview: function(e){
    let url = e.currentTarget.dataset.url;
    console.log(url);
    wx.previewImage({
      urls: ["https://www.huhailong.vip/image/about.png", "https://www.huhailong.vip/image/about.jpg"],
      current: url,
      success: function(res){
        console.log(res);
      }
    })
  }
})