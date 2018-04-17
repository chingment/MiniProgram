var httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config');

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: "productdetails",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var productSkuId = options.skuId == undefined ? "0" : options.skuId

    //app.changeData("main", { cart: cart })

    httpUtil.getRequest(config.apiUrl.productGetSkuDetails, { userId: 1215, productSkuId }, {
      success: function (res) {
        console.log("config.apiUrl.productGetSkuDetails->success")
        console.log("config.apiUrl.productGetSkuDetails->success:" + JSON.stringify(res.data))
      

        _this.setData(res.data)

        
      },
      fail: function () {
        console.log("config.apiUrl.productGetSkuDetails->fail")
      }
    })
  },
  goHome:function(e) {
    app.switchTab(0)
  },
  goCart: function (e) {
    app.switchTab(2)
  }

})