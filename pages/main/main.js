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
      "list": [{
        "id": 1,
        "name": "女装1",
        "imgUrl": "http://120.79.233.231:8087/upload/CarInsuranceCompany/tpybx.png",
        "selected": true,
        "child": [{
          "id": 5,
          "name": "上衣",
          "imgUrl": "http://120.79.233.231:8087/upload/CarInsuranceCompany/tpybx.png"
        }]
      }, {
        "id": 1,
        "name": "女装2",
        "imgUrl": "http://120.79.233.231:8087/upload/CarInsuranceCompany/tpybx.png",
        "selected": false
      }, {
        "id": 1,
        "name": "女装3",
        "imgUrl": "http://120.79.233.231:8087/upload/CarInsuranceCompany/tpybx.png",
        "selected": false
      }]
    },
    "cart": {
      "list": [
        {
          "skuId": 1,
          "skuName": "产品1",
          "skuMainImg": "http://120.79.233.231:8087/upload/CarInsuranceCompany/tpybx.png",
          "quantity": 1,
          "selected": false
        }, {
          "skuId": 2,
          "skuName": "产品2",
          "skuMainImg": "http://120.79.233.231:8087/upload/CarInsuranceCompany/tpybx.png",
          "quantity": 3,
          "selected": true
        }
      ]
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
            console.log("config.apiUrl.home->success")

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
            console.log("config.apiUrl.home->fail")
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
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var operate = e.currentTarget.dataset.replyOperate //对应页面data-reply-index
    console.log('cartBarListItemCheck.index' + index)
    console.log('cartBarListItemCheck.operate' + operate)
    var list = _self.data.cart.list;

    var list_item = _self.data.cart.list[index];

    switch (operate) {
      case "1":
        if (list_item.selected) {
          list_item.selected = false
        }
        else {
          list_item.selected = true
        }
        break;
    }

    var operateList = new Array();
    operateList.push(list_item);


    // wx.showModal({
    //   title: '提示',
    //   content: '确定要删除吗？',
    //   success: function (sm) {
    //     if (sm.confirm) {
    //       // 用户点击了确定 可以调用删除方法了
    //     } else if (sm.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    cart.operate({ userId: 1215, operate: operate, list: operateList }, {
      success: function (res) {
        console.log("config.apiUrl.cartOperate->success")
        _self.setData({ cart: res.data })
        _self.mainTabBarItemSetNumber(2, res.data.count)

      },
      fail: function () {
        console.log("config.apiUrl.cartOperate->fail")
      }
    })
  },

  cartBarImmeBuy: function (e) {
    var _this = this

    var cartSkus = _this.data.cart.list

    var skus = []

    for (var i = 0; i < cartSkus.length; i++) {
      if (cartSkus[i].selected) {
        skus.push({
          carId: cartSkus[i].cartId,
          productSkuId: cartSkus[i].skuId,
          quantity: cartSkus[i].quantity
        })
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

