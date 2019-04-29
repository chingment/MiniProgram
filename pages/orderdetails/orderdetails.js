const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const wxparse = require("../../wxParse/wxParse.js")
const cart = require('../../pages/cart/cart.js')
const ownRequest = require('../../own/ownRequest.js')
const lumos = require('../../utils/lumos.minprogram.js')
const app = getApp()

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
    var id = options.id == undefined ? "" : options.id

    //app.changeData("main", { cart: cart })

    lumos.getJson({
      url: config.apiUrl.orderGetDetails,
      urlParams: {
        id: id
      },
      success: function (res) {
        _this.setData(res.data)
      }
    })
  }

})