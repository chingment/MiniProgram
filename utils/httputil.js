var requestHandler = {
  success: function(res) {
    // success  
  },
  fail: function() {
    // fail  
  }
}

function wxRequest(url, method, header, data, requestHandler) {

  wx.showNavigationBarLoading();
  console.log("wxRequest.url->>>>" + url);
  console.log("wxRequest.method->>>>" + method);
  wx.request({
    url: url,
    data: data,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: header, // 设置请求的 header,
    dataType: "json",
    success: function(res) {
      console.log("wxRequest.success->>>>" + JSON.stringify(res));
      if (typeof res.data == "undefined" || res.data == null) {
        console.log("wxRequest.success->>>>data is undefined or null");
      } else if (typeof res.data.result == "undefined" || res.data.result == null) {
        console.log("wxRequest.success->>>>data.result is undefined or null");
      } else {
        if (res.data.result == 3) {
          console.log("wxRequest.success->>>>data.result is error");
        } else {
          //注意：可以对参数解密等处理  
          requestHandler.success(res)
        }
      }

    },
    fail: function(res) {
      console.log("wxRequest.fail->>>>" + JSON.stringify(res));
      requestHandler.fail()
    },
    complete: function() {
      wx.hideNavigationBarLoading()
    }
  })
}

module.exports = {
  wxRequest: wxRequest
}