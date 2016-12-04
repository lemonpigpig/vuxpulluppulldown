module.exports = {
    imgurlList: [],
    //解析url参数
    parseUrl: function(p_url) {
        var query = {},
            i, params, param;
        if (p_url.indexOf('?') >= 0) p_url = p_url.split('?')[1];
        else return query;
        params = p_url.split('&');
        for (i = 0; i < params.length; i++) {
            param = params[i].split('=');
            query[param[0]] = param[1];
        }
        return query;
    },
    //比较版本号，1:大于，0:等于，－1:小于
    compareVersion: function(p_verA, p_verB) {
        var verA = parseInt(p_verA.replace(/v/g, '').replace(/\./g, ''));
        var verB = parseInt(p_verB.replace(/v/g, '').replace(/\./g, ''));
        var result = 0;
        if (verA > verB) {
            result = 1
        } else if (verA === verB) {
            result = 0;
        } else {
            result = -1;
        }
        return result;
    },
    //从url上获取app信息，只能在app内获取
    getAppVersion: function() {
        var query = this.parseUrl(window.location.href);
        var version = '';
        if (query.unico_appinfo) {
            version = JSON.parse(decodeURIComponent(query.unico_appinfo)).appVersion;
            if (version.indexOf('v') < 0) {
                version = 'v' + version
            }
            return version;
        } else {
            return null;
        }
    },
    //存储到localStorage
    saveToLocalStorage: function(p_info, p_session_key) {
        var tempStr = '';
        if (typeof(p_info) === 'string') {
            tempStr = p_info;
        } else {
            tempStr = JSON.stringify(p_info);
        }
        localStorage.setItem(p_session_key, tempStr);
    },
    //删除localStorage中指定数据
    delInLocalStorage: function(p_session_key) {
        localStorage.removeItem(p_session_key);
    },
    //从localStorage读取指定数据
    getFromLocalStorage: function(p_session_key) {
        return JSON.parse(localStorage.getItem(p_session_key));
    },
    //操作用户信息（已登录获取读取其信息，未登录则登录）
    dealUserInfo: function (p_query) {
        var userInfo = null;
        if (webAppSdk.isApp()) {
            userInfo = this.dealUserWithApp(p_query);
        } else {
            userInfo = this.dealUserWithWeb(p_query);
        }
        return userInfo;
    },
    //app内用户信息处理
    dealUserWithApp: function(p_query) {
        var userInfo = {};
        if (p_query.userID != undefined && p_query.userID != "") {
            userInfo = {
                userId: p_query.userID,
                tokenId: p_query.unico_token
            };
            this.delCookie(GlobalModel.Local_User_Info);
            this.setCookie(GlobalModel.Local_User_Info, userInfo, 0.1);
        } else {
            var appUserInfo = webAppSdk.getUserInfo();
            if (appUserInfo) {
                userInfo = {
                    userId: appUserInfo.userId,
                    tokenId: appUserInfo.userToken
                };
                this.delCookie(GlobalModel.Local_User_Info);
                this.setCookie(GlobalModel.Local_User_Info, userInfo, 0.1);
            } else {
                return null;
            }
        }
        return userInfo;
    },
    //web内用户信息处理
    dealUserWithWeb: function(p_query) {
        var account = null,
            accountInfo = {};
        var temp_account = this.getCookie(GlobalModel.Local_User_Info);
        account = temp_account ? JSON.parse(temp_account) : null;
        if (!account) {
            if (p_query.user !== undefined) {
                var userInfo = JSON.parse(decodeURIComponent(p_query.user));
                accountInfo = {
                    userId: userInfo.user_id,
                    tokenId: userInfo.token
                };
                this.delCookie(GlobalModel.Local_User_Info);
                this.setCookie(GlobalModel.Local_User_Info, accountInfo, 0.1);
                return accountInfo;
            } else {
                return null
            }
        } else {
            return account;
        }
    },
    //第三方登录（目前只支持微信）
    ThirdLogin: function(p_url) {
        var url = GlobalModel.WECHAT_SERVER_URL;
        url += '/mbfun_merchant_server/index.php/wechat/ThirdLogin/wxLogin?redirect_url=';
        url += JSON.stringify({ "url": encodeURIComponent(p_url) });
        window.location.href = url;
    },
    //登录回调函数
    callbackLogin: function() {
        webAppSdk.refreshH5WithParams({ 'refreshSelf': '1' });
    },
    //用户登录
    userLogin: function (p_url) {
        var userInfo = null, result = {isShowLogin: false};
        var query = this.parseUrl(p_url);
        userInfo = this.dealUserInfo(query);
        if (!userInfo) {
            if (webAppSdk.isApp()) {
                webAppSdk.LoginH5({ callback: "this.callbackLogin()" });
            } else {
                if(WxSdkHelper.isWeiXin()) {
                    this.ThirdLogin(p_url);
                }else{
                    //浏览器有范登录，打开有范登录页
                    result.isShowLogin = true;
                }
            }
            result.userInfo = null;
            return result;
        } else {
            result.userInfo = userInfo;
            return result;
        }
    },
    //设置页面标题（app,web）
    setTitle: function(p_title) {
        if (webAppSdk.isApp()) {
            webAppSdk.setH5Title(p_title);
        } else {
            document.title = p_title;
        }
    },
    //以中心为喵点裁剪图片
    cropImgMiddle: function(p_url, p_width, p_height) {
        if (p_url.indexOf('qiniucdn') != -1 || p_url.indexOf('qnssl') != -1) {
            var imgUrl = p_url;
            imgUrl = p_url + '?imageMogr2/gravity/Center/crop/' + p_width + 'x' + p_height;
            return imgUrl;
        } else {
            return p_url;
        }
    },
    //页面分享
    sharePage: function(p_param) {
        //第一次分享
        //setTimeout(function() {
            webAppSdk.SetShareContent(p_param);
        //}, 1500);

        //微信二次分享配置
        WxSdkHelper.setWechatAPI(p_param);

        //setTimeout(function() {
            //是否显示分享按钮
            webAppSdk.controlShare(true);
        //}, 1000);
    },
    //获取 cookie
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else
            return null;
    },
    //设置 cookie
    setCookie: function (name, value, expiresTime) {
        var o_value = JSON.stringify(value);
        var Days = expiresTime;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(o_value) + ";expires=" + exp.toGMTString() + ";path=/";
    },
    //删除 cookie
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    },
    pullRefresh:function(mui,pulldownRefresh,pullupRefresh){
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    callback: pulldownRefresh
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        if (mui.os.plus) {
            mui.plusReady(function() {
                setTimeout(function() {
                    mui('#pullrefresh').pullRefresh().pullupLoading();
                }, 1000);

            });
        } else {
            mui.ready(function() {
                mui('#pullrefresh').pullRefresh().pullupLoading();
            });
        }
    },
    //截取字符串长度
    cutStrLen: function(p_str, p_len) {
        var len = 0;
        var index = 0;
        p_len = 2 * p_len;
        for (index = 0; index < p_str.length; index++) {
            if (p_str.charCodeAt(index) > 255) //如果是汉字，则字符串长度加2
            {
                len += 2;
            }
            else {
                len++;
            }
            if (len > p_len) {
                break;
            }

        }

        var str = p_str.substring(0, index);
        if (index < p_str.length) {
            str += ".."
        }
        return str;
    }
};
