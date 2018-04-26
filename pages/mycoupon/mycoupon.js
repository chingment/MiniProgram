const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var operate = parseInt(options.operate)
 
    var operateIndex = parseInt(options.operateIndex)
    var skus = options.skus == undefined ? [] : JSON.parse(options.skus)
    var isGetHis = options.isGetHis
    var title = ""
    switch (operate) {
      case 1:
        title = "我的优惠卷";
        break;
      case 2:
        title = "选择优惠卷";
        break;
      case 3:
        title = "历史优惠卷";
        break;
    }
    wx.setNavigationBarTitle({
      title: title
    })

    var isGetHis = false
    httpUtil.postRequest(config.apiUrl.couponGetList, { userId: 1215, isGetHis: isGetHis, skus: skus }, {
      success: function (res) {
        console.log("config.apiUrl.couponGetList->success")
        console.log("config.apiUrl.couponGetList->success:" + res)


        _this.setData({
          coupon: res.data,
          operate: operate
        })

      },
      fail: function () {
        console.log("config.apiUrl.couponGetList->fail")
      }
    })

  },
  goSelect: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var couponId = _this.data.coupon[index].id
    console.log("couponId:" + couponId)

    var coupons = []
    coupons.push(couponId)

    if (_this.data.operate == 2) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        couponId: coupons
      })
      wx.navigateBack()
    }

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

  }
})