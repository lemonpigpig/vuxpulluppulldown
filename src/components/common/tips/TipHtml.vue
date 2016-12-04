<template>
    <div class="ui-alert" v-if="tipHtml.type == 'confirm' || tipHtml.type == 'alert'">
        <div class="ui-mark ui-mark-visible" @click="clickMark"></div>
        <div class="ui-modal ui-modal-two-btn ui-modal-in">
            <div class="ui-title">
                <p class="title">{{tipHtml.title}}</p>
                <p class="info"></p>
            </div>
            <div class="ui-button" v-if="tipHtml.type == 'confirm'">
                <span class="ui-modal-btn border-r" @click="clickLeftBtn">{{left_name}}</span>
                <span class="ui-modal-btn" @click="clickRightBtn">{{right_name}}</span>
            </div>

            <div class="ui-button"  v-if="tipHtml.type == 'alert'">
                <span class="ui-modal-btn first-btn" @click="clickRightBtn">{{right_name}}</span>
            </div>
        </div>
    </div>

    <div class="tip" v-if="tipHtml.type == 'tip'">{{tipHtml.info}}</div>
</template>
<script>
    export default {
        props: {
            tipHtml: ''
        },
        data: function() {
            return {
                title_name: '',
                right_name: '确定',
                left_name: '取消',
                type: ''
            }
        },
        watch: {
            'tipHtml.type': function() {
                if(this.tipHtml.type == 'tip') {
                    var self = this;
                    setTimeout(function () {
                        self.tipHtml.type = '';
                    }, self.tipHtml.time);
                }else if(this.tipHtml.type == 'confirm'){
                    if(this.tipHtml.right_name) {
                        this.right_name = this.tipHtml.right_name;
                    }
                    if(this.tipHtml.left_name) {
                        this.left_name = this.tipHtml.left_name;
                    }
                }else if(this.tipHtml.type == 'alert') {
                }
            }
        },
        methods: {
            clickLeftBtn: function() {
                if(this.tipHtml.left_func) {
                    this.$dispatch(this.tipHtml.left_func);
                }else{
                    this.tipHtml.type = '';
                }
            },
            clickRightBtn: function() {
                if(this.tipHtml.right_func) {
                    this.$dispatch(this.tipHtml.right_func);
                }
            },
            clickMark: function() {
                this.tipHtml.type = '';
            }
        }
    }
</script>
<style scoped lang="less">
    .tip {
        font-size: 13px;
        color: #fff;
        padding: 13.5px 15px;
        background: rgba(0, 0, 0, .79);
        border-radius: 6px;
        display: inline-block;
        position: fixed;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index:300;
    };
    .ui-mark {
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .4;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10999;
        display: block;
    };
    .ui-modal {
        width: 72%;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 6px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        z-index: 11000;
        display: block;
        .ui-title {
            padding: 20px 10px;
            text-align: center;
            font-size: 17px;
            border-bottom: 1px solid #d9d9d9;
            overflow: hidden;
            .title {
                font-size: 17px;
                color: #000;
                margin: 0;
            };
            .info {
                font-size: 13px;
                color: #000;
                padding-top: 9px;
                margin: 0;
            }
        };
        .ui-button {
            .ui-modal-btn {
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                padding: 12px 0;
                text-align: center;
                float: left;
                color: #0076FF;
                font-family: PingFangSC-Regular;
                font-size: 17px;
                width: 50%;
            };
            .border-r {
                border-right: 1px solid #d9d9d9;
            };
            .first-btn {
                width: 100%;
                display: block;
            }
        }
    }
</style>