<template>
    <div style="display:none">
        <h1>参数说明</h1> type为弹出框的类型，stauts为状态，需提示的成功与失败，1 成功 2失败
    </div>
    <div v-if="tipInfo.isShow">
        <div class="tip_common act_tip " :class="{false:'',true:'animate'}[tipInfo.isShow]" v-if="!tipInfo.type || tipInfo.type==1">
            <span>{{tipInfo.info}}</span>
        </div>
        <div class="tip_common act_tip_upload animate" v-if="type==2">
            <div>
                <span class="upload">上传</span>
                <span v-if="!tipInfo.status || tipInfo.status==1">成功</span>
                <span v-if="tipInfo.status==2">失败</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tips',
    props: {
        tipInfo: {
            info: '',
            type: '',
            status: '',
            isShow: ''
        }
        // info: '',
        // type: '',
        // status: '',
        // isShow: ''
    },
    components: {

    },
    ready: function() {

    },
    data: function() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
div.tip_common {
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 13px;
    position: fixed;
   
}

.act_tip {
    top: 0px;
    opacity: 0;
    background: #FFC407;
}

.act_tip_upload {
    top: 10px;
}

.act_tip_upload > div {
    text-align: center;
    width: 100px;
    height: 30px;
    background: #FFC407;
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.06);
    border-radius: 25px;
    margin-right: auto;
    margin-left: auto;
    font-size: 0px;
}

// .act_tip_upload > div:before{
// }
.act_tip_upload > div span {
    font-size: 13px;
}

.act_tip_upload .upload:before {
    content: '';
    display: inline-block;
    height: 15px;
    width: 15px;
    line-height: 15px;
    border-radius: 100%;
    border: 2px solid #666;
    border-bottom-color: transparent;
    vertical-align: middle;
    -webkit-animation: rotate 0.75s linear infinite;
    animation: rotate 0.75s linear infinite;
    box-sizing: border-box;
    margin-right: 3px;
}

div.animate {
    animation: mymove 4s;
    -webkit-animation: mymove 4s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
}

@keyframes mymove {
    0% {
        opacity: 1;
        z-index: 999;
    }
    100% {
        opacity: 0;
        z-index: -1;
    }
}

@-webkit-keyframes mymove {
    0% {
        opacity: 0;
        z-index: 999;
    }
    100% {
        opacity: 0;
        z-index: -1;
    }
}

.loading {
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 100%;
    margin: 6px;
    border: 2px solid #666;
    border-bottom-color: transparent;
    vertical-align: middle;
    -webkit-animation: rotate 0.75s linear infinite;
    animation: rotate 0.75s linear infinite;
}

@-webkit-keyframes rotate {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>
