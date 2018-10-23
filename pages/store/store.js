const config = require('../../config')
const ownRequest = require('../../own/ownRequest.js')
const lumos = require('../../utils/lumos.minprogram.js')
const app = getApp()

Page({
  data: {
  },
  onLoad: function (options) {
    var _this = this
    lumos.getJson({
      url: config.apiUrl.storeList, urlParams: {
        merchantId: "",
        lat: 0,
        lng: 0
      },
      success: function (res) {
        _this.setData({
          list: res.data,
          currentStore: ownRequest.getCurrentStore()
        })
      }
    })
  },
  selectStore: function (e) {
    var store = e.currentTarget.dataset.replyStore
    ownRequest.setCurrentStore(store);
    wx.reLaunch({
      url: ownRequest.getReturnUrl()
    })
  }
})