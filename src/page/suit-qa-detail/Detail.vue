<template>
    <div class="middle-content">
        <div class="one-content" v-for="info in contentInfo.list">
            <div class="content-info" v-if="info.type == 'text'">{{info.content}}</div>
            <div class="content-img" v-if="info.type == 'image'">
                <img v-lazy="info.content" >
            </div>
        </div>
        <div class="reply-info">
            <span>{{contentInfo.info.time}}</span>
            <span v-if="contentInfo.info.showReply"> | {{contentInfo.info.reply_num}}条回复</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            contentInfo: ''
        }
    }
</script>
<style scoped lang="less">
    .middle-content {
        background: #FFFFFF;
        /*width: 92%;*/
        padding: 0 4%;
        margin-bottom: 10px;
    }
    .content-info {
        width: 100%;
        font-size: 15px;
        color: #666666;
        letter-spacing: -0.45px;
        line-height: 27.5px;
        padding-bottom: 10px;
        word-break: break-all;
    }
    .content-img {
        width: 100%;
        padding-bottom: 10px;
    }
    .content-img img{
        width: 100%;
        height: 100%;
    }
    .reply-info {
        padding-bottom: 10px;
        span {
            font-size: 11px;
            color: #bBBBBB;
        }
    }
</style>