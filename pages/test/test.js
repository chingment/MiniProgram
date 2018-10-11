const wxutil = require('../../utils/wxutil.js')
const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const cart = require('../../pages/cart/cart.js')
const index = require('../../pages/index/index.js')
const productkind = require('../../pages/productkind/productkind.js')
const personal = require('../../pages/personal/personal.js')
const toastUtil = require('../../utils/showtoastutil')
const ownRequest = require('../../own/ownRequest.js')
var app = getApp()

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
    var h = wx.getSystemInfoSync().windowHeight
    var w = wx.getSystemInfoSync().windowWidth
    //console.log("h:" + h + ",w：" + w);

    if (!ownRequest.isLogin()) {
       return;
    }

    if (!ownRequest.isSelectedStore(true)) {

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