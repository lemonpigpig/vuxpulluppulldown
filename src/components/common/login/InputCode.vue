<template>
    <div class="input_code">
        <div class="valid_code_container">
            <div class="valid_code">
                <input :class="codeInfo.value ? 'active' : ''" maxlength="6" type="tel" placeholder="请输入短信验证码" :value="codeInfo.value"  v-model="codeInfo.value">
            </div>
        </div>
        <div class="login-btn-code">
            <a name="getCode" href="javascript:void(0)" class="code-able" @click="getValidCode($event)">获取验证码</a>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            codeInfo: ''
        },
        ready: function() {
            $('.input_code').each(function(i){
                $(this).find('input').keyup(function() {
                    if($(this).val()) {
                        $(this).addClass('active');
                    }else{
                        $(this).removeClass('active');
                    }
                });
            });
        },
         methods: {
            getValidCode: function(p_event) {
                var param = {
                    "m": 'User',
                    "a": 'getcode',
                    "account": this.$parent.inputInfo.phoneInfo.value,
                    "from": this.codeInfo.type
                };
                var self = this;
                AjaxHelper.PostRequest(this, param, function(data) {
                    self.setIntervalCode(p_event)
                }, function(fail) {
                    self.setIntervalCode(p_event);
                });
            },
            setIntervalCode: function(p_event) {
                var time = 60;
                var interval = setInterval(function () {
                    time--;
                    $(p_event.target).text(time + "s");
                    if (time === 1) {
                        clearInterval(interval);
                        $(p_event.target).text('获取验证码');
                    }
                }, 1000);
            }
        }
    }
</script>

<style scoped lang="less">
    .input_code {
        width: 100%;
        margin-bottom: 15px;
        line-height: 42px;
        .valid_code_container {
            position: relative;
            display: inline-block;
            vertical-align: top;
            width: 180px;
            margin-right: 10px;
            .valid_code {
                width: 100%;
                input {
                    width: 96%!important;
                    padding-left: 64px;
                    outline: 0;
                    border: 0;
                    background: transparent;
                    box-sizing: border-box;
                    z-index: 3;
                    height: 90%;
                    position: relative;
                    font-size: 13px;
                    color: #00f;
                    text-shadow: 0 0 0 #C3C3C3;
                    -webkit-text-fill-color: transparent;
                    -webkit-appearance: none;
                    appearance: none;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                }
                .active {
                    text-shadow: 0 0 0 #333333;
                }
            };
            .valid_code:before {
                position: absolute;
                z-index: 4;
                top: 0;
                left: 10px;
                content: "验证码";
                color: #666;
                font-size: 13px;
            };
            .valid_code:after {
                content: " ";
                width: 200%;
                height: 200%;
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                border: 1px solid #E5E5E5;
                -webkit-transform: scale(0.5);
                -moz-transform: scale(0.5);
                transform: scale(0.5);
                -webkit-transform-origin: 0 0;
                -moz-transform-origin: 0 0;
                transform-origin: 0 0;
                box-sizing: border-box;
                border-radius: 8px;
                background: transparent;
            }
        };
        .login-btn-code {
            display: inline-block;
            vertical-align: top;
            width: 80px;
            line-height: 1;
            .code-disabled {
                background: #E5E5E5;
            };
            .code-able {
                color: #00BD00;
                font-size: 12px;
                background: #fff;
            }
            a {
                font-size: 12px;
                color: #bbb;
                background: #fff!important;
                width: 100%!important;
                padding: 0;
                line-height: 42px;
                text-decoration: none;
                position: relative;
                border-radius: 4px;
                display: inline-block;
                height: 42px;
                border: 0;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            };
            a:after {
                content: " ";
                width: 200%;
                height: 200%;
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                border: 1px solid #E5E5E5;
                -webkit-transform: scale(0.5);
                -moz-transform: scale(0.5);
                transform: scale(0.5);
                -webkit-transform-origin: 0 0;
                -moz-transform-origin: 0 0;
                transform-origin: 0 0;
                box-sizing: border-box;
                border-radius: 8px;
            }
        }
    }
</style>