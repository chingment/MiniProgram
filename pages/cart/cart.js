const config = require('../../config');
const storeage = require('../../utils/storeageutil.js')
const ownRequest = require('../../own/ownRequest.js')
const lumos = require('../../utils/lumos.minprogram.js')

function operate(params, requestHandler) {

  console.log('ownRequest.getCurrentStoreId():' + ownRequest.getCurrentStoreId())

  lumos.postJson({
    url: config.apiUrl.cartOperate,
    dataParams: params,
    success: function(d) {
      requestHandler.success(d)
      storeage.setCart(d.data)
    }
  })
}

function getPageData() {

  lumos.getJson({
    url: config.apiUrl.cartGetPageData,
    urlParams: {
      storeId: ownRequest.getCurrentStoreId()
    },
    success: function(res) {
      storeage.setCart(res.data)
    }
  })
}

module.exports = {
  operate: operate,
  getPageData: getPageData
}