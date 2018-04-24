const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const app = getApp()

var getList = function (_this) {

  httpUtil.getRequest(config.apiUrl.shippingAddressGetList, { userId: 1215 }, {
    success: function (res) {
      console.log("config.apiUrl.productList->success")
      _this.setData({
        list: res.data
      })
    },
    fail: function () {
      console.log("config.apiUrl.productList->fail")
    }
  })
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    operate: 0,
    operateIndex: 0,
    list: [{
      receiver: "邱庆文",
      phoneNumber: "1598927032",
      address: "广州市区花都区狮岭镇振兴村",
      isDefault: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var operate = parseInt(options.operate)
    var operateIndex = parseInt(options.operateIndex)
    console.log("operateIndex:" + operateIndex)
    var title = ""
    switch (operate) {
      case 1:
        title = "地址管理";
        break;
      case 2:
        title = "选择地址";
        break;
    }
    wx.setNavigationBarTitle({
      title: title,
    })

    _this.setData({ operate: operate, operateIndex: operateIndex })
    getList(_this)
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
    getList(_this)
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
  goEdit: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var shippingaddress = _this.data.list[index]
    wx.navigateTo({
      url: '/pages/shippingaddressedit/shippingaddressedit?id=' + shippingaddress.id + "&shippingAddress=" + JSON.stringify(shippingaddress),
      success: function (res) {
        // success
      },
    })
  },
  goSelect: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var shippingaddress = _this.data.list[index]

    if (_this.data.operate == 2) {

      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.data.shippingAddress[_this.data.operateIndex].id = shippingaddress.id
      prevPage.data.shippingAddress[_this.data.operateIndex].receiver = shippingaddress.receiver
      prevPage.data.shippingAddress[_this.data.operateIndex].phoneNumber = shippingaddress.phoneNumber
      prevPage.data.shippingAddress[_this.data.operateIndex].address = shippingaddress.address
      prevPage.data.shippingAddress[_this.data.operateIndex].area = shippingaddress.area
      prevPage.data.shippingAddress[_this.data.operateIndex].isDefault = shippingaddress.isDefault

      prevPage.setData({
        shippingAddress: prevPage.data.shippingAddress
      })

      wx.navigateBack()
    }

  }
})