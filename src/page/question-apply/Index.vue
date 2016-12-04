<template>
    <tips :tip-info="tipInfo"></tips>
    <upload :upload-info="uploadInfo"></upload>
    <tip-html :tip-html="tipHtml"></tip-html>
    <div class="header" v-link="{name:'profile'}">填写个人信息可获得更准确的回答，您也可以直接发布>></div>
    <div class="content">
        <div v-for="item in list" class="answer-item {{item.cls_name}}" tabindex="0">
            <textarea v-if="item.type=='text'" class="textarea" v-model="item.content" autofocus="true" rows="1" placeholder="请描述您的问题，不少于10个字！" @focus="showClose($index)" @blur="showClose($index,1)"></textarea>
            <div v-else @click="clickImg($index)">
                <img :src="item.content" />
            </div>
            <div class="close-div" @click="close($index, item.type)"></div>
        </div>
        <p></p>
    </div>
    <footer-btn :is-release="isRelease"></footer-btn>
</template>
<script>
import FooterBtn from '../../components/common/qafooter/FooterBtn.vue'
import Tips from '../../components/common/tips/Tips.vue'
import Upload from '../../components/common/tips/Upload.vue'
import TipHtml from '../../components/common/tips/TipHtml.vue'

var globalIndex = 0;

export default {
    name: 'answrQuestion',
    components: {
        FooterBtn,
        Tips,
        Upload,
        TipHtml
    },
    data: function() {
        return {
            isRelease: false,
            lastIndex: -1,
            list: [{
                type: 'text',
                content: '',
                cls_name: ''
            }],
            tipInfo: {
                info: '',
                isShow: false,
                type: '',
                status: ''
            },
            uploadInfo: {
                info: '',
                isShow: false,
                type: '',
                status: 3
            },
            tipHtml: {
                type: '',
                title: '',
                right_name: '',
                right_func: 'applyAlert',
                left_name: '',
                left_func: ''
            }
        }
    },
    ready: function() {
        common.setTitle('我要提问');
        webAppSdk.controlShare(false);
        webAppSdk.replaceBackFun('');
        WxSdkHelper.shieldWeiXinShare();
    },
    watch: {
        list: {
            handler: function() {
                this.isRelease = false;
                var index = 0;

                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].type == "text") {
                        if (i != 0) {
                            index++;
                        }
                        if (this.list[i].from == 'add') {
                            $('.textarea')[index].focus();
                            this.list[i].from = '';
                        }
                        autoTextarea(document.getElementsByClassName("textarea")[index]);
                    }

                    if (this.list[i].type == "text" && this.list[i].content.trim() != "") {
                        this.isRelease = true;
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        showClose: function(p_index, p_type) {
            if (p_type) {
                $(".answer-item").eq(p_index).removeClass('close')
            } else {
                $(".answer-item").eq(p_index).addClass('close')
            }
        },
        close: function(p_index, p_type) {
            globalIndex = p_index;
            this.tipHtml.title = p_type == 'text' ? "确认删除该字段吗？" : "确定删除该图片吗？";
            this.tipHtml.type = 'confirm';
        },
        clickImg: function(p_index) {
            if (p_index == this.lastIndex) {
                if (this.list[p_index].cls_name == 'close') {
                    this.list[p_index].cls_name = '';
                } else {
                    this.list[p_index].cls_name = 'close';
                }
            } else {
                this.list[p_index].cls_name = 'close';
                if (this.lastIndex != -1) {
                    this.list[this.lastIndex].cls_name = '';
                }
            }
            this.lastIndex = p_index;
        }
    },
    events: {
        save: function() {
            var user = JSON.parse(localStorage.getItem("BaseInfo"));
            var params = {
                m: 'Model',
                a: 'createQuestion',
                type: 0,
                question: JSON.stringify(this.list),
                is_have_info: 0
            };
            if (user) {
                params.is_have_info = 1;
                params.fav_brand = user.brand;
                params.top_size = user.upsize;
                params.bottom_size = user.size;
                params.address = user.address;
                params.fav_color = user.color;
                params.hobby = '';
                params.professional = user.job;
                params.weight = user.weight;
                params.height = user.height;
                params.age = user.age;
                params.style = user.style;

            }
            this.$http.post(GlobalModel.SERVER_URL,
                params
            ).then((response) => {
                var status = response.data.status;
                if (status == 1) {
                    this.tipInfo.info = '发布成功';
                    var self = this;
                    setTimeout(function() {
                        self.$router.go({
                            name: 'suit-qa-list'
                        });
                    }, 1000)

                } else {
                    this.tipInfo.info = '您的内容发布失败，请重新提交';
                }
                this.tipInfo.isShow = true;

            }, (response) => {});

        },
        addAlbum: function(p_data) {
            this.list.push({
                type: 'image',
                content: p_data,
                cls_name: ''
            });
            this.uploadInfo.isShow = false;
        },
        applyAlert: function() {
            this.list.splice(globalIndex, 1);
            this.tipHtml.type = '';
        }
    }
}


/**
 * 文本框根据输入内容自适应高度
 * @param                {HTMLElement}        输入框元素
 * @param                {Number}                设置光标与输入框保持的距离(默认0)
 * @param                {Number}                设置最大高度(可选)
 */
var autoTextarea = function(elem, extra, maxHeight) {
    extra = extra || 0;
    var minHeight = 0;

    function change() {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            // document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };
    change();
};
</script>
<style lang="less">
body {
    background: #FFF;
}

.header {
    text-align: center;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #FFF;
    background: rgba(51, 51, 51, 0.79);
}

.content {
    background: #FFFFFF;
    padding: 10px 15px;
    textarea {
        padding: 0;
        resize: none;
        width: 100%;
        border: 0px solid;
        border-radius: 0px;
        font-size: 15px;
        line-height: 27.5px;
        color: #666666;
        margin: 0 auto;
        overflow: hidden;
    }
    div {
        img {
            // padding: 10px 0px;
            height: auto;
            width: 100%;
        }
    }
    .answer-item >div {
        margin: 10px 0;
    }
    .answer-item {
        position: relative;
        outline: none;
        .close-div {
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            background: red;
            position: absolute;
            display: block;
            z-index: 999;
            opacity: 0
        }
    }
    .answer-item:focus:after,
    .answer-item.close:after {
        display: block;
        content: '';
        border: none;
        position: absolute;
        top: -5px;
        right: -6px;
        width: 24px;
        height: 24px;
        text-align: center;
        background: url('../../assets/btn_shanchu.png') 0 0;
        background-size: 100% auto;
    }
    p {
        width: 100%;
        height: 45px;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: #BBBBBB;
        font-size: 15px;
    }
    input:-moz-placeholder,
    textarea:-moz-placeholder {
        color: #BBBBBB;
        font-size: 15px;
    }
    input::-moz-placeholder,
    textarea::-moz-placeholder {
        color: #BBBBBB;
        font-size: 15px;
    }
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
        color: #BBBBBB;
        font-size: 15px;
    }
}
</style>
