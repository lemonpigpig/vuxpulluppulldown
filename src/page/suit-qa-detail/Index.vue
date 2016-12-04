<template>
    <div class="my-qa">
        <div class="question">
            <qa-account :account-info="accountInfo" :show-btn.sync="showBtn"></qa-account>
            <div class="profile">
                <span v-for="pr in profile" track-by="$index">{{pr}}&nbsp|&nbsp</span>
            </div>
            <detail :content-info="questionInfo"></detail>
        </div>
        <div class="all-answer" v-if="showAnswer">
            <div class="answer-title">
                <div class="title-line"></div>
                <div class="title">全部回复</div>
            </div>
            <div class="answer" v-for="info in answerList">
                <qa-account :account-info="info.accountInfo" :show-btn.sync="showBtn"></qa-account>
                <detail :content-info="info.answerInfo"></detail>
            </div>
        </div>
        <div class="empty"></div>
        <footer-btn :question-id="questionId" :show-btn.sync="showBtn"></footer-btn>
    </div>
</template>
<script>
import QaAccount from '../../components/common/business/QaAccount.vue'
import FooterBtn from './FooterBtn.vue'
import Detail from './Detail.vue'
//import ShareImg from '../../assets/pic_share.png'
var ShareImg = GlobalModel.CDN_BASE_URL + "pic_share.png";
var tempVue = '';
window.jumpToList = function() {
    tempVue.$router.go({
        name: 'suit-qa-list'
    });
};

export default {
    components: {
        QaAccount,
        FooterBtn,
        Detail
    },
    ready: function() {
        this.questionId = this.$route.params.id;
        if (this.$route.params.showBtn == "false") {
            this.showBtn = false;
        } else {
            this.showBtn = true;
        }

        this.getDetail();
        common.setTitle("搭配问答");

        webAppSdk.replaceBackFun('jumpToList()');
        WxSdkHelper.openWeiXinShare();
    },
    created: function() {
        tempVue = this;
    },
    data: function() {
        return {
            questionId: '',
            profile: [],
            accountInfo: {},
            questionInfo: {
                info: {
                    time: '',
                    reply_num: '',
                    showReply: true
                },
                list: []
            },
            answerList: [],
            showAnswer: false,
            showBtn: ''
        }
    },
    methods: {
        //字段后面添加p_param
        linkAfter: function(p_key, p_data, p_param) {
            var arr = p_data[p_key].split(',');
            if(arr.length <= 1) {
                if(p_param == undefined) {
                    this.profile.push(arr[0]);
                }else{
                    this.profile.push(arr[0] + p_param);
                }
            }else{
                if(p_param == undefined) {
                    this.profile.push(arr[1]);
                }else{
                    this.profile.push(arr[1] + p_param);
                }
            }
        },
        //字段前面添加p_param
        linkBefore: function(p_key, p_data, p_param) {
            var arr = p_data[p_key].split(',');
            if(arr.length <= 1) {
                this.profile.push(p_param + arr[0]);
            }else{
                this.profile.push(p_param + arr[1]);
            }
        },
        //字段前面添加p_param1， 后面添加p_param2
        linkMore: function(p_key, p_data, p_param1, p_param2) {
            var arr = p_data[p_key].split(',');
            if(arr.length <= 1) {
                this.profile.push(p_param1 + arr[0] + p_param2);
            }else{
                this.profile.push(p_param1 + arr[1] + p_param2);
            }
        },
        parseProfile: function(p_data) {
            this.linkAfter('age', p_data);
            this.linkAfter('height', p_data, 'cm');
            this.linkAfter('weight', p_data, 'kg');
            this.linkAfter('professional', p_data);
            this.linkAfter('style', p_data, '风格');
            this.linkMore('top_size', p_data, '上装', '码');
            this.linkMore('bottom_size', p_data, '下装', '码');
            this.linkBefore('fav_color', p_data, '喜欢');
            this.linkBefore('fav_brand', p_data, '喜欢品牌: ');
            this.linkAfter('address', p_data);
        },
        getDetail: function() {
            this.$http.get(GlobalModel.SERVER_URL, {
                params: {
                    m: 'Model',
                    a: 'getModelDetails',
                    id: this.$route.params.id
                }
            }).then((response) => {
                if (response.data.status == 1) {
                    let data = response.data.data;
                    //提问者信息
                    data.details.user_info.show_flag = data.details.level == 3 ? true : false;
                    this.accountInfo = data.details.user_info;
                    //问题信息
                    this.questionInfo.info.time = data.details.time;
                    this.questionInfo.info.reply_num = data.details.reply_num;
                    this.questionInfo.info.showReply = true;
                    this.questionInfo.list = JSON.parse(data.details.question);
                    //回答信息
                    if (data.answer.length != undefined && data.answer.length > 0) {
                        this.showAnswer = true;
                        for (var i = 0; i < data.answer.length; i++) {
                            var temp = {};
                            var answerInfo = {
                                info: {},
                                list: []
                            };
                            var replay = {};
                            replay.time = data.answer[i].time;
                            replay.reply_num = 0;
                            replay.showReply = false;
                            answerInfo.info = replay;
                            answerInfo.list = JSON.parse(data.answer[i].answer);

                            temp.answerInfo = answerInfo;
                            if(data.answer[i].user_info) {
                                temp.accountInfo = data.answer[i].user_info;
                            }else{
                                temp.accountInfo = {nick_name: '', head_img: '', show_flag: false};
                            }

                            this.answerList.push(temp);
                        }
                    }

                    if (data.info.length == undefined || data.info.length <= 0) {
                        this.showProfile = false;
                    } else {
                        this.showProfile = true;
                        this.parseProfile(data.info[0]);
                    }
                    //分享
                    this.sharePage(this.questionInfo.list);
                }
            })
        },
        sharePage: function(p_data) {
            var img = ShareImg, desc = null;
            for(var m = 0; m < p_data.length; m++) {
                if(p_data[m].type == 'image') {
                    if(img == ShareImg) {
                        img = p_data[m].content;
                    }
                }else{
                    if(!desc) {
                        desc = common.cutStrLen(p_data[m].content);
                    }
                }
                if(desc && img != ShareImg) break;
            }

            var content = {
                title: "有范造型问答平台 - 十项全能的私人造型师",
                imgUrl: img,
                link: GlobalModel.WECHAT_SERVER_URL + '/wap-act/#/page/suit-qa-detail/'
                    + this.$route.params.id + '/' + this.$route.params.showBtn,
                desc: desc,
                callback: ''
            };
            common.sharePage(content);
        }
    }
}
</script>
<style lang="less" scoped>
.my-qa {
    .question {
        background: #FFFFFF;
        margin-bottom: 15px;
        .profile {
            padding: 10px 4%;
            font-family: '.PingFang-SC-Regular';
            font-size: 11px;
            color: #BBBBBB;
            letter-spacing: -0.33px;
            line-height: 21px
        }
    }
    .all-answer {
        .answer-title {
            position: relative;
            background: #FFFFFF;
            height: 45px;
            line-height: 45px;
            .title-line {
                position: absolute;
                left: 0;
                top: 13px;
                height: 18px;
                width: 2px;
                background: #FFC407;
            }
            .title {
                position: absolute;
                left: 4%;
                font-family: '.PingFang-SC-Light';
                font-size: 15px;
                color: #333333;
            }
            .answer {
                margin-bottom: 15px;
            }
        }
    }
    .empty {
        height: 45px;
    }
}
</style>
