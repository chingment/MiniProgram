const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const ownRequest = require('../../own/ownRequest.js')
const toastUtil = require('../../utils/showtoastutil')
const cart = require('../../pages/cart/cart.js')
const lumos = require('../../utils/lumos.minprogram.js')
const app = getApp()

var skus = null
var orderId = null
var getData = function(_this) {

  var couponId = _this.data.couponId

  lumos.postJson({
    url: config.apiUrl.orderConfirm,
    dataParams: {
      orderId: orderId,
      storeId: ownRequest.getCurrentStoreId(),
      skus: skus,
      couponId: couponId
    },
    success: function(res) {
      var d = res.data
      _this.setData({
        orderId: orderId,
        block: d.block,
        subtotalItem: d.subtotalItem,
        actualAmount: d.actualAmount,
        originalAmount: d.originalAmount,
        coupon: d.coupon
      })
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: null,
    block: [],
    couponId: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    console.log("orderconfirm.orderid->>>>" + options.orderId)
    console.log("orderconfirm.skus->>>>" + JSON.stringify(options.skus))
    orderId = options.orderId == undefined ? null : options.orderId;
    skus = JSON.parse(options.skus);
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
    var _this = this
    getData(_this)
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

  },
  deliveryAddressSelect: function(e) {
    var _this = this
    var index = e.currentTarget.dataset.replyIndex
    var deliveryAddress = _this.data.block[index].deliveryAddress
    if (!deliveryAddress.canSelectElse)
      return
    wx.navigateTo({
      url: "/pages/deliveryAddress/deliveryAddress?operate=2&operateIndex=" + index,
      success: function(res) {
        // success
      },
    })
  },
  couponSelect: function(e) {
    var _this = this

    var couponId = _this.data.couponId

    wx.navigateTo({
      url: "/pages/mycoupon/mycoupon?operate=2&isGetHis=false&skus=" + JSON.stringify(skus) + "&couponId=" + JSON.stringify(couponId),
      success: function(res) {
        // success
      },
    })
  },
  unifiedOrder: function(e) {
    var _this = this
    console.log("orderconfirm.unifiedOrder->>>");
    if (orderId == undefined || orderId == null) {
      lumos.postJson({
        url: config.apiUrl.orderReserve,
        dataParams: {
          storeId: ownRequest.getCurrentStoreId(),
          payTimeout: 120,
          skus: skus
        },
        success: function(res) {
          if (res.result == lumos.resultType.success) {
            orderId = res.data.orderId
            cart.getPageData()
            _this.goPay()
          } else {
            toastUtil.showToast({
              title: res.message
            })
          }
        }
      })
    } else {
      _this.goPay()
    }
  },
  goPay: function() {
    console.log("orderconfirm.goPay->>>orderId:" + orderId);


    lumos.getJson({
      url: config.apiUrl.orderGetJsApiPaymentPms,
      dataParams: {
        orderId: orderId,
        payWay: 1,
        caller:2
      },
      success: function (res) {
        if (res.result == lumos.resultType.success) {
        
          var data = res.data;
          wx.requestPayment({
            'timeStamp': data.timestamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': 'MD5',
            'paySign': data.paySign,
            'success': function (res) {
              wx.redirectTo({
                url: '/pages/operate/operate?id=' + data.orderId+'&type=1&caller=1'
              })
            },
            'fail': function (res) {
              wx.redirectTo({
                url: '/pages/operate/operate?id=' + data.orderId + '&type=2&caller=1'
              })
            }
          })


        } else {
          toastUtil.showToast({
            title: res.message
          })
        }
      }
    })

  }


})