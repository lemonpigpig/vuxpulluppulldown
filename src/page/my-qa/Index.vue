<template>
    <div>
       <login-model v-if="showLogin"></login-model>

        <ul class="page-tab">
            <li class="page-tab-answer active" :class="type=='question'?'active':''" @click="toggleReply('question')">发布的提问</li>
            <div class="tab-vertical"></div>
            <li class="page-tab-reply" :class="type=='answer'?'active':''" @click="toggleReply('answer')">回复的提问</li>
        </ul>
        <div style="height: 44px; width: 100%"></div>

        <Youfanpullrefresh :url-param="urlParam" v-ref:pullrefresh >
            <div slot="lists">
                <div class="one-content" v-for="item in qaList">
                    <qa-account :account-info="item.user_info"></qa-account>
                    <content-pic :content-info="item" v-if="item.imageList"></content-pic>
                    <content-no-pic :content-info="item" v-else></content-no-pic>
                </div>
            </div>
        </Youfanpullrefresh>
    </div>
</template>
<script>
import QaAccount from '../../components/common/business/QaAccount.vue'
import ContentNoPic from '../../components/common/business/ContentNoPic.vue'
import ContentPic from '../../components/common/business/ContentPic.vue'
import LoginModel from '../../components/common/login/Index.vue'
import Youfanpullrefresh from 'src/components/common/pullrefresh/PullRefresh'

export default {
    components: {
        QaAccount,
        ContentNoPic,
        ContentPic,
        LoginModel,
        Youfanpullrefresh
    },
    ready: function() {
        if(this.$route.params.id == 'app') {
            var userInfo = common.userLogin(window.location.href);
            if(!userInfo.userInfo) {
                this.showLogin = userInfo.isShowLogin;
                return;
            }else{
                this.user_id = userInfo.userInfo.userId;
                this.urlParam.userId = this.user_id;
            }
        }else{
            this.user_id = this.$route.params.id;
            this.urlParam.userId = this.user_id;
        }

        common.setTitle('我的问答');
        webAppSdk.controlShare(false);
        WxSdkHelper.shieldWeiXinShare();
        webAppSdk.replaceBackFun('');
    },
    data: function() {
        return {
            urlParam:{ m: 'Model', a: 'getModelListByUser',userId:''},
            type: "question",
            user_id: '',
            showLogin: false,
            qaList: [],
            newestId: '-1'
        }
    },
    methods: {
        toggleReply: function(type) {
            this.type = type;
            this.qaList = [];
            if(type == 'question'){
                this.$refs.pullrefresh.updateData({ m: 'Model', a: 'getModelListByUser',userId: this.user_id});
            }
            if(type == 'answer'){
                this.$refs.pullrefresh.updateData({ m: 'Model', a: 'getModelAnswerListByUser',userId: this.user_id});
            }
        },
        //请求接口获取数据
        dealData: function(p_data) {
            var len = p_data.qaList.length, i = 0;
            if(p_data.type == GlobalModel.PULL_DOWN) {
                //下拉刷新在顶部添加数据
                for(i = len -1; i >= 0; --i) {
                    if(p_data.qaList[i].id > this.newestId) {
                        //下拉刷新时，只有新的数据需添加到列表中
                        if(this.type == 'question') {
                            this.dealOneQuestion(p_data.qaList[i]);
                        }else{
                            this.dealOneAnswer(p_data.qaList[i]);
                        }
                        this.qaList.unshift(p_data.qaList[i]);
                    }
                }
            }else{
                for(i = 0; i < len; i++) {
                    if(this.type == 'question') {
                        this.dealOneQuestion(p_data.qaList[i]);
                    }else{
                        this.dealOneAnswer(p_data.qaList[i]);
                    }
                    this.qaList.push(p_data.qaList[i]);
                }
            }
        },
        dealOneQuestion: function(p_data) {
            var question = JSON.parse(p_data.question);
            var q_content = '', img = null;
            //问题有多端文字，则文字全部链接起来，图片只取第一张
            for (var j = 0; j < question.length; j++) {
                if (question[j].type == 'text') {
                    q_content += question[j].content;
                } else if (question[j].type == 'image') {
                    if (!img) {
                        img = common.cropImgMiddle(question[j].content, 110, 110);
                    }
                }
            }
            p_data.question = q_content;
            p_data.imageList = img;
            p_data.showreply = p_data.reply_num <= 0 ? false : true;
        },
        dealOneAnswer: function(p_data) {
            let temp = JSON.parse(p_data.answer);
            //提问
            var question = '',
                    tempAnswer = JSON.parse(p_data.question.question);
            for (let k in tempAnswer) {
                if (tempAnswer[k].type == 'text') {
                    question += tempAnswer[k].content;
                }
            }
            p_data.question.question = question;
            p_data.answer = p_data.question;
            //回答
            var answer = '';
            for (let j in temp) {
                if (temp[j].type == 'text') {
                    answer += temp[j].content;
                }
            }
            p_data.question = answer;
            p_data.user_info.show_time = true;
            p_data.showask = true;
            p_data.user_info.time = p_data.time;
        }
    },
    events:{
        updateList:function(data){
            //此方法让用户拿到数据后可以组装成最终的数据
            console.log(data);
            if(!data.isStop){
                this.dealData(data);
            }
            
        }
    }
}
</script>
<style scoped>
body {
    background: #F6F6F6;
}

.page-tab {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background: #FFFFFF;
    padding: 0;
    margin: 0;
    z-index: 3;
}
.page-tab li {
    float: left;
    width: 50%;
    list-style-type: none;
    line-height: 44px;
    font-size: 13px;
    color: #BBBBBB;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
}
.tab-vertical {
    position: fixed;
    top: 0;
    left: 50%;
    width: 1px;
    height: 44px;
    background: #f2f2f2;
}
.my-qa-list {
    top: 44px
}
.one-content {
    background: #F6F6F6;
    padding-bottom: 10px;
}
.one-content:last-child {
    padding-bottom: 0;
}
.page-tab li.active {
    color: #333333;
    border-bottom: 2px solid #333333;
}
</style>
