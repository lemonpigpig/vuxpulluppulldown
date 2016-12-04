<template>
    <login-model v-if="showLogin"></login-model>
    <div class="footer">
        <div class="left">
            <div class="margin-left35">
                <img src="./btn_wenzi.png" @click="addText()" />
            </div>
            <input class="js-file" v-if='showUpload' type="file" accept="image/jpeg, image/png">
            <div class="margin-left40">
                <img src="./btn_picture.png" @click="openPhoto()" />
            </div>
            <input class="js-file" v-if='showUpload' type="file" accept="image/jpeg, image/png">
            <div class="margin-left40" v-if="source!='admin'">
                <img src="./btn_photograph.png" @click="openCamera()" />
            </div>
        </div>
        <div class="right" :class="isRelease?'FFC407':'F2F2F2'">
            <button type="button" disabled @click="save(0)">发布</button>
        </div>
        <div class="right" :class="isRelease?'FFC407':'F2F2F2'" v-if="source=='admin'">
            <button type="button" disabled @click="save(1)">保存刷新</button>
        </div>
    </div>
</template>
<script>
var tempVue = '';
var countMax = 1;
var type = {
    album: 'album',
    camera: 'camera'
};
window.imgUrl = '';
//选图成功后执行的回调函数
window.chooseImageCallback = function(res) {
    var arrImg = res.split(';');
    window.arrImg = arrImg;
    if (arrImg.length > 0) {
        var backUpUrl = arrImg[0];
        if (backUpUrl) {
            tempVue.$parent.$data.uploadInfo.isShow = true;
            webAppSdk.uploadImage({
                localIds: backUpUrl,
                success: "uploadImageCallback"
            });
        }
    }

}
window.uploadImageCallback = function(imgUrl) {
    // alert(arrImg.length);
    // alert(imgUrl);
    // window.imgUrl = imgUrl;
    // window.act_index = arrImg.length - 1;
    // if (window.act_index > 0) {
    //     var backUpUrl = arrImg[act_index - 1];
    //     if (backUpUrl) {
    //         webAppSdk.uploadImage({
    //             localIds: backUpUrl,
    //             success: "uploadImageCallback"
    //         });
    //     }
    // }
    tempVue.$dispatch('addAlbum', imgUrl);
};


import LoginModel from '../login/Index.vue'
export default {
    name: 'footer-btn',
    props: {
        isRelease: false
    },
    components: {
        LoginModel
    },
    ready: function() {
        setTimeout(function () {
            UploadFile.uploadBase64Image(function(img) {
                UploadFile.initBase64QiniuToken(img, function() {
                    if (this.readyState == 4) {
                        var picName = GlobalModel.CDN_BASE_URL + JSON.parse(this.response)["hash"];
                        tempVue.$dispatch('addAlbum', picName);
                    }
                });
            }, 1024);

        },0);

        this.source = this.$route.params.source;
        if (!WxSdkHelper.isWeiXin() && !webAppSdk.isApp()) {
            this.showUpload = true;
        }

        var userInfo = common.userLogin(window.location.href);
        if (!userInfo.userInfo) {
            this.showLogin = userInfo.isShowLogin;
        } else {
            this.$parent.tipInfo.isShow = false;  //默认不显示
        }
    },
    watch: {
        'isRelease': function() {
            if (this.isRelease) {
                $('.right>button').removeAttr('disabled');
            } else {
                $('.right>button').attr('disabled');
            }
        }
    },
    methods: {
        addText: function() {
            this.$parent.list.push({
                type: 'text',
                content: '',
                from:'add'
            });
        },
        openPhoto: function() {
            //选图打开图库
            // this.$dispatch('addAlbum',window.urls);
            if (WxSdkHelper.isWeiXin()) {
                var config = {
                    count: 1, // 默认9f
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: this.uploadsuccess
                }
                WxSdkHelper.setWechatchooseImage(config);
            } else {
                webAppSdk.chooseImage({
                    countMax: countMax,
                    sizeMax: 500,
                    sourceType: type.album,
                    success: 'chooseImageCallback'
                });

            }
        },
        openCamera: function() {
            // 打开相机
            if (WxSdkHelper.isWeiXin()) {
                var config = {
                    count: 1, // 默认9f
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: this.uploadsuccess
                }
                WxSdkHelper.setWechatchooseImage(config);
            } else {
                webAppSdk.chooseImage({
                    countMax: countMax,
                    sizeMax: 500,
                    sourceType: type.camera,
                    success: 'chooseImageCallback'
                });
            }
        },
        save: function() {
            this.$parent.tipInfo.isShow = false;  //默认不显示
            for(var i = 0; i < this.$parent.list.length; i++) {
                if(this.$parent.list[i].content && this.$parent.list[i].content != '') {
                    this.$dispatch("save");
                    break;
                }else{}
            }
        },
        uploadsuccess: function(info) {
            var config = {
                localId: info.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: this.uptoqiniu
            }
            WxSdkHelper.setWechatUploadImage(config)
        },
        uptoqiniu: function(res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            $.getJSON(GlobalModel.SERVER_DOMAIN + "/sdk_qiniu/action.php?", {
                mediaid: serverId
            }, function(bd) {
                tempVue.$dispatch('addAlbum', bd.imgurl);
            });
        }
    },
    data: function() {
        return {
            source: '',
            showLogin: false,
            showUpload: false
        }
    },
    created: function() {
        tempVue = this;

    }
}
</script>
<style lang="less" scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 45px;
    width: 100%;
    line-height: 45px;
    background: #FFFFFF;
    // 阴影
    box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.06);
    .left {
        input {
            position: absolute;
        }
        .js-file {
            opacity: 0;
            top: 11px;
            width: 30px;
            margin-left: 40px;
            overflow: hidden;
        }
        div {
            padding: 7.5px 0px;
            float: left;
            img {
                width: 30px;
                height: 30px;
            }
        }
        .margin-left35 {
            margin-left: 35px;
        }
        .margin-left40 {
            margin-left: 40px;
        }
    }
    .right {
        float: right;
        width: 60px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 3px;
        margin: 8.5px 15px;
        button {
            color: #FFFFFF;
            font-size: 13px;
            text-decoration: none;
            border: none;
            background: none;
            -webkit-appearance: none;
        }
        button:focus{
            outline:none;
        }
    }
    .F2F2F2 {
        background: #F2F2F2;
    }
    .FFC407 {
        background: #FFC407;
    }
}
</style>
