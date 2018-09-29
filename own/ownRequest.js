var loginPage='../login/login'

function getAccessonToken() {

  var token = "00000000000000000000000000000001"
  return token
}

function getCurrentUserId() {

  var userId = "00000000000000000000000000000001"
  return userId
}

function getCurrentStoreId() {

  var storeId = "00000000000000000000000000000000"
  return storeId
}

function isLogin() {

  showLoginModal()
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
      console.log("code:" + code)
      console.log("iv:" + res.iv)
      console.log("encryptedData:" + res.encryptedData)
      console.log("encryptedData:" + JSON.stringify(res))
      // 全局存储用户信息
      //store.commit('storeUpdateWxUser', res.userInfo)
      //postLogin(code, res.iv, res.encryptedData, callback)
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

// 开发者服务端登录
function postLogin(code, iv, encryptedData, callback) {
  let params = {
    code: code,
    iv: iv,
    encryptedData: encryptedData
  }
  request(apiUrl.postLogin, params, 'post').then((res) => {
    if (res.code == 1) {
      wx.hideLoading()
      // 登录成功，
      // 使用token管理登录态的，存储全局token，用于当做登录态判断，
      // 使用cookie管理登录态的，可以存任意变量当做已登录状态
      store.commit('storeUpdateToken', res.data.token)
      callback && callback()
    } else {
      showToast()
    }
  }).catch((err) => {
    showToast()
  })
}

function showLoginModal() {
  wx.showModal({
    title: '提示',
    content: '你还未登录，登录后可获得完整体验 ',
    showCancel:false,
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
  isLogin: isLogin,
  login: login
}