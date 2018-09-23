var requestHandler = {
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  }
}

function wxRequest(url,method,header,data,requestHandler) {

  wx.showNavigationBarLoading();  

  wx.request({
    url: url,
    data: data,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: header, // 设置请求的 header,
    dataType:"json",
    success: function (res) {
      //注意：可以对参数解密等处理  
      requestHandler.success(res)

    },
    fail: function (res) {
      console.log("wxRequest.fail->>>>"+JSON.stringify(res));
      requestHandler.fail()
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

module.exports = {
  wxRequest: wxRequest
}  