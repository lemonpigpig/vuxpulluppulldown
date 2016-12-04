<template>
    <div class="forget_password">
        <!--<span class="login-type">其他登录方式：</span>-->
        <span class="find-passWd" @click="changeLogin">忘记密码?</span>
    </div>
</template>
<script>
    export default {
        methods: {
            changeLogin: function() {
                this.$parent.$data.cls_name = 'dialog-find-passWd';
                this.$parent.$data.type = 'find';
                //点击按钮
                this.$parent.$data.btnInfo.name = '确认';
                this.$parent.$data.btnInfo.showStatus = false;
                //头部
                this.$parent.$data.headInfo.type = 'find';
                this.$parent.$data.headInfo.title_name = '忘记密码';
                this.$parent.$data.headInfo.right_name = '登录';
                //获取验证码类型
                this.$parent.$data.inputInfo.codeInfo.type = '2'; //忘记密码
                //切换页面数据重新初始化为空
                this.$parent.$data.inputInfo.phoneInfo.value = '';
                this.$parent.$data.inputInfo.codeInfo.value = '';
                this.$parent.$data.inputInfo.codeInfo.cls_name = 'code-disabled';
            }
        }
    }
</script>

<style scoped lang="less">
    .forget_password {
        margin: auto;
        width: 270px;
        height: 22px;
        margin-bottom: 15px;
        padding: 0;
        .login-type {
            font-size: 11px;
            color: #999CA1;
            float: left;
            line-height: 22px;
        }
        span {
            font-size: 13px;
            color: #00ACFF;
            float: right;
            padding-top: 4.5px;
        }
    }
</style>