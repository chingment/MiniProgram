const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')

var skus

var getData = function (_this) {

  var couponId = _this.data.couponId

  httpUtil.postRequest(config.apiUrl.orderConfirm, { userId: 1215, skus: skus, couponId: couponId }, {
    success: function (res) {
      console.log("config.apiUrl.orderConfirm->success")
      console.log("config.apiUrl.orderConfirm->success:" + res)


      _this.setData({
        block: res.data.block,
        subtotalItem: res.data.subtotalItem,
        actualAmount: res.data.actualAmount,
        originalAmount: res.data.originalAmount
      })
    },
    fail: function () {
      console.log("config.apiUrl.orderConfirm->fail")
    }
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderBlock: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    skus = JSON.parse(options.skus);
    console.log(options.skus)

    getData(_this)

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
  shippingAddressSelect: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.replyIndex
    var shippingaddress = _this.data.block[index].shippingAddress
    if (!shippingaddress.canSelectElse)
      return
    wx.navigateTo({
      url: "/pages/shippingaddress/shippingaddress?operate=2&operateIndex=" + index,
      success: function (res) {
        // success
      },
    })
  },
  couponSelect: function (e) {
    var _this = this
    wx.navigateTo({
      url: "/pages/mycoupon/mycoupon?operate=2&isGetHis=false&skus=" + JSON.stringify(skus),
      success: function (res) {
        // success
      },
    })
  }

})