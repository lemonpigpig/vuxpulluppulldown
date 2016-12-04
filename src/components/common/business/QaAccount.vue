<template>
    <div class="account-info" @click="clickMyQa">
        <div class="account-logo">
            <img class="user-img" :src="accountInfo.head_img">
        </div>
        <div class="account-name">
            <span>{{accountInfo.nick_name}}</span>
        </div>
        <div class="r-flag" v-show="accountInfo.show_flag">
            精华
        </div>
        <div class="t-flag" v-if="accountInfo.show_time">
            {{accountInfo.time}}
            <!-- 3小时前  -->
        </div>
    </div>
</template>
<script>
export default {
    props: {
        accountInfo: '',
        showBtn: false
    },
    methods: {
        clickMyQa: function() {
            if(this.showBtn) {
                this.$router.go({name: 'my-qa', params: {id: this.accountInfo.user_id}});
            }
        }
    }
}
</script>
<style lang="less" scoped>
.account-info {
    width: 100%;
    height: 55px;
    background: #FFFFFF;
    .account-logo {
        height: 30px;
        width: 30px;
        margin-left: 15px;
        margin-top: 12px;
        margin-right: 5px;
        float: left;
        .user-img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }
    .account-name {
        float: left;
        height: 55px;
        line-height: 55px;
        overflow: hidden;
        color: #999;
    }
    .r-flag {
        width: 54px;
        height: 20px;
        line-height: 20px;
        float: right;
        margin-right: 16px;
        background: #FFD600;
        text-align: center;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: -0.36px;
    }
    .t-flag {
        float: right;
        line-height: 55px;
        margin-right: 15px;
        font-size: 11px;
        color: #BBBBBB;
        letter-spacing: -0.33px;
    }
}
</style>
