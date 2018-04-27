//index.js
//获取应用实例
const wxutil = require('../../utils/wxutil.js')
const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const cart = require('../../pages/cart/cart.js')
const index = require('../../pages/index/index.js')
const productkind = require('../../pages/productkind/productkind.js')
const personal = require('../../pages/personal/personal.js')
const toastUtil = require('../../utils/showtoastutil')

var app = getApp()

Page({
  data: {
    tag: "main",
    tabBarContentHeight: 0,
    name: "index",
    tabBar: [
      {
        "name": "index",
        "pagePath": "/pages/index/index.wxml",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home_fill.png",
        "text": "首页",
        "navTitle": "贩聚社团",
        "selected": true,
        "number": 0
      }, {
        "name": "productkind",
        "pagePath": "/pages/productkind/productkind.wxml",
        "iconPath": "/images/kind.png",
        "selectedIconPath": "/images/kind_fill.png",
        "text": "分类",
        "navTitle": "分类",
        "selected": false,
        "number": 0
      }, {
        "name": "cart",
        "pagePath": "/pages/cart/cart.wxml",
        "iconPath": "/images/cart.png",
        "selectedIconPath": "/images/cart_fill.png",
        "text": "购物车",
        "navTitle": "购物车",
        "selected": false,
        "number": 0
      }, {
        "name": "personal",
        "pagePath": "/pages/personal/personal.wxml",
        "iconPath": "/images/personal.png",
        "selectedIconPath": "/images/personal_fill.png",
        "text": "个人",
        "navTitle": "个人",
        "selected": false,
        "number": 0
      }
    ],
    "productKind": {
      "list": []
    },
    "cart": {
      "list": []
    }
  },

  loadMore: function (e) {
    console.log("main.loadMore")
    var _self = this
    var _dataset = e.currentTarget.dataset
    var index = _dataset.replyIndex //对应页面data-reply-index
    var name = _dataset.replyName //对应页面data-reply-name
    console.log("main.loadMore.index:" + index)
    console.log("main.loadMore.name:" + name)

  },

  refresh: function (e) {
    console.log("main.refresh")
    var _self = this
    var _dataset = e.currentTarget.dataset
    var index = _dataset.replyIndex //对应页面data-reply-index
    var name = _dataset.replyName //对应页面data-reply-name
    console.log("main.loadMore.index:" + index)
    console.log("main.loadMore.name:" + name)


  },
  changeData: function (data) {
    console.log("main.changeData")
    var _self = this;
    _self.setData(data)
  },

  onLoad: function () {
    console.log("main.onLoad")

    var _self = this;

    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight - res.screenWidth / 750 * 81
        console.log("windowHeight:" + height)
        _self.setData({
          tabBarContentHeight: height
        });
      }
    })

    wx.setNavigationBarTitle({
      title: _self.data.tabBar[0].navTitle
    })

    wxutil.getAuthorize({
      success: function (e) {
        //处理授权成功后
        console.log("main.onload.wxutil.getAuthorize.success")
        //_self.tabBarItemSetNumber(2,22);//设置tabar number提示

        httpUtil.getRequest(config.apiUrl.globalDataSet, { userId: 1215, merchantId: 241, posMachineId: 148, datetime: '2018-03-30' }, {
          success: function (res) {
            var productKind = res.data.productKind
            var cart = res.data.cart
            var personal = res.data.personal
            _self.setData({
              productKind: productKind,
              cart: cart,
              personal: personal
            })

            storeage.setProductKind(productKind)
            storeage.setCart(cart)

          },
          fail: function () {
          }
        })

      },
      fail: function (e) {
        //处理授权失败
        console.log("main.onload.wxutil.getAuthorize.fail")
      }
    })
  },

  mainTabBarItemClick(e) {
    console.log('tabbar.tabBarItemClick')
    var _self = this
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index

    var tabBar = _self.data.tabBar;

    for (var i = 0; i < tabBar.length; i++) {
      if (i == index) {
        tabBar[i].selected = true

        //设置页面标题
        wx.setNavigationBarTitle({
          title: tabBar[i].navTitle
        })

      }
      else {
        tabBar[i].selected = false
      }
    }


    this.setData({
      tabBar: tabBar
    })

  },

  mainTabBarItemSetNumber(index, num) {
    console.log('tabbar.tabBarItemSetNumber')
    var _self = this
    _self.data.tabBar[index].number = num
    this.setData({ tabBar: _self.data.tabBar })
  },

  kindBarItemClick(e) {
    console.log('kindBarItemClick');
    var _self = this
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    console.log('kindBarItemClick.index' + index)
    var list = _self.data.productKind.list;
    for (var i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].selected = true
      }
      else {
        list[i].selected = false
      }
    }

    _self.data.productKind.list = list
    this.setData({ productKind: _self.data.productKind })
  },


  cartBarListItemOperate(e) {
    console.log('cartBarListItemCheck');
    var _self = this
    var pIndex = e.currentTarget.dataset.replyPindex
    var cIndex = e.currentTarget.dataset.replyCindex
    var operate = e.currentTarget.dataset.replyOperate
    console.log('cartBarListItemCheck.pIndex:' + pIndex)
    console.log('cartBarListItemCheck.cIndex:' + cIndex)
    console.log('cartBarListItemCheck.operate' + operate)

    var sku = _self.data.cart.block[pIndex].skus[cIndex];

    switch (operate) {
      case "1":
        if (sku.selected) {
          sku.selected = false
        }
        else {
          sku.selected = true
        }
        break;
    }

    var operateList = new Array();
    operateList.push(sku);

    cart.operate({ userId: 1215, operate: operate, list: operateList }, {
      success: function (res) {
        _self.setData({ cart: res.data })
        _self.mainTabBarItemSetNumber(2, res.data.count)

      },
      fail: function () {
      }
    })
  },

  cartBarImmeBuy: function (e) {
    var _this = this

    var block = _this.data.cart.block

    var skus = []

    for (var i = 0; i < block.length; i++) {
      for (var j = 0; j < block[i].skus.length; j++) {
        if (block[i].skus[j].selected) {
          skus.push({
            carId: block[i].skus[j].cartId,
            skuId: block[i].skus[j].skuId,
            quantity: block[i].skus[j].quantity,
            channelId: block[i].skus[j].channelId,
            channelType: block[i].skus[j].channelType
          })
        }
      }
    }

    if (skus.length == 0) {
      toastUtil.showToast({ title: '至少选择一件商品' })
      return
    }

    wx.navigateTo({
      url: '/pages/orderconfirm/orderconfirm?skus=' + JSON.stringify(skus),
      success: function (res) {
        // success
      },
    })
  }




})

