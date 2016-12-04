<template>
    <div class="content-no-body" v-link="{name: 'suit-qa-detail', params: {id: contentInfo.id}}">
        <div class="no-content">{{contentInfo.question}}</div>
        <content-answer v-if="contentInfo.showask" :content-ans="contentInfo.answer"></content-answer>
        <div class="no-reply-info">
            <span>{{contentInfo.time}}</span>
            <span v-if="contentInfo.showreply"> | {{contentInfo.reply_num}}条回复</span>
        </div>
    </div>
</template>
<script>
import ContentAnswer from './ContentAnswer'
export default {
    components: {
        ContentAnswer
    },
    props: {
        contentInfo: ''
    }
}
</script>
<style lang="less" scoped>
.content-no-body {
    padding: 0 15px;
    /*margin-bottom: 10px;*/
    padding-bottom: 10px;
    background: #FFFFFF;
    .no-content {
        max-height: 82.5px;
        color: #666666;
        font-size: 17px;
        letter-spacing: -0.5px;
        line-height: 27.5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
        word-break: break-all;
    }
    .no-reply-info {
        span {
            font-size: 11px;
            color: #bBBBBB;
        }
    }
}
</style>
