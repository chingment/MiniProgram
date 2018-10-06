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
const ownRequest = require('../../own/ownRequest.js')
var app = getApp()

Page({
  data: {
    scrollHeight: 500,
    tag: "main",
    tabBarContentHeight: 0,
    name: "index",
    tabBar: [{
      name: "index",
      pagePath: "/pages/index/index.wxml",
      iconPath: "/content/default/images/home.png",
      selectedIconPath: "/content/default/images/home_fill.png",
      text: "首页",
      navTitle: "贩聚社团",
      selected: true,
      number: 0
    }, {
      name: "productkind",
      pagePath: "/pages/productkind/productkind.wxml",
      iconPath: "/content/default/images/kind.png",
      selectedIconPath: "/content/default/images/kind_fill.png",
      text: "分类",
      navTitle: "分类",
      selected: false,
      number: 0
    }, {
      name: "cart",
      pagePath: "/pages/cart/cart.wxml",
      iconPath: "/content/default/images/cart.png",
      selectedIconPath: "/content/default/images/cart_fill.png",
      text: "购物车",
      navTitle: "购物车",
      selected: false,
      number: 0
    }, {
      name: "personal",
      pagePath: "/pages/personal/personal.wxml",
      iconPath: "/content/default/images/personal.png",
      selectedIconPath: "/content/default/images/personal_fill.png",
      text: "个人",
      navTitle: "个人",
      selected: false,
      number: 0
    }],
    index: {

      banner: {
        imgs: [],
        currentSwiper: 0,
        autoplay: true
      },
      pdArea: {
        tabs: [{
          name: "热门推荐",
          selected: true,
          list: []
        }, {
          name: "休闲零食",
          selected: false,
          list: []
        }, {
          name: "营养食品",
          selected: false,
          list: []
        }, {
          name: "百货用品",
          selected: false,
          list: []
        }],
        tabsSliderIndex: 0
      }
    },
    productKind: {
      list: []
    },
    cart: {
      list: []
    }
  },
  loadMore: function(e) {
    console.log("main.loadMore")
    var _self = this
    var _dataset = e.currentTarget.dataset
    var index = _dataset.replyIndex //对应页面data-reply-index
    var name = _dataset.replyName //对应页面data-reply-name
    console.log("main.loadMore.index:" + index)
    console.log("main.loadMore.name:" + name)
  },
  refresh: function(e) {
    console.log("main.refresh")
    var _self = this
    var _dataset = e.currentTarget.dataset
    var index = _dataset.replyIndex //对应页面data-reply-index
    var name = _dataset.replyName //对应页面data-reply-name
    console.log("main.loadMore.index:" + index)
    console.log("main.loadMore.name:" + name)
  },
  changeData: function(data) {
    console.log("main.changeData")
    var _self = this;
    _self.setData(data)
  },
  onLoad: function() {
    console.log("main.onLoad")

    var _self = this;

    if (!ownRequest.isLogin()) {
      //return;
    }

    wx.getSystemInfo({
      success: function(res) {
         var height = wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth  / 26 * (3.044)
        console.log("windowHeight:" + height)
        _self.setData({
          tabBarContentHeight: height
        });
      }
    })

    wx.setNavigationBarTitle({
      title: _self.data.tabBar[0].navTitle
    })

    console.log("main.onload.wxutil.getAuthorize.success")

    httpUtil.getRequest(config.apiUrl.globalDataSet, {
      userId: ownRequest.getCurrentUserId(),
      storeId: 'be9ae32c554d4942be4a42fa48446210',
      datetime: '2018-03-30'
    }, {
      success: function(res) {
        var index = res.data.index
        var productKind = res.data.productKind
        var cart = res.data.cart
        var personal = res.data.personal
        _self.setData({
          index: index,
          productKind: productKind,
          cart: cart,
          personal: personal
        })

        storeage.setProductKind(productKind)
        storeage.setCart(cart)

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

      } else {
        tabBar[i].selected = false
      }
    }
    this.setData({
      tabBar: tabBar
    })
  },
  indexBarBannerSwiperChange: function(e) {
    var _index = this.data.index;
    _index.banner.currentSwiper = e.detail.current;
    this.setData({
      index: _index
    })
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
      } else {
        list[i].selected = false
      }
    }
    _self.data.productKind.list = list
    this.setData({
      productKind: _self.data.productKind
    })
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
        } else {
          sku.selected = true
        }
        break;
    }

    var operateSkus = new Array();
    operateSkus.push({
      skuId: sku.id,
      quantity: 1,
      selected: sku.selected,
      channelId: sku.channelId,
      channelType: sku.channelType
    });

    cart.operate({
      userId: ownRequest.getCurrentUserId(),
      storeId: 'BE9AE32C554D4942BE4A42FA48446210',
      operate: operate,
      skus: operateSkus
    }, {
      success: function(res) {
        _self.setData({
          cart: res.data
        })
        app.mainTabBarSetNumber(2, res.data.count)
      },
      fail: function() {}
    })
  },
  cartBarImmeBuy: function(e) {
    var _this = this

    var block = _this.data.cart.block

    var skus = []

    for (var i = 0; i < block.length; i++) {
      for (var j = 0; j < block[i].skus.length; j++) {
        if (block[i].skus[j].selected) {
          skus.push({
            carId: block[i].skus[j].cartId,
            id: block[i].skus[j].id,
            quantity: block[i].skus[j].quantity,
            channelId: block[i].skus[j].channelId,
            channelType: block[i].skus[j].channelType
          })
        }
      }
    }

    if (skus.length == 0) {
      toastUtil.showToast({
        title: '至少选择一件商品'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/orderconfirm/orderconfirm?skus=' + JSON.stringify(skus),
      success: function(res) {
        // success
      },
    })
  },
  addToCart: function(e) {
    var _self = this
    var skuId = e.currentTarget.dataset.replySkuid //对应页面data-reply-index
    console.log("skuId:" + skuId)
    var skus = new Array();
    skus.push({
      skuId: skuId,
      quantity: 1,
      selected: true,
      channelId: 1,
      channelType: 1
    });

    cart.operate({
      userId: '00000000000000000000000000000000',
      storeId: 'BE9AE32C554D4942BE4A42FA48446210',
      operate: 2,
      skus: skus
    }, {
      success: function(res) {},
      fail: function() {}
    })
  }
})