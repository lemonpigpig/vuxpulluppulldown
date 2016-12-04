var WxSdkHelper = {};

WxSdkHelper.loadWechatConfig = function() {
    if (!WxSdkHelper.isWeiXin()) {
        return;
    }

    weiXin.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        document.title = "全球时尚，有范搭配";
        // 用来暗示错误
    });
    $.getJSON(GlobalModel.WX_JS_SDK_CONFIG, { url: window.location.href }, function(json, status, xhr) {
        //json.debug = true;
        // console.log(json);
        weiXin.config(json);
        weiXin.ready(function() {
            //console.log("weixin is ready")
        });
    });

};
//微信分享
WxSdkHelper.setWechatAPI = function(info) {
    if (!WxSdkHelper.isWeiXin()) {
        return;
    }
    weiXin.ready(function() {

        // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
        weiXin.onMenuShareQQ(info);
        // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        weiXin.onMenuShareWeibo(info);
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        weiXin.onMenuShareAppMessage(info);

        // 分享到微信朋友圈
        // 这里是异步操作，不要直接修改info对象，重新复制一个
        var infoTimeline = {
            "imgUrl": info.imgUrl,
            "link": info.link,
            "desc": info.desc,
            "title": info.title
        };
        if (info.otherDesc && info.otherDesc != '') {
            infoTimeline.title = info.otherDesc;
        }
        weiXin.onMenuShareTimeline(infoTimeline);

    });
};
/**
 * 微信中选图
 * @param config
 * {
   count: 1, // 默认9
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   success: function (res) {
         var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
   }
 }
 */
WxSdkHelper.setWechatchooseImage = function(config) {
    if (!WxSdkHelper.isWeiXin()) {
        return;
    }
    weiXin.ready(function() {
        weiXin.chooseImage(config);
    });

};

/**
 * 微信中上传图片
 * @param config
 * {
 localId:需要上传的图片的本地ID，由chooseImage接口获得
 isShowProgressTips:默认为1，显示进度提示
 success: function (res) {
     var serverId = res.serverId; // 返回图片的服务器端ID
    }
}
 */
WxSdkHelper.setWechatUploadImage = function(config) {
    if (!WxSdkHelper.isWeiXin()) {
        return;
    }
    weiXin.ready(function() {
        weiXin.uploadImage(config);
    });
};

/**
 * 微信中下载图片
 * @param config
 * {
 serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
 isShowProgressTips: 1, // 默认为1，显示进度提示
 success: function (res) {
     var localId = res.localId; // 返回图片下载后的本地ID
   }
}
 */
WxSdkHelper.setWechatDownloadImage = function(config) {
    if (!WxSdkHelper.isWeiXin()) {
        return;
    }
    weiXin.ready(function() {
        weiXin.downloadImage(config);
    });
};
//判断在微信内
WxSdkHelper.isWeiXin = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};
//屏蔽微信分享功能
WxSdkHelper.shieldWeiXinShare = function() {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', WxSdkHelper.onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', WxSdkHelper.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', WxSdkHelper.onBridgeReady);
        }
    } else {
        WxSdkHelper.onBridgeReady();
    }
};
//屏蔽微信分享回调函数
WxSdkHelper.onBridgeReady = function() {
    WeixinJSBridge.call('hideOptionMenu');
};

//打开微信分享功能
WxSdkHelper.openWeiXinShare = function() {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', WxSdkHelper.openWXShareCallBack, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', WxSdkHelper.openWXShareCallBack);
            document.attachEvent('onWeixinJSBridgeReady', WxSdkHelper.openWXShareCallBack);
        }
    } else {
        WxSdkHelper.openWXShareCallBack();
    }
};
//屏蔽微信分享回调函数
WxSdkHelper.openWXShareCallBack = function() {
    WeixinJSBridge.call('showOptionMenu');
};

module.exports = WxSdkHelper;
