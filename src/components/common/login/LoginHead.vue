<template>
    <div class="login-head">
        <div class="dialog_title_container">
            <div class="dialog_title">
                <span class="dialog_close" @click="closeIndex"></span>
                <h2>{{headInfo.title_name}}</h2>
                <span class="dialog_register" @click="changeLogin">{{headInfo.right_name}}</span>
            </div>
        </div>
        <div class="dialog_line"></div>
    </div>
</template>
<script>
export default {
    props: {
        headInfo: ''
    },
    methods: {
        changeLogin: function() {
            if(this.$parent.$data.type == 'login') {
                this.$parent.$data.type = 'reg';
                this.$parent.$data.cls_name = 'dialog-register';
                //头部
                this.$parent.$data.headInfo.type = 'reg';
                this.$parent.$data.headInfo.title_name = '注册';
                this.$parent.$data.headInfo.right_name = '登录';
                //button
                this.$parent.$data.btnInfo.name = '注册';
                //获取验证码类型
                this.$parent.$data.inputInfo.codeInfo.type = '1'; //注册
                //切换页面数据重新初始化为空
                this.$parent.$data.inputInfo.phoneInfo.value = '';
                this.$parent.$data.inputInfo.passWdInfo.value = '';
                this.$parent.$data.inputInfo.codeInfo.value = '';
            }else{
                this.$parent.$data.type = 'login';
                this.$parent.$data.cls_name = 'dialog-login';
                //头部
                this.$parent.$data.headInfo.type = 'reg';
                this.$parent.$data.headInfo.title_name = '登录';
                this.$parent.$data.headInfo.right_name = '注册';
                //button
                this.$parent.$data.btnInfo.name = '登录';
                //切换页面数据重新初始化为空
                this.$parent.$data.inputInfo.phoneInfo.value = '';
                this.$parent.$data.inputInfo.passWdInfo.value = '';
            }
            this.$parent.$data.btnInfo.showStatus = false;
            this.$parent.$data.inputInfo.codeInfo.cls_name = 'code-disabled';
        },
        closeIndex: function() {
            this.$dispatch("closeIndex");
        }
    }
}
</script>

<style scoped lang="less">
.login-head {
    margin-bottom: 20px;
    .dialog_title_container {
        height: 49px;
        width: 100%;
        overflow: hidden;
        .dialog_title {
            width: 270px;
            margin: auto;
            span {
                display: inline-block;
                font-size: 15px;
                color: #00BD00;
                line-height: 1;
            };
            .dialog_close {
                display: inline-block;
                width: 22px;
                height: 22px;
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABGdBTUEAALGPC/xhBQAAAWNJREFUWAntltsNwjAMRfuYgRH61yVgCbZgGLZgCViCn6rdgBnakguNVEWlcWwLKuF+ACLO8clVSMgyeywBS8ASsAQsAUvAJdB1Xd00zbVt251WIGCBCTaVWVAL+74/u9r9OI4q0pAFC8yJTVIhCxdFcczz/O6a1FJpLwsWmGCTbF1RTi1EXdjINTtUVfX4JiNJWCqtseBkYa60hix6s4RTpbVkRcJUaU1ZsXBMWltWRfiTNL7H8eePLs6JAkb4sPdwCArTxLi2LJhqwoDNpV9wdyloJQseHvJN9y7//atawvN0cd1iaZvdEqEstsEkvL0f3ZKs/3+xNsbdXKItQRGi1KTIs4VTRFJqY/IsYY4AZ86SfLKwpLFkrpdPEtZoKGWQhaWNfEJ4l7DIN90wDBetiwDHHs5qXDBggj1f0NpnsnBZlicHuqGRP2fXwLExLw3mxI5NsXFLwBKwBCwBS+APEngCKpHfinuMYuAAAAAASUVORK5CYII=');
                background-repeat: no-repeat;
                background-size: contain;
                margin: 13.5px 84px 13.5px -75px;
                vertical-align: top;
            };
            h2 {
                font-weight: 400;
                text-align: center;
                display: inline-block;
                width: 68px;
                height: 17px;
                color: #00BD00;
                font-size: 17px;
                margin: 16px auto 16px 0;
                line-height: 1;
            };
            .dialog_register {
                margin: 17px 0 17px auto;
                float: right;
            }
        }
    }
    .dialog_line {
        width: 200%;
        height: 1px;
        background: #00BD00;
        -webkit-transform: scale(0.5);
        -moz-transform: scale(0.5);
        transform: scale(0.5);
        -moz-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        box-sizing: border-box;
    }
}
</style>