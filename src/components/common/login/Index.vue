<template>
    <div class="login_dialog_container">
        <div class="dialog_bg"></div>

        <div class="login-middle dialog-login">
            <login-head :head-info="headInfo"></login-head>

            <div>
                <input-item :item-info="inputInfo.phoneInfo"></input-item>
                <input-code :code-info="inputInfo.codeInfo" v-if="type == 'reg' || type == 'find'"></input-code>
                <input-item :item-info="inputInfo.passWdInfo" v-if="type == 'login' || type == 'reg'"></input-item>

                <div class="error_msg"></div>
                <div class="login_btn_container" @click="clickBtn">
                    <button type="button" :class="btnInfo.showStatus ? 'login_btn_able' : 'login_btn_disabled'">{{btnInfo.name}}</button>
                </div>

                <login-footer v-if="type == 'login' || type == 'reg'"></login-footer>
            </div>
        </div>
    </div>
</template>
<script>
import LoginHead from './LoginHead.vue'
import InputItem from './InputItem.vue'
import InputCode from './InputCode.vue'
import LoginFooter from './LoginFooter.vue'

export default {
    components: {
        LoginHead,
        InputItem,
        InputCode,
        LoginFooter
    },
    data: function() {
        return {
            type: 'login',
            cls_name: 'dialog-login',
            inputInfo: {
                phoneInfo: {
                    name: '手机号',
                    type: 'tel',
                    max_len: '11',
                    default_name: '请输入手机号',
                    value: ''
                },
                passWdInfo: {
                    name: '密码',
                    type: 'text',
                    max_len: '21',
                    default_name: '请输入密码',
                    value: ''
                },
                codeInfo: {
                    value: '',
                    cls_name: 'code-disabled',
                    type: '1' //验证码类型，1: 注册，2: 找回密码
                }
            },
            headInfo: {
                type: 'login',
                title_name: '登录',
                right_name: '注册'
            },
            btnInfo: {
                name: '登录',
                showStatus: false
            }
        }
    },
    watch: {
        inputInfo: {
            handler: function() {
                if(this.type == 'login') {
                    if(this.inputInfo.phoneInfo.value != '' && this.inputInfo.passWdInfo.value != '') {
                        this.btnInfo.showStatus = true;
                    }else{
                        this.btnInfo.showStatus = false;
                    }
                }else if(this.type == 'reg') {
                    if(this.inputInfo.phoneInfo.value != ''
                            && this.inputInfo.passWdInfo.value != '' && this.inputInfo.codeInfo.value) {
                        this.btnInfo.showStatus = true;
                    }else{
                        this.btnInfo.showStatus = false;
                    }
                }else if(this.type == 'find') {
                    if(this.inputInfo.phoneInfo.value != '' && this.inputInfo.codeInfo.value != '') {
                        this.btnInfo.showStatus = true;
                    }else{
                        this.btnInfo.showStatus = false;
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        clickBtn: function() {
            if(this.type == 'login') {
                this.login();
            }else if (this.type == 'reg') {
                this.register();
            }else if(this.type == 'find') {
                this.findPassWd();
            }
        },
        login: function() {
            var params = {
                m: "User",
                a: "logincheck",
                login_account: this.inputInfo.phoneInfo.value,
                password: this.inputInfo.passWdInfo.value,
                channeCode: null,
                version_name: null
            };

            var self = this;
            AjaxHelper.PostRequest(this, params, function(data) {
                var accountInfo = {
                    userId: data.openid,
                    tokenId: data.token
                };
                common.setCookie(GlobalModel.Local_User_Info, accountInfo, 0.1);
                common.setCookie(GlobalModel.LOGINMANAGE, {type: 'login'}, 0.1);

                $('.login_dialog_container').remove();
                self.$router.go({name: 'suit-qa-list'});
            }, function(fail) {});
        },
        register: function() {
            var param = {
                "m": 'User',
                "a": 'mobilenumactive',
                "mobile_num": this.inputInfo.phoneInfo.value,
                "mobile_pwd": this.inputInfo.passWdInfo.value,
                "invitation_code": null,
                "nick_name":  this.inputInfo.phoneInfo.value + "_"+ Date.parse(new Date()),
                "active_code": this.inputInfo.codeInfo.value,
                "version_name": null,
                "_platform": 3
            };
            var self = this;
            AjaxHelper.PostRequest(this, param, function(data) {
                $('.login_dialog_container').remove();
                common.setCookie(GlobalModel.LOGINMANAGE, {type: 'reg'}, 0.1);
                self.$router.go({name: 'suit-qa-list'});
            }, function(fail) {});
        },
        findPassWd: function() {
            var param = {
                "m": 'User',
                "a": 'findpassword',
                "account": this.inputInfo.phoneInfo.value,
                "code": this.inputInfo.codeInfo.value
            };
            var self = this;
            AjaxHelper.PostRequest(this, param, function(data) {
                $('.login_dialog_container').remove();
                common.setCookie(GlobalModel.LOGINMANAGE, {type: 'find'}, 0.1);
                self.$router.go({name: 'suit-qa-list'});
            }, function(fail) {});
        }
    },
    events: {
        closeIndex: function() {
            $('.login_dialog_container').remove();
        }
    }
}
</script>
<style scoped lang="less">
body {
    line-height: 1;
}
.login_dialog_container {
    position: relative;
    .dialog_bg {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 4;
        top: 0;
        left: 0;
        opacity: 0.6;
        background: #000000;
    };
    .dialog-login {
        margin-top: -139px;
        width: 300px;
    };
    .dialog-find-passWd {
        margin-top: -125px;
        width: 300px;
    };
    .dialog-register {
        margin-top: -168px;
        width: 300px;
        height: 350px;
    };
    .login-middle {
        position: fixed;
        z-index: 5;
        left: 50%;
        top: 50%;
        background: #fff;
        border-radius: 4px;
        font-family: PingFangSC, Helvetica;
        margin-left: -150px;
        div {
            text-align: center;
            .error_msg {
                width: 270px;
                height: 12px;
                color: #F9615C;
                font-size: 12px;
                text-align: left;
                margin: auto;
            };
            .login_btn_container {
                width: 100%;
                margin-top: 6.5px;
                margin-bottom: 15px;
                line-height: 1;
                button {
                    text-decoration: none;
                    position: relative;
                    font-size: 17px;
                    color: #fff;
                    border-radius: 4px;
                    display: inline-block;
                    height: 42px;
                    line-height: 42px;
                    border: none;
                    width: 270px;
                    padding: 0 2%;
                    overflow: hidden;
                    text-align: center;
                };
                .login_btn_disabled {
                    background: #E5E5E5;
                };
                .login_btn_able {
                    background: #00BD00;
                }
            }
        }
    }
}
</style>