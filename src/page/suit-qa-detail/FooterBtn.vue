<template>
    <div class="qa-detail-btn" v-if="showBtn" v-link="{name: 'answer-apply', params: {id: questionId}}">
        <span>我要回答</span>
    </div>
</template>
<script>
    export default {
        props: {
            questionId: '',
            showBtn:''
        }
    }
</script>
<style scoped lang="less">
    .qa-detail-btn {
        position: fixed;
        left: 0;
        bottom: 0;
        background: #FFD600;
        width: 100%;
        height: 45px;
        line-height: 45px;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        span {
            display: block;
            text-align: center;
            color: #FFFFFF;
            font-size: 14px;
        }
    }
</style>