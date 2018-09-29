const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const cart = require('../../pages/cart/cart.js')
const ownRequest = require('../../own/ownRequest.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    var _curStoreId = options.id == undefined ? "" : options.id

    httpUtil.getRequest(config.apiUrl.storeList, {
      merchantId: "",
      lat: 0,
      lng: 0
    }, {
      success: function(res) {
        _this.setData({
          list: res.data,
          curStoreId: _curStoreId
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})