<template>
    <div class="qa-list-footer">
        <div class="btn-two">
            <div class="qa-list-btn two-qa" v-link="{name: 'my-qa', params: {id: 'app'}}">我的问答</div>
            <div class="footer-vertical"></div>
            <div class="qa-list-btn two-qa" v-link="{name: 'question-apply'}">我要提问</div>
        </div>
    </div>
</template>
<script>
    export default {
    }
</script>
<style scoped>
    .qa-list-footer {
        position: fixed;
        left: 0;
        bottom: 0;
        background: #FFD600;
        width: 100%;
        height: 45px;
        line-height: 45px;
        -webkit-transform: translateZ(0);
        z-index: 999;
    }
    .qa-list-btn {
        text-align: center;
        color: #FFFFFF;
        font-size: 14px;
        height: 45px;
    }
    .two-qa {
        float: left;
        width: 50%;
    }
    .footer-vertical {
        position: absolute;
        width: 1px;
        height: 22.5px;
        background: #FFFFFF;
        left: 50%;
        top: 11px;
    }
</style>