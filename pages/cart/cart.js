const wxutil = require('../../utils/wxutil.js');
const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config');
const storeage = require('../../utils/storeageutil.js')

function operate(params, requestHandler) {
   
  httpUtil.postRequest(config.apiUrl.cartOperate, params, {
    success: function (res) {
      console.log("config.apiUrl.cartOperate->success")
      
      requestHandler.success(res)
      storeage.setCart(res.data)
    },
    fail: function () {
      console.log("config.apiUrl.cartOperate->fail")
    }
  })
}



module.exports = {
  operate: operate
}