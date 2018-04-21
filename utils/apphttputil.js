var httpUtil = require("../utils/httputil.js")
const config = require('../config');
const sha256_digest = require('../utils/sha256').sha256_digest;
const base64Encode = require('../utils/base64').base64Encode;

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
    if (typeof (params) == "object") {
      arr.push(JSON.stringify(params));
    }
    else if (typeof (params) == "string") {
      arr.push(encodeURI(params));
    }
  }
  var str = arr.join("");
  console.log("str:" + str)
  var strArr = str.split('');
  str = strArr.sort().join("");
  console.log("str:" + str)
  return sha256_digest(str);
}

function parseUrlParam(param, key) {

  var paramStr = "";

  if (param instanceof String || param instanceof Number || param instanceof Boolean) {

    paramStr += "&" + key + "=" + encodeURIComponent(param);

  }
  else {


    for (var p in param) {//遍历json对象的每个key/value对,p为key
      paramStr +=p+'=' + encodeURIComponent(param[p]) + '&';

    }

    paramStr = paramStr.substring(0, paramStr.length-1);
  }

  return paramStr;
}


  function request(url, method, params, requestHandler) {

    console.log("apphttpUtil.request")
    console.log("apphttpUtil.url:" + url)
    console.log("apphttpUtil.method:" + method)
    console.log("apphttpUtil.params:" + JSON.stringify(params))

    let timestamp = getSecondTimestamp();
    let header = {};
    header.key = config.key;
    header.timestamp = timestamp;

    console.log("apphttpUtil.key:" + config.key)
    console.log("apphttpUtil.timestamp:" + timestamp)

    if (method == "GET") {
      if (url.indexOf("?") < 0) {
        url += "?"
      }
      params = parseUrlParam(params);
      url += params;
    }

    console.log("apphttpUtil.url:" + url)

    let hexSign = getSign(config.key, config.secret, timestamp, params);
    let base64Sign = base64Encode(hexSign);
    header.sign = base64Sign;
    console.log("apphttpUtil.sign:" + base64Sign)
    httpUtil.wxRequest(url, method, header, params, {
      success: function (res) {
        console.log("apphttpUtil->sucees:" +JSON.stringify(res))
        requestHandler.success(res.data);
      },
      fail: function () {
        console.log("apphttpUtil->fail")
        requestHandler.fail();
      }
    });

  }

  function getRequest(url, params, requestHandler) {
    request(url, "GET", params, requestHandler)
  }

  function postRequest(url, params, requestHandler) {
    request(url, "POST", params, requestHandler)
  }

  module.exports = {
    getRequest: getRequest,
    postRequest: postRequest
  }  