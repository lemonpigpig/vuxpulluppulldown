<template>
    <div class="content-body" v-link="{name: 'suit-qa-detail', params: {id: contentInfo.id}}">
        <div class="l-content">
            <div class="content-info">{{contentInfo.question}}</div>
            <div class="reply-info" >
                <span>{{contentInfo.time}}</span>
                <span v-if="contentInfo.showreply"> | {{contentInfo.reply_num}}条回复</span>
            </div>
        </div>
        <div class="r-content">
            <img v-lazy="contentInfo.imageList">
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
<style lang="less" scoped>
    .content-body {
        padding: 0 15px;
        height: 130px;
        background: #FFFFFF;
        .l-content {
            float: left;
            margin-right: 5px;
            width: 58.5%;
            .content-info {
                max-height: 82.5px;
                color: #666666;
                font-size: 17px;
                letter-spacing: -0.5px;
                line-height: 27.5px;
                overflow: hidden;
                text-overflow:ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                margin-bottom: 10px;
                word-break: break-all;
            }
            .reply-info {
                span {
                    font-size: 11px;
                    color: #bBBBBB;
                }
            }
        }
        .r-content {
            float: right;
            height: 100%;
            img {
                width: 110px;
                height: 110px;
            }
        }
    }
</style>