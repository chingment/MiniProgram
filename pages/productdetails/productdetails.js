const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const wxparse = require("../../wxParse/wxParse.js")
const cart = require('../../pages/cart/cart.js')
const ownRequest = require('../../own/ownRequest.js')
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
    var skuId = options.skuId == undefined ? "0" : options.skuId

    //app.changeData("main", { cart: cart })

    httpUtil.getRequest(config.apiUrl.productGetSkuDetails, { userId: ownRequest.getCurrentUserId(), skuId: skuId }, {
      success: function (res) {
        _this.setData({ sku: res.data, cart: storeage.getCart() })

        wxparse.wxParse('dkcontent', 'html', res.data.detailsDes, _this, 0);

      },
      fail: function () {
      }
    })
  },
  goHome: function (e) {
    app.switchTab(0)
  },
  goCart: function (e) {
    app.switchTab(2)
  },
  addToCart: function (e) {

    var _self = this
    var skuId = e.currentTarget.dataset.replySkuid //对应页面data-reply-index
    console.log("skuId:" + skuId)
    var skus = new Array();
    skus.push({ skuId: skuId, quantity: 1, selected: true, channelId: 1, channelType:1 });

    cart.operate({ userId: '00000000000000000000000000000000', storeId: 'BE9AE32C554D4942BE4A42FA48446210', operate: 2, skus: skus }, {
      success: function (res) {

      },
      fail: function () {

      }
    })

  },

  immeBuy: function (e) {
    var _this = this
    var skus = []
    skus.push({
      carId: 0,
      id: _this.data.sku.id,
      quantity: 1
    })
    wx.navigateTo({
      url: '/pages/orderconfirm/orderconfirm?skus=' + JSON.stringify(skus),
      success: function (res) {
        // success
      },
    })
  }

})