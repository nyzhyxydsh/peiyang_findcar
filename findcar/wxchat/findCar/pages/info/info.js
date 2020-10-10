const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    sex:'',
    xingzuo:'',
    checkMan: false,
    checkWom: false,
    bornDate: '',
    wxNumber: '',
    qqNumber: '',
    loaclAddress: '',
    workAddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
  },
  sexChange: function(e){
    this.setData({
      sex: e.detail.value
    })
  },
  getInfo: function(){
    let userId = wx.getStorageSync("openId");
    let that = this;
    util.requestUrl({
      url: '/wx/getUserInfo',
      params: {
        openId: userId
      },
      success:function(res){
        console.log(res);
        that.setData({
          info: res.data,
          xingzuo: res.data.constellation,
          bornDate: res.data.bornDate
        })
        if(res.data.sex=='man'){
          that.setData({
            checkMan: true
          })
        } else if (res.data.sex =="women"){
          that.setData({
            checkWom: true
          })
        }
      }
    })
  },
  updateInfo: function(e){
    console.log(e);
    let event = e.detail.value;
    let that = this;
    util.requestUrl({
      url: '/wx/updateInfo',
      params:{
        sex: that.data.sex,
        bornDate: event.bornDate,
        constellation: event.xingzuo,
        wxNumber: event.wxNumber,
        qqNumber: event.qqNumber,
        localAddress: event.localAddress,
        workAddress: event.workAddress,
        openId: wx.getStorageSync("openId")
      },
      success:function(res){
        console.log(res);
      }
    })
  },
  bindDateChange: function(e){
    let date = e.detail.value;
    console.log(date);
    this.setData({
      bornDate: date
    })
    let temp = date.split("-");
    let d = Number(temp[2]);
    let m = Number(temp[1]);  
    this.getAstro(m,d);  
  },
  getAstro: function (m, d){
    let s = ['魔羯','水瓶','双鱼','牡羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','魔羯'];
    let xz = m - (d < "102223444433".charAt(m - 1) - -19);   //输出0～12的数字，0表示摩羯，1表示水瓶，依此类推，...，11是射手，12是摩羯。
    this.setData({
      xingzuo: s[xz]+"座"
    })
  }
})