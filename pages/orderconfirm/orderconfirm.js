const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const ownRequest = require('../../own/ownRequest.js')
var skus

var getData = function (_this) {

  var couponId = _this.data.couponId

  httpUtil.postRequest(config.apiUrl.orderConfirm, { userId: ownRequest.getCurrentUserId(), storeId: 'BE9AE32C554D4942BE4A42FA48446210', skus: skus, couponId: couponId }, {
    success: function (res) {
      var d = res.data
      _this.setData({
        block: d.block,
        subtotalItem: d.subtotalItem,
        actualAmount: d.actualAmount,
        originalAmount: d.originalAmount,
        coupon: d.coupon
      })
    },
    fail: function () {

    }
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    block: [],
    couponId: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    console.log("sku:" + JSON.stringify(options.skus))
    skus = JSON.parse(options.skus);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    getData(_this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  deliveryAddressSelect: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.replyIndex
    var deliveryAddress = _this.data.block[index].deliveryAddress
    if (!deliveryAddress.canSelectElse)
      return
    wx.navigateTo({
      url: "/pages/deliveryAddress/deliveryAddress?operate=2&operateIndex=" + index,
      success: function (res) {
        // success
      },
    })
  },
  couponSelect: function (e) {
    var _this = this

    var couponId = _this.data.couponId

    wx.navigateTo({
      url: "/pages/mycoupon/mycoupon?operate=2&isGetHis=false&skus=" + JSON.stringify(skus) + "&couponId=" + JSON.stringify(couponId),
      success: function (res) {
        // success
      },
    })
  }

})