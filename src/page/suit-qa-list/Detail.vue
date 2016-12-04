<template>
    <!--下拉刷新容器-->
    <Youfanpullrefresh v-ref:pullrefresh :url-param="urlParam" :pullup-loading-pos="pullupPos" :bottom-empty-height="bottomEmptyHeight">
        <div slot="lists">
            <!--精华帖-->
            <div class="question" v-for="info in essenceList">
                <div>
                    <qa-account :account-info="info.user_info" :show-btn.sync="showBtn"></qa-account>
                    <content-pic :content-info="info" v-if="info.imageList"></content-pic>
                    <content-no-pic :content-info="info" v-else></content-no-pic>
                </div>
            </div>
            <!--普通帖-->
            <div class="question" v-for="info in qaList">
                <div>
                    <qa-account :account-info="info.user_info" :show-btn.sync="showBtn"></qa-account>
                    <content-pic :content-info="info" v-if="info.imageList"></content-pic>
                    <content-no-pic :content-info="info" v-else></content-no-pic>
                </div>
            </div>
        </div>
    </Youfanpullrefresh>

</template>
<script>
    import QaAccount from '../../components/common/business/QaAccount.vue'
    import ContentNoPic from '../../components/common/business/ContentNoPic.vue'
    import ContentPic from '../../components/common/business/ContentPic.vue'
    import Youfanpullrefresh from 'src/components/common/pullrefresh/PullRefresh'

    var NewestQuestionId = -1;

    export default {
        components: {
            QaAccount,
            ContentNoPic,
            ContentPic,
            Youfanpullrefresh
        },
        ready: function() {
        },
        compiled:function () {
            this.$nextTick(function () {
                $('.mui-scroll').append('<div style="height: 45px;width:100%;"></div>');
            });
        },
        data: function() {
            return {
                urlParam:{ m: 'Model', a: 'getModelList'},
                pullupPos:{ height:'40px',bottom:'-5px'},
                bottomEmptyHeight:'45px',
                essenceList: [],
                qaList: [],
                pageIndex: 0,
                MaxSize: 20,
                page: 0,
                showBtn: true
            }
        },
        methods: {
            getData: function(p_data) {
                if(p_data.type == GlobalModel.PULL_DOWN){
                    this.dealDownData(p_data.qaList);
                }else{
                    this.dealUpData(p_data.qaList);
                }
            },
            dealDownData: function(p_data) {
                NewestQuestionId = this.qaList[0].id;
                var len = p_data.length;
                for(var i = len - 1; i >= 0; --i) {
                    this.dealOneData(p_data[i]);
                    if(p_data[i].level == '3') {
                        //精华帖
                        var flag = false;
                        for(var j = 0; j < this.essenceList.length; j++) {
                            if(p_data[i].id == this.essenceList[j].id) {
                                flag = true;
                                break;
                            }
                        }
                        if(!flag) {
                            this.essenceList.unshift(p_data[i]);
                        }
                    }else{
                        if(p_data[i].id > NewestQuestionId) {
                            this.qaList.unshift(p_data[i]);
                        }
                    }
                }
            },
            dealUpData: function(p_data) {
                var len = p_data.length;
                for(var i = 0; i < len; i++) {
                    this.dealOneData(p_data[i]);
                    if(p_data[i].level == '3') {
                        //精华帖
                        p_data[i].user_info.show_flag = true;
                        this.essenceList.push(p_data[i]);
                    }else{
                        p_data[i].user_info.show_flag = false;
                        this.qaList.push(p_data[i]);
                    }
                }
            },
            dealOneData: function(p_data) {
                p_data.show_time = false;
                p_data.showreply = p_data.reply_num == 0 ? false : true;
                var question = JSON.parse(p_data.question);
                var q_content = '', img = null;

                for (var j = 0; j < question.length; j++) {
                    if (question[j].type == 'text') {
                        q_content += question[j].content + '。';
                    } else if (question[j].type == 'image') {
                        if (!img) {
                            img = common.cropImgMiddle(question[j].content, 110, 110);
                        }
                    }
                }
                p_data.imageList = img;
                p_data.question = q_content;
            }
        },
        events:{
            updateList:function(data){
                this.getData(data);
            }
        }
    }
</script>
<style scoped>
    .question {
        background: #F6F6F6;
        padding-bottom: 10px;
    }
    .question:last-child {
        padding-bottom: 0;
    }
</style>