/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "https://demo.res.17fanju.com/api"

var config = {
  // 下面的地址配合云端 Server 工作
  host,
  key: `test`,
  secret: '6ZB97cdVz211O08EKZ6yriAYrHXFBowC',
  apiUrl: {
    // 获取分类
    home: `${host}/Account/Home`,
    globalDataSet: `${host}/Global/DataSet`,
    cartOperate: `${host}/Cart/Operate`,
    productGetList: `${host}/ProductSku/List`,
    productGetSkuDetails: `${host}/ProductSku/Details`,
    deliveryAddressEdit: `${host}/DeliveryAddress/Edit`,
    deliveryAddressMy: `${host}/DeliveryAddress/My`,
    orderConfirm: `${host}/Order/Confirm`,
    couponMy: `${host}/Coupon/My`,
    storeList: `${host}/Store/List`
  }

};

module.exports = config
