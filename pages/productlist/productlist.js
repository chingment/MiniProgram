var httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config');



var app = getApp()

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

  var pageIndex = currentTab.pageIndex
  var kindId = currentTab.kindId

  httpUtil.getRequest(config.apiUrl.productGetList, { userId: 1215, merchantId: 241, posMachineId: 148, pageIndex: pageIndex, "type": 0, categoryId: 0, kindId: kindId, name: "" }, {
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

  },
  onLoad: function (options) {

    var kindId = options.kindId == undefined ? "0" : options.kindId
    var pKindId = options.pKindId == undefined ? "0" : options.pKindId
    console.log("kindId:" + kindId)
    console.log("pKindId:" + pKindId)


    var productKinds = app.productKind.list
    var tabs = new Array()
    var tabsSliderIndex = -1
    for (var i = 0; i < productKinds.length; i++) {

      if (productKinds[i].id == pKindId) {
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
            list: null
          }

          tabs.push(tab)
        }
      }
    }

    console.log(JSON.stringify(productKinds))

    // var tabs = [{
    //   categoryId: '1',
    //   name: '栏目1',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }, {
    //   categoryId: '2',
    //   name: '栏目2',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }, {
    //   categoryId: '3',
    //   name: '栏目3',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }, {
    //   categoryId: '4',
    //   name: '栏目4',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }, {
    //   categoryId: '5',
    //   name: '栏目5',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }, {
    //   categoryId: '6',
    //   name: '栏目6',
    //   pageIndex: 0,
    //   selected: true,
    //   list: null
    // }, {
    //   categoryId: '7',
    //   name: '栏目7',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }, {
    //   categoryId: '8',
    //   name: '栏目8',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }, {
    //   categoryId: '9',
    //   name: '栏目9',
    //   pageIndex: 0,
    //   selected: false,
    //   list: null
    // }
    // ]

    var _this = this;
    _this.setData({
      tabs: tabs,
      tabsSliderIndex: tabsSliderIndex
    })

    getList(_this)

  },
  //加载更多
  loadMore: function (e) {
    console.log("loadMore");
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var _this = this
    _this.data.tabs[index].pageIndex += 1
    _this.setData({
      tabs: _this.data.tabs
    })
    getList(_this)
  },
  //刷新处理
  refesh: function (e) {
    console.log("refesh");
    var index = e.currentTarget.dataset.replyIndex //对应页面data-reply-index
    var _this = this
    _this.data.tabs[index].pageIndex = 0
    _this.setData({
      tabs: _this.data.tabs
    })
    getList(_this)
  },

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
      tabs: _this.data.tabs
    })

    getList(_this)
  }



})
