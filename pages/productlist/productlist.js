const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const storeage = require('../../utils/storeageutil.js')
const app = getApp()

var getList = function (_this) {
  console.log("getList")
  //console.log("getList.pageIndex:" + _this.data.pageIndex)

  var currentTab;
  var currentTabIndex = -1;
  for (var i = 0; i < _this.data.tabs.length; i++) {
    if (_this.data.tabs[i].selected == true) {
      currentTab = _this.data.tabs[i];
      currentTabIndex = i;
    }
  }

  if (currentTabIndex == -1) {
    currentTabIndex = 0;
    currentTab = _this.data.tabs[currentTabIndex];
  }

  var pageIndex = currentTab.pageIndex
  var kindId = currentTab.kindId

  httpUtil.getRequest(config.apiUrl.productGetList, { userId: '00000000000000000000000000000000', storeId: 'BE9AE32C554D4942BE4A42FA48446210', pageIndex: pageIndex, kindId: kindId, name: "" }, {
    success: function (res) {
      console.log("config.apiUrl.productList->success")

      var list
      if (currentTab.pageIndex == 0) {
        list = res.data
      }
      else {
        list = _this.data.tabs[currentTabIndex].list.concat(res.data)
      }

      _this.data.tabs[currentTabIndex].list = list;

      _this.setData({
        tabs: _this.data.tabs
      })
    },
    fail: function () {
      console.log("config.apiUrl.productList->fail")
    }
  })
}

Page({
  data: {
    tag: "productlist",
    scrollHeight: 0
  },
  onLoad: function (options) {
    var _this = this

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          scrollHeight: res.windowHeight - 41
        });
      }
    });

    var kindId = options.kindId == undefined ? "0" : options.kindId
    var pKindId = options.pKindId == undefined ? "0" : options.pKindId
    console.log("当前选择->pKindId:" + pKindId + "，kindId:" + kindId)

    //加载tab数据，从缓存对象获取
    var productKinds = storeage.getProductKind().list

    var tabs = new Array()
    var tabsSliderIndex = -1 //默认未选择tab
    for (var i = 0; i < productKinds.length; i++) {
      if (productKinds[i].id == pKindId) {

        wx.setNavigationBarTitle({
          title: productKinds[i].name
        })

        for (var j = 0; j < productKinds[i].child.length; j++) {
          var selected = false
          if (productKinds[i].child[j].id == kindId) {
            selected = true
            tabsSliderIndex = j
          }
          var tab = {
            kindId: productKinds[i].child[j].id,
            name: productKinds[i].child[j].name,
            pageIndex: 0,
            selected: selected,
            list: null,
            scrollTop: 0
          }
          tabs.push(tab)
        }
      }
    }

    _this.setData({
      tabs: tabs,
      tabsSliderIndex: tabsSliderIndex
    })

    getList(_this)

  },
  //加载更多
  loadMore: function (e) {
    var _this = this
    console.log("loadMore");
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    _this.data.tabs[index].pageIndex += 1
    _this.setData({
      tabs: _this.data.tabs
    })
    getList(_this)
  },
  //刷新处理
  refesh: function (e) {
    var _this = this
    console.log("refesh")
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var scrollTop = e.detail.scrollTop
    _this.data.tabs[index].pageIndex = 0
    _this.data.tabs[index].scrollTop = 0
    _this.setData({
      tabs: _this.data.tabs
    })
    getList(_this)
  },

  scroll: function (e) {
    var _this = this
    console.log("scroll")
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var scrollTop = e.detail.scrollTop

    console.log("scrollTop:" + scrollTop)

    _this.data.tabs[index].scrollTop = scrollTop
    _this.setData({
      tabs: _this.data.tabs
    })

  },

  //tab点击
  tabBarClick: function (e) {
    console.log("tabBarClick");
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var kindId = e.currentTarget.dataset.replykindId //对应页面data-reply-index
    var _this = this

    for (var i = 0; i < _this.data.tabs.length; i++) {
      if (i == index) {
        _this.data.tabs[i].selected = true;
      }
      else {
        _this.data.tabs[i].selected = false;
      }
    }
    _this.setData({
      tabs: _this.data.tabs,
      tabsSliderIndex: index
    })

    getList(_this)
  },
  // 滚动切换标签样式
  swiperSwitchTab: function (e) {

    var index = e.detail.current //对应页面data-reply-index
    var _this = this

    for (var i = 0; i < _this.data.tabs.length; i++) {
      if (i == index) {
        _this.data.tabs[i].selected = true;
      }
      else {
        _this.data.tabs[i].selected = false;
      }
    }
    _this.setData({
      tabs: _this.data.tabs,
      tabsSliderIndex: index
    })

    getList(_this)

  }
})
