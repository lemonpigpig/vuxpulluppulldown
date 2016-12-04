<template>
    <div class="content-answer" v-link="{name: 'suit-qa-detail', params: {id: contentAns.id}}">
        <div class="content-ask">
            提问：{{contentAns.question}}
        </div>
        <div class="content-account">
            <div class="account-img">
                <img v-lazy="contentAns.user_info.head_img">
            </div>
            <div class="account-name">
                {{contentAns.user_info.nick_name}}
            </div>
            <div class="no-reply-info">
                <span>{{contentAns.time}} &nbsp | &nbsp {{contentAns.reply_num}}条回复</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        contentAns: {}
    }
}
</script>
<style scoped>
.content-answer {
    max-height: 134px;
    background: #F7F7F7;
    border: 1px solid #E2E2E2;
    border-radius: 3px;
    padding: 1% 4%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.content-ask {
    padding: 2%;
    font-size: 16px;
    color: #999999;
    letter-spacing: -0.45px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.content-account {
    padding: 2% 0;
}

.account-img {
    height: 25px;
    width: 25px;
    float: left;
    margin-right: 5px;
}

.account-img img {
    width: 100%;
    border-radius: 100%;
}

.account-name {
    font-size: 13px;
    color: #999999;
    letter-spacing: 1.18px;
    line-height: 22px;
    float: left;
}

.no-reply-info {
    line-height: 22px;
}

.no-reply-info span {
    margin-left: 12px;
    font-size: 11px;
    color: #bBBBBB;
}
</style>
