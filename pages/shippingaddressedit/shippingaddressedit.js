const app = getApp()
const httpUtil = require("../../utils/apphttputil.js")
const config = require('../../config')
const cityList = require('./cityList').cityList
const toastUtil = require('../../utils/showtoastutil')  

Page({
  data: {
    address: {area: ""},
    showArea: false,
    currentTab: 1,
    country: [],
    residecity: [],
    resideprovince: [],

    curr_pro: '',
    curr_cit: '',
    curr_cou: '',
    shippingAddress: {
      id: 0,
      receiver: "",
      phoneNumber: "",
      area: "",
      address: "",
      isDefault: false
    },
    shippingAddress_isDefault: false
  },

  choosearea: function () {

    let result = this.data.address;
    var currentTab = 1;
    if (result.country) {
      currentTab = 3;
    } else if (result.residecity) {
      currentTab = 3;
    } else if (result.resideprovince) {
      currentTab = 1;
    } else {
      currentTab = 1;
    }

    let resideprovince = [];
    let residecity = [];
    let country = [];

    cityList.forEach((item) => {
      resideprovince.push({
        name: item.name
      });
      if (item.name == result.resideprovince) {
        item.city.forEach((item) => {
          residecity.push({
            name: item.name
          });
          if (item.name == result.residecity) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      showArea: true,
      resideprovince: resideprovince,
      residecity: residecity,
      country: country,

      currentTab: currentTab,
      curr_pro: result.resideprovince || '请选择',
      curr_cit: result.residecity || '请选择',
      curr_cou: result.country || '请选择',
    });
  },
  areaClose: function () {
    this.setData({
      showArea: false
    });
  },
  //点击省选项卡
  resideprovince: function (e) {
    this.setData({
      currentTab: 1
    });
  },
  //点击市选项卡
  residecity: function () {
    this.setData({
      currentTab: 2
    });
  },
  country: function () {
    this.setData({
      currentTab: 3
    });
  },
  //点击选择省
  selectResideprovince: function (e) {
    let residecity = [];
    let country = [];
    let name = e.currentTarget.dataset.itemName;

    cityList.forEach((item) => {
      if (item.name == name) {
        item.city.forEach((item, index) => {
          residecity.push({
            name: item.name
          });
          if (index == 0) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      currentTab: 2,
      residecity: residecity,
      country: country,
      curr_pro: e.currentTarget.dataset.itemName,
      curr_cit: '请选择',
      curr_cou: '',
    });
  },
  //点击选择市
  selectResidecity: function (e) {
    let country = [];
    let name = e.currentTarget.dataset.itemName;
    cityList.forEach((item) => {
      if (item.name == this.data.curr_pro) {
        item.city.forEach((item, index) => {
          if (item.name == name) {
            item.area.forEach((item) => {
              country.push({
                name: item.name
              });
            });
          }
        });
      }
    });

    this.setData({
      currentTab: 3,
      country: country,
      curr_cit: e.currentTarget.dataset.itemName,
      curr_cou: '请选择',
    });
  },
  //点击选择区
  selectCountry: function (e) {
    this.data.curr_cou = e.currentTarget.dataset.itemName;

    this.data.address.resideprovince = this.data.curr_pro;
    this.data.address.residecity = this.data.curr_cit;
    this.data.address.country = this.data.curr_cou;

    this.data.address.area = this.data.curr_pro + "-" + this.data.curr_cit + '-' + this.data.curr_cou


    this.setData({
      showArea: false,
      curr_cou: this.data.curr_cou,
      address: this.data.address
    });

  },
  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current + 1
    });
  },
  isDefaultEvent: function (e) {
    this.setData({
      shippingAddress_isDefault: !this.data.shippingAddress_isDefault
    })
  },
  onLoad: function (options) {
    var _this = this
    var id = options.id;
    if (id != "0") {
      console.log(options.shippingAddress)
      var shippingAddress = JSON.parse(options.shippingAddress)

      _this.data.address.area = shippingAddress.area
      _this.data.address.resideprovince = shippingAddress.area.split('-')[0];
      _this.data.address.residecity = shippingAddress.area.split('-')[1];
      _this.data.address.country = shippingAddress.area.split('-')[2];

      _this.data.shippingAddress_isDefault = shippingAddress.isDefault
      _this.setData({
        shippingAddress: shippingAddress,
        address: _this.data.address,
        shippingAddress_isDefault: _this.data.shippingAddress_isDefault
      })
    }

  },
  formSubmit: function (e) {
    var id = e.detail.value.shippingAddress_id
    var receiver = e.detail.value.shippingAddress_receiver
    var phoneNumber = e.detail.value.shippingAddress_phoneNumber
    var area = e.detail.value.shippingAddress_area
    var address = e.detail.value.shippingAddress_address
    var isDefault = e.detail.value.shippingAddress_isDefault

    if (receiver.length == 0) {
      toastUtil.showToast({ title: '请输入姓名' })
      return
    }
    if (phoneNumber.length == 0) {
      toastUtil.showToast({ title: '请输入手机号码' })
      return
    }
    if (area.length == 0) {
      toastUtil.showToast({ title: '请选择身份，城市，区县' })
      return
    }
    if (address.length == 0) {
      toastUtil.showToast({ title: '请输入详细地址' })
      return
    }

    httpUtil.postRequest(config.apiUrl.shippingAddressEdit, { id: id, userId: 1215, receiver: receiver, phoneNumber: phoneNumber, area: area, address: address, isDefault: isDefault }, {
      success: function (res) {
        wx.navigateBack()
      },
      fail: function () {
      }
    })

  }

});
