const httpUtil = require("../utils/apphttputil.js")
const config = require('../config')
const storeage = require('../utils/storeageutil.js')


var loginPage = '../login/login'

function getAccessonToken() {

  var token = "00000000000000000000000000000001"
  return token
}

function getCurrentUserId() {

  var userId = "00000000000000000000000000000001"
  return userId
}

function getCurrentStoreId() {
  var store = storeage.getCurrentStore();
  return store.id
}

function getCurrentStore() {
  console.log("storeage.getCurrentStore():" + storeage.getCurrentStore())

  var store = storeage.getCurrentStore();

  if (store == "")
    return undefined

  return storeage.getCurrentStore()
}

function setCurrentStore(store) {
  storeage.setCurrentStore(store)
}

function isLogin() {

  var acctoken = storeage.getAccessToken()
  if (acctoken == "") {
    showLoginModal()
    return false
  } else {
    return true
  }
}




function isSelectedStore(isGoSelect) {
  var store = storeage.getCurrentStore()
  if (store == "") {
    console.log("当前没有选择店铺")

    isGoSelect = isGoSelect == undefined ? false : isGoSelect

    if (isGoSelect) {
      wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
        url: "/pages/store/store"
      })
    }

    return false
  } else {
    console.log("当前已选择店铺")
    return true
  }
}

function login(callback) {
  wx.showLoading()
  wx.login({
    success(res) {
      if (res.code) {
        // 登录成功，获取用户信息
        getUserInfo(res.code, callback)
      } else {
        // 否则弹窗显示，showToast需要封装
        showToast()
      }
    },
    fail() {
      showToast()
    }
  })
}

// 获取用户信息
function getUserInfo(code, callback) {
  wx.getUserInfo({
    // 获取成功，全局存储用户信息，开发者服务器登录
    success(res) {
      //console.log("code:" + code)
      //console.log("iv:" + res.iv)
      //console.log("encryptedData:" + res.encryptedData)
      console.log("userInfo:" + JSON.stringify(res))
      // 全局存储用户信息
      //store.commit('storeUpdateWxUser', res.userInfo)
      // postLogin(code, res.iv, res.encryptedData, callback)


      let params = {
        code: code,
        iv: res.iv,
        encryptedData: res.encryptedData
      }

      httpUtil.postRequest(config.apiUrl.userLoginByMinProgram, params, {
        success: function (res) {
          if (res.result == 1) {
            storeage.setAccessToken(res.data.accessToken);
            console.log("getAccessonToken" + storeage.getAccessToken())
            callback && callback()
          }

        },
        fail: function () {
          showToast()
        }
      })


    },
    // 获取失败，弹窗提示一键登录
    fail() {
      wx.hideLoading()
      // 获取用户信息失败，清楚全局存储的登录状态，弹窗提示一键登录
      // 使用token管理登录态的，清楚存储全局的token
      // 使用cookie管理登录态的，可以清楚全局登录状态管理的变量
      //store.commit('storeUpdateToken', '')
      // 获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录，后续会讲
      showLoginModal()
    }
  })
}


function showLoginModal() {
  wx.showModal({
    title: '提示',
    content: '你还未登录，登录后可获得完整体验 ',
    showCancel: false,
    confirmText: '一键登录',
    success(res) {
      // 点击一键登录，去授权页面
      if (res.confirm) {
        wx.navigateTo({
          url: loginPage,
        })
      }
    }
  })
}

function showToast(content = '登录失败，请稍后再试') {
  wx.showToast({
    title: content,
    icon: 'none'
  })
}

module.exports = {
  getCurrentUserId: getCurrentUserId,
  getCurrentStoreId: getCurrentStoreId,
  setCurrentStore: setCurrentStore,
  getCurrentStore: getCurrentStore,
  isSelectedStore: isSelectedStore,
  isLogin: isLogin,
  login: login
}