const key_productkind = "key_productkind"
const key_cart = "key_cart"

function getProductKind() {
  return wx.getStorageSync(key_productkind) || []
}

function setProductKind(productkind) {
  wx.setStorageSync(key_productkind, productkind)
}

function getCart() {
  return wx.getStorageSync(key_cart) || []
}

function setCart(cart) {
  wx.setStorageSync(key_cart, cart)

  //设置页面的标志点
  var pages = getCurrentPages();
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].data.tag == "main") {
      pages[i].data.tabBar[2].number = cart.count
      pages[i].setData({ cart: cart, tabBar: pages[i].data.tabBar })
    }
    else if (pages[i].data.tag == "productdetails") {
      pages[i].setData({ cart: cart })
    }
  }

}

module.exports = {
  getProductKind: getProductKind,
  setProductKind: setProductKind,
  getCart: getCart,
  setCart: setCart
}