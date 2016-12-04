var BrowserHelper = {};

/**
 * 判断是不是IE浏览器
 */
BrowserHelper.isIe = function() {
    if (!window.VBArray)
        return false;
    return true
};

/*
 * 在手机里打开，但是不在主流分享浏览器中打开，返回true
 * */
BrowserHelper.isWebView = function() {
    if (BrowserHelper.isMobile() && !BrowserHelper.isQQBrowser()
        && !BrowserHelper.isUCBrowser() && !WxSdkHelper.isWeixin() && !BrowserHelper.isWeibo()) {
        return true;
    } else {
        return false;
    }
};
//判断平台和浏览器
BrowserHelper.isMobile = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/mobile/i) == "mobile";
};

BrowserHelper.isQQBrowser = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/mqqbrowser/i) == "mqqbrowser";
};

BrowserHelper.isUCBrowser = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/ucbrowser/i) == "ucbrowser";
};

BrowserHelper.isWeixin = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

BrowserHelper.isWeibo = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/weibo/i) == "weibo";
};

BrowserHelper.isAndroid = function() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    return sUserAgent.match(/android/i) == "android";
};

BrowserHelper.isIOS = function() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    return sUserAgent.match(/iphone/i) == "iphone" || sUserAgent.match(/ipad/i) == "ipad";
};


module.exports = BrowserHelper;