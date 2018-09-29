var httpUtil = require("../utils/httputil.js")
const config = require('../config');
const sha256_digest = require('../utils/sha256').sha256_digest;
const base64Encode = require('../utils/base64').base64Encode;
const storeage = require('../utils/storeageutil.js')

function getSecondTimestamp() {
  var timestamp = Date.parse(new Date());
  return timestamp / 1000;
}

function getSign(key, secret, timestamp, params) {

  var arr = new Array();
  arr.push(key);
  arr.push(secret);
  arr.push(timestamp);
  if (params) {

    if (typeof(params) == "object") {
      var s1 = JSON.stringify(params);
      console.log('s1:' + s1)
      arr.push(s1);
    } else if (typeof(params) == "string") {
      arr.push(encodeURI(params));
    }
  }
  var str = arr.join("");
  //console.log("str:" + str)
  var strArr = str.split('');
  str = strArr.sort().join("");


  //console.log("str:" + str)
  return sha256_digest(str);
}

function parseUrlParam(param, key) {

  var paramStr = "";

  if (param instanceof String || param instanceof Number || param instanceof Boolean) {

    paramStr += "&" + key + "=" + encodeURIComponent(param).toUpperCase();

  } else {


    for (var p in param) { //遍历json对象的每个key/value对,p为key
      paramStr += p + '=' + encodeURIComponent(param[p]).toUpperCase() + '&';

    }

    paramStr = paramStr.substring(0, paramStr.length - 1);
  }

  return paramStr;
}


function request(url, method, urlParams, dataParams, requestHandler) {

  //console.log("apphttpUtil.request")
  //console.log("apphttpUtil.url:" + url)
  //console.log("apphttpUtil.method:" + method)


  let timestamp = getSecondTimestamp();
  let header = {};
  header.key = config.key;
  header.timestamp = timestamp;

  //console.log("apphttpUtil.key:" + config.key)
  //console.log("apphttpUtil.timestamp:" + timestamp)

  var body = [];

  if (url.indexOf("?") < 0) {
    url += "?"
  }
  var params = "";
  if (urlParams != null) {
    params = parseUrlParam(urlParams) + "&accesstoken=" + storeage.getAccessToken()
  } else {
    params = "&accesstoken=" + storeage.getAccessToken()
  }

  url += params;

  console.log("apphttpUtil.url:" + url)

  if (method == "POST") {
    body = dataParams;
    console.log("apphttpUtil.dataParams:" + JSON.stringify(dataParams))
  }

  //let hexSign = getSign(config.key, config.secret, timestamp, params);
  //let base64Sign = base64Encode(hexSign);
  //header.sign = base64Sign;
  // console.log("apphttpUtil.sign:" + base64Sign)
  
  httpUtil.wxRequest(url, method, header, body, {
    success: function(res) {
      requestHandler.success(res.data);
    },
    fail: function() {
      requestHandler.fail();
    }
  });

}


function getRequest(url, urlParams, requestHandler) {
  request(url, "GET", urlParams, null, requestHandler)
}

function postRequest(url, urlParams, dataParams, requestHandler) {
  request(url, "POST", urlParams, dataParams, requestHandler)
}

function postRequest(url, dataParams, requestHandler) {
  request(url, "POST", null, dataParams, requestHandler)
}

module.exports = {
  getRequest: getRequest,
  postRequest: postRequest
}