// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about: ["https://www.huhailong.vip/image/about.png", "https://www.huhailong.vip/image/about.jpg"]
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