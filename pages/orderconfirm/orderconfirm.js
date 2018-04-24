// pages/orderconfirm/orderconfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shippingAddress: [
      {
        id: 0,
        receiver: "邱庆文",
        phoneNumber: "15989287032",
        area: "广东升",
        address: "花都区",
        tagName: "快递地址",
        isDefault: true,
        canSelectElse: true
      },
      {
        id: 0,
        receiver: "邱庆文",
        phoneNumber: "15989287032",
        area: "广东升",
        address: "花都区",
        tagName: "快递地址",
        isDefault: false,
        canSelectElse: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var skus = JSON.parse(options.skus);
    console.log(options.skus)
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

  },
  shippingAddressSelect: function (e) {
    var _this = this
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var shippingaddress = _this.data.shippingAddress[index]
    if (!shippingaddress.canSelectElse)
      return
    wx.navigateTo({
      url: "/pages/shippingaddress/shippingaddress?operate=2&operateIndex=" + index,
      success: function (res) {
        // success
      },
    })
  }
})