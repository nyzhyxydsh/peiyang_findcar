const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**封装request */
/* 公共request 方法 */
const requestUrl = ({
  url,
  params,
  success,
  method = "post"
}) => {
  wx.showLoading({
    title: '加载中',
  });
  let server = 'http://127.0.0.1';//测试域名
  let openid = wx.getStorageSync("openId"),
    that = this;
  if (openid != "" && openid != null) {
    var header = { 'content-type': 'application/json', 'Cookie': 'sid=' + openid }
  } else {
    var header = { 'content-type': 'application/json' }
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: server + url,
      method: method,
      data: params,
      header: header,
      success: success,
      complete: (res) => {
        //console.log(res);
        wx.hideLoading();
        if (sessionId == "" || sessionId == null) {
          wx.setStorageSync('sid', res.data.session_key)//  如果本地没有就说明第一次请求 把返回的 sessionId 存入本地
        }
        if (res.data.result === 'error' || res['statusCode'] !== 200) {
          wx.showToast({
            title: res.errMsg || '请求出错',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: res.errMsg || '',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        reject(res.data)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
    .catch((res) => { })
}
module.exports = {
  formatTime: formatTime,
  requestUrl: requestUrl
}
