<template>
    <div class="tip_common act_tip_upload " v-if="uploadInfo.isShow">
        <div>
            <span class="upload"></span>
            <span v-if="!uploadInfo.status || uploadInfo.status==1">成功</span>
            <span v-if="uploadInfo.status==2">失败</span>
            <span v-if="uploadInfo.status==3">正在上传</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'uploadInfo',
    props: {
        uploadInfo: {
            info: '',
            type: '',
            status: '',
            isShow: ''
        }
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
    z-index: 3;
}

.act_tip {
    top: 0px;
    opacity: 0;
    background: #FFC407;
}

.act_tip_upload {
    top: 10px;
    opacity: 1;
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
@keyframes myrotate {
    from {
        -webkit-transform: rotate(0deg);
        ransform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@-webkit-keyframes myrotate {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
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
     -webkit-animation: myrotate 1s linear infinite;
    animation: myrotate 1s linear infinite;
    box-sizing: border-box;
    margin-right: 3px;
}

</style>
