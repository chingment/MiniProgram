var httpUtil = require("../../utils/apphttputil.js") 
const config = require('../../config');

Page({
  data: {
  
  },
  onLoad: function () {
    
    httpUtil.getRequest(config.apiUrl.home, { userId: 1215, merchantId: 241, posMachineId: 148, datetime:'2018-03-30'})

  }
})
